<template>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <!-- Logo or Brand -->
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <img src="../assets/logo.png" alt="Vue Logo" width="40" height="40" class="ms-2">
          <span class="fs-4">منصة الإدارة</span>
        </a>

        <!-- Navigation Links -->
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to="/" class="nav-link px-2 text-white">الرئيسية</router-link></li>
          <li><router-link to="/users" class="nav-link px-2 text-white">المستخدمين</router-link></li>
          <li><router-link to="/about" class="nav-link px-2 text-white">عن الموقع</router-link></li>
          <li><router-link to="/profile" class="nav-link px-2 text-white">{{ userName }}</router-link></li>
        </ul>

        <!-- User Section -->
        <div class="text-end">
          <button @click="logout" class="btn btn-outline-light">تسجيل الخروج</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const userName = ref(localStorage.getItem("userName") || "زائر");
const router = useRouter();

const logout = () => {
  localStorage.removeItem("userName");
  router.push("/login");
};
</script>