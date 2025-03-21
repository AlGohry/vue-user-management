<template>
  <div class="login-page">
    <div class="container mt-5">
      <div class="card shadow">
        <div class="card-body">
          <h2 class="text-center mb-4">تسجيل الدخول</h2>
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="email" class="form-label">البريد الإلكتروني</label>
              <input type="email" class="form-control" id="email" v-model="email" required />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">كلمة المرور</label>
              <input type="password" class="form-control" id="password" v-model="password" required />
              <div v-if="passwordError" class="invalid-feedback">كلمة المرور مطلوبة ويجب أن تكون على الأقل 6 أحرف.</div>
            </div>
            <button type="submit" class="btn btn-primary w-100">
              تسجيل الدخول
            </button>
          </form>
          <p class="text-center mt-3">
            ليس لديك حساب؟ <router-link to="/register">سجل هنا</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; 
import axios from "axios";  // استدعاء axios
import { useToast } from "vue-toastification";  // استدعاء الرسائل التوضيحية
import { login } from "../store/auth"; // استدعاء دالة تسجيل الدخول

const email = ref("");
const password = ref("");
const toast = useToast();
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/users?email=${email.value}&password=${password.value}`
    );

    if (response.data.length > 0) { // التحقق من وجود البريد الإلكتروني وكلمة المرور
      const user = response.data[0];  // تعريف المستخدم
      login(user); // تسجيل الدخول باستخدام auth.js
      toast.success(`مرحبًا ${user.name}!`);
      router.push("/"); // التوجيه إلى الصفحة الرئيسية
    } else {  
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة!"); 
    }
  } catch (error) { 
    console.error("Error logging in:", error);  
  }
};
</script>
