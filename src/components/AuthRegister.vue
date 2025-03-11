<template>
  <div class="register-page">
    <div class="container mt-5">
      <div class="card shadow">
        <div class="card-body">
          <h2 class="text-center mb-4">تسجيل جديد</h2>
          <form @submit.prevent="register">
            <div class="mb-3">
              <label for="name" class="form-label">الاسم</label>
              <input type="text" class="form-control" id="name" v-model="name" :class="{ 'is-invalid': nameError }">
              <div v-if="nameError" class="invalid-feedback">الاسم مطلوب.</div>
            </div>
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
            <button type="submit" class="btn btn-primary w-100">تسجيل</button>
          </form>
          <p class="text-center mt-3">
            لديك حساب بالفعل؟ <router-link to="/login">سجل الدخول هنا</router-link>
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
      name: '',
      email: '',
      password: '',
      nameError: false,
      emailError: false,
      passwordError: false
    };
  },
  methods: {
    validateForm() {
      this.nameError = !this.name;
      this.emailError = !this.email || !this.validateEmail(this.email);
      this.passwordError = !this.password || this.password.length < 6;
      return !this.nameError && !this.emailError && !this.passwordError;
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    },
    async register() {
      if (!this.validateForm()) {
        const toast = useToast();
        toast.error('الرجاء ملء جميع الحقول بشكل صحيح.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/users?email=' + this.email);
        if (response.data.length > 0) {
          const toast = useToast();
          toast.error('هذا البريد الإلكتروني مسجل بالفعل!');
        } else {
          const newUser = {
            name: this.name,
            email: this.email,
            password: this.password
          };
          await axios.post('http://localhost:3000/users', newUser);
          const toast = useToast();
          toast.success('تم التسجيل بنجاح!');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
