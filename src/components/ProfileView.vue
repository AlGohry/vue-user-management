<template>
  <div class="users-page d-flex flex-column min-vh-100">
    <HeaderComponent />
  <div :class="['profile-page', isDarkMode ? 'dark-mode' : 'light-mode']">
    <div class="container">
      <div class="profile-header">
        <h1>ملفي الشخصي</h1>
      </div>

      <div class="profile-content">
        <div class="profile-sidebar">
          <div class="profile-avatar">
            <img :src="user.avatar || defaultAvatar" alt="صورة المستخدم" />
          </div>
          <h2 class="profile-name">{{ user.name }}</h2>
          <p class="profile-role">{{ user.role }}</p>
        </div>

        <div class="profile-details">
          <h3>المعلومات الشخصية</h3>
          <div class="detail-item">
            <span>البريد الإلكتروني:</span>
            <span>{{ user.email }}</span>
          </div>
          <div class="detail-item">
            <span>رقم الهاتف:</span>
            <span>{{ user.phone || 'غير متوفر' }}</span>
          </div>
          <div class="detail-item">
            <span>العنوان:</span>
            <span>{{ user.address || 'غير متوفر' }}</span>
          </div>
        </div>
      </div>

      <div class="profile-actions">
        <!-- <button class="btn btn-primary">تعديل الملف الشخصي</button> -->
        <router-link to="/profile/edit" class="btn btn-primary">تعديل الملف الشخصي</router-link>
        <button class="btn btn-danger" @click="handleLogout">تسجيل الخروج</button>
      </div>
    </div>
  </div>
  <FooterComponent />
  </div>

</template>

<script setup>
import { computed, ref, watchEffect } from 'vue';
import auth, { logout } from '@/store/auth';
import HeaderComponent from './layout/HeaderComponent.vue';
import FooterComponent from './layout/FooterComponent.vue';
import defaultAvatarImg from '@/assets/images/user_avatar.jpg';

// تابع الثيم من LocalStorage
const isDarkMode = ref(localStorage.getItem("theme") === "dark");

watchEffect(() => {
  isDarkMode.value = localStorage.getItem("theme") === "dark";
});

const user = computed(() => auth.user || { name: 'مستخدم مجهول', email: '', avatar: '', role: '' });
const defaultAvatar = defaultAvatarImg;


const handleLogout = () => {
  logout();
};
</script>
