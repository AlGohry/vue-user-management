<template>
  <AuthLayout>
    <h2 class="mb-4">استعادة كلمة المرور</h2>
    <p class="text-muted">أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.</p>
    <form @submit.prevent="handleForgotPassword">
      <div class="mb-3">
        <label for="email" class="form-label">البريد الإلكتروني</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
      </div>
      <button type="submit" class="btn btn-primary">إرسال رابط إعادة التعيين</button>
    </form>
    <p class="mt-3">
      تذكرت كلمة المرور؟ <router-link to="/login">سجل الدخول هنا</router-link>
    </p>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "./AuthLayout.vue";
</script>
