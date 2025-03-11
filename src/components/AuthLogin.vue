<template>
  <div class="login-page">
    <div class="container mt-5">
      <div class="card shadow">
        <div class="card-body">
          <h2 class="text-center mb-4">تسجيل الدخول</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">البريد الإلكتروني</label>
              <input type="email" class="form-control" id="email" v-model="email" :class="{ 'is-invalid': emailError }">
              <div v-if="emailError" class="invalid-feedback">البريد الإلكتروني مطلوب ويجب أن يكون صحيحًا.</div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">كلمة المرور</label>
              <input type="password" class="form-control" id="password" v-model="password"
                :class="{ 'is-invalid': passwordError }">
              <div v-if="passwordError" class="invalid-feedback">كلمة المرور مطلوبة ويجب أن تكون على الأقل 6 أحرف.</div>
            </div>
            <button type="submit" class="btn btn-primary w-100">تسجيل الدخول</button>
          </form>
          <p class="text-center mt-3">
            ليس لديك حساب؟ <router-link to="/register">سجل هنا</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`);
        if (response.data.length > 0) {
          const user = response.data[0];
          localStorage.setItem('userName', user.name); // تخزين اسم المستخدم في localStorage
          this.$router.push('/'); // توجيه المستخدم إلى الصفحة الرئيسية
        } else {
          const toast = useToast();
          toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة!');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  }
};
</script>