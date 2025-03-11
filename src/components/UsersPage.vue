<template>
  <div class="users-page d-flex flex-column min-vh-100">
    <HeaderComponent />

    <main class="container mt-5 flex-grow-1">
      <div class="d-flex justify-content-between mb-4">
        <h2>إدارة المستخدمين</h2>
        <router-link to="/add-user" class="btn btn-primary">
          <i class="fas fa-plus ms-2"></i>إضافة مستخدم
        </router-link>
      </div>

      <!-- مؤشر التحميل -->
      <div v-if="loading" class="text-center my-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <!-- الجدول -->
      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="user.id">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button @click="editUser(user.id)" class="btn btn-sm btn-warning" title="تعديل">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteUser(user.id)" class="btn btn-sm btn-danger me-2" title="حذف">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { useRouter } from "vue-router";

const users = ref([]);
const loading = ref(true);
const router = useRouter();

const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/users");
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    loading.value = false;
  }
};

const editUser = (userId) => {
  router.push(`/edit-user/${userId}`);
};

const deleteUser = async (userId) => {
  if (confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      await fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};

onMounted(fetchUsers);
</script>
