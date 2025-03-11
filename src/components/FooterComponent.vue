<template>
  <footer class="p-3 text-bg-dark mt-auto">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h5>منصة الإدارة</h5>
          <p class="mb-0" :title="`تم إطلاق الموقع في عام ${launchYear}`">
            جميع الحقوق محفوظة &copy; {{ currentYear }}
          </p>
        </div>
        <div class="col-md-6 text-end">
          <router-link to="/about" class="text-white ms-3">عن الموقع</router-link>
          <router-link to="/contact" class="text-white">اتصل بنا</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
const launchYear = ref(2021);
</script>
