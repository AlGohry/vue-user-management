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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import auth from "@/store/auth";
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";
import defaultAvatarImg from '@/assets/images/user_avatar.jpg';

// Current user data
const user = computed(() => auth.user || { name: "", email: "", phone: "", address: "", avatar: "" });

// Form data
const form = ref({
  name: user.value.name,
  email: user.value.email,
  phone: user.value.phone || "",
  address: user.value.address || "",
  password: "",
  confirmPassword: "",
  avatar: user.value.avatar || "",
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
const passwordMismatch = computed(() => form.value.password && form.value.password !== form.value.confirmPassword);

// Update profile
const router = useRouter();
const updateProfile = () => {
  if (passwordMismatch.value) {
    alert("تأكد من تطابق كلمة المرور!");
    return;
  }

  // ** Send data to API **
  console.log("Updated data:", form.value);
  
  // Update user data
  auth.user = { ...auth.user, ...form.value };

  // Redirect to profile page
  router.push("/profile");
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
