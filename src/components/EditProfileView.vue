<template>
  <div class="edit-profile-page d-flex flex-column min-vh-100">
    <HeaderComponent />
    <div class="container mt-4">
      <h2 class="text-center">تعديل الملف الشخصي</h2>
      
      <div class="edit-profile-form card p-4">
        <div class="text-center mb-3">
          <label for="avatarUpload" class="avatar-wrapper">
            <img :src="previewAvatar || user.avatar || defaultAvatar" alt="الصورة الشخصية" class="profile-avatar" />
            <input type="file" id="avatarUpload" @change="handleImageUpload" accept="image/*" hidden />
          </label>
          <p class="text-muted">اضغط لتغيير الصورة</p>
        </div>

        <form @submit.prevent="updateProfile" class="profile-form">
          <div class="mb-3">
            <label class="form-label" for="name">الاسم الكامل</label>
            <input v-model="form.name" type="text" id="name" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label" for="email">البريد الإلكتروني</label>
            <input v-model="form.email" type="email" id="email" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label" for="phone">رقم الهاتف</label>
            <input v-model="form.phone" type="tel" id="phone" class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label" for="address">العنوان</label>
            <input v-model="form.address" type="text" id="address" class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label">كلمة المرور الجديدة (اختياري)</label>
            <input v-model="form.password" type="password" class="form-control" />
          </div>

          <div class="mb-3">
            <label class="form-label">تأكيد كلمة المرور</label>
            <input v-model="form.confirmPassword" type="password" class="form-control" />
            <small v-if="passwordMismatch" class="text-danger">كلمة المرور غير متطابقة</small>
          </div>

          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">حفظ التعديلات</button>
            <router-link to="/profile" class="btn btn-secondary">إلغاء</router-link>
          </div>
        </form>
      </div>
    </div>
    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import axios from "axios";
import auth from "@/store/auth";
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";
import defaultAvatarImg from '@/assets/images/user_avatar.jpg';

// Current user data
const user = computed(() => auth.user || { name: "", email: "", phone: "", address: "", avatar: "" });

// Form data
const form = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  confirmPassword: "",
});

// Fetch user data from API
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${auth.user.id}`);
    form.value = { ...response.data, password: "", confirmPassword: "" };
  } catch (error) {
    console.error("خطأ في جلب بيانات المستخدم:", error);
  }
});

// Default avatar image
const defaultAvatar = defaultAvatarImg;

// Preview avatar image
const previewAvatar = ref(null);
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      previewAvatar.value = reader.result;
      form.value.avatar = reader.result; // Update form data
    };
    reader.readAsDataURL(file);
  }
};

// Password mismatch
const passwordMismatch = computed(() => form.value.password && form.value.password == form.value.confirmPassword);
// Update profile
const router = useRouter();
const toast = useToast();

// Update data in Pinia and localStorage
const updateProfile = async () => {
  if (passwordMismatch.value) {
    toast.error("كلمة المرور غير متطابقة");
    return;
  }

  try {
    const updatedUser = { ...form.value };
    if (updatedUser.password) delete updatedUser.password; // لا ترسل كلمة مرور فارغة

    await axios.put(`http://localhost:3000/users/${auth.user.id}`, updatedUser);
    
    // تحديث البيانات في localStorage
    auth.user = updatedUser;
    localStorage.setItem("user", JSON.stringify(updatedUser));

    
    toast.success("تم تحديث الملف الشخصي بنجاح");
    router.push("/profile");
  } catch (error) {
    toast.error("خطأ في تحديث الملف الشخصي");
    console.error("خطأ في تحديث بيانات المستخدم:", error);
  }
};

</script>

<style scoped>
.edit-profile-form {
  max-width: 500px;
  margin: auto;
  background: var(--background-color);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.avatar-wrapper {
  display: inline-block;
  cursor: pointer;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid var(--primary-color);
  object-fit: cover;
}

</style>
