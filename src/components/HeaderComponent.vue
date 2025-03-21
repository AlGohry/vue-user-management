<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import auth, { logout } from "../store/auth";

const router = useRouter();
const userName = computed(() => (auth.user ? auth.user.name : "زائر"));

const handleLogout = () => {
  logout();
  router.push("/login");
};
</script>

<template>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-between">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <img src="../assets/logo.png" alt="Vue Logo" width="40" height="40" class="ms-2" />
          <span class="fs-4">إدارة المستخدمين</span>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to="/" class="nav-link px-2 text-white">الرئيسية</router-link></li>
          <li v-if="auth.user"><router-link to="/users" class="nav-link px-2 text-white">المستخدمين</router-link></li>
          <li><router-link to="/about" class="nav-link px-2 text-white">عن الموقع</router-link></li>
          <li><router-link to="/profile" class="nav-link px-2 text-white">{{ userName }}</router-link></li>
        </ul>

        <div class="text-end">
          <button v-if="auth.user" @click="handleLogout" class="btn btn-outline-light">تسجيل الخروج</button>
          <router-link v-else to="/login" class="btn btn-outline-light">تسجيل الدخول</router-link>
        </div>
      </div>
    </div>
  </header>
</template>
