
<template>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <img src="@/assets/logo.png" alt="Vue Logo" width="40" height="40" class="ms-2" />
          <span class="fs-4">إدارة المستخدمين</span>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to="/" class="nav-link px-2 text-white">الرئيسية</router-link></li>
          <li v-if="auth.user"><router-link to="/users" class="nav-link px-2 text-white">المستخدمين</router-link></li>
          <li><router-link to="/about" class="nav-link px-2 text-white">عن الموقع</router-link></li>
          <li><router-link to="/profile" class="nav-link px-2 text-white">{{ userName }}</router-link></li>
        </ul>

        <div class="text-end">
          <button @click="toggleTheme" class="btn btn-outline-secondary ms-2">
            <span v-if="isDarkMode" title="تبديل إلى الوضع الفاتح">🌞 </span>
            <span v-else title="تبديل إلى الوضع  الداكن ">🌙 </span>
          </button>
          <button v-if="auth.user" @click="handleLogout" class="btn btn-outline-light ">تسجيل الخروج</button>
          <router-link v-else to="/login" class="btn btn-outline-light">تسجيل الدخول</router-link>
        </div>
      </div>
    </div>
  </header>
</template>


<script setup>
import { computed, ref, watchEffect } from "vue"; 
import { useRouter } from "vue-router";
import auth, { logout } from "@/store/auth"; // Import the auth store

// Check the theme from local storage
const isDarkMode = ref(localStorage.getItem("theme") === "dark");

// Watch for changes in the theme and update the body class
watchEffect(() => {
  document.body.classList.toggle("dark-mode", isDarkMode.value);
});

// Toggle the theme
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem("theme", isDarkMode.value ? "dark" : "light");
};


const router = useRouter();
const userName = computed(() => (auth.user ? auth.user.name : "زائر"));

// Logout the user
const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>
