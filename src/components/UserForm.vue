<template>
  <div class="user-form d-flex flex-column min-vh-100">
    <HeaderComponent />
    <main class="container mt-5 flex-grow-1">

      <div class="d-flex justify-content-between mb-4">
        <h2>{{ isEdit ? "تعديل المستخدم" : "إضافة مستخدم" }}</h2>
        <router-link to="/users" class="btn btn-secondary">
          <i class="fas fa-arrow-left ms-2"></i> رجوع
        </router-link>
      </div>
      
      <!-- User Form -->
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label class="form-label">الاسم</label>
          <input v-model="user.name" type="text" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">البريد الإلكتروني</label>
          <input v-model="user.email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label">الدور</label>
          <select v-model="user.role" class="form-control">
            <option value="admin">مدير</option>
            <option value="member">عضو</option>
            <option value="guest">زائر</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save me-2"></i> {{ isEdit ? "تحديث المستخدم" : "إضافة مستخدم" }}
        </button>


      </form>
    </main>
    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
// Route and Router instances
const route = useRoute();
const router = useRouter();
const toast = useToast();

// State variables
const isEdit = ref(false);
const user = ref({ name: "", email: "", role: "member" });

// Fetch user data if editing
const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    user.value = response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    toast.add({ severity: "error", summary: "خطأ", detail: "تعذر تحميل بيانات المستخدم", life: 3000 });
  }
};

// Handle form submission
const handleSubmit = async () => {
  try {
    if (isEdit.value) {
      await axios.put(`http://localhost:3000/users/${route.params.id}`, user.value);
      toast.add({ severity: "success", summary: "تم التحديث", detail: "تم تعديل المستخدم بنجاح", life: 3000 });
    } else {
      await axios.post("http://localhost:3000/users", user.value);
      toast.add({ severity: "success", summary: "تمت الإضافة", detail: "تمت إضافة المستخدم بنجاح", life: 3000 });
    }
    router.push("/users");
  } catch (error) {
    console.error("Error saving user:", error);
    toast.add({ severity: "error", summary: "خطأ", detail: "حدث خطأ أثناء حفظ البيانات", life: 3000 });
  }
};

// Initialize component
onMounted(() => {
  if (route.params.id) {
    isEdit.value = true;
    fetchUser(route.params.id);
  }
});
</script>
