<template>
  <AuthLayout>
    <h2 class="mb-4">تسجيل الدخول</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="email" class="form-label">البريد الإلكتروني</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">كلمة المرور</label>
        <input type="password" class="form-control" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary">تسجيل الدخول</button>
    </form>
    <p class="mt-3">
      ليس لديك حساب؟ <router-link to="/register">سجل هنا</router-link>
    </p>
    <p>
      <router-link to="/forgot-password" class="text-muted">نسيت كلمة المرور؟</router-link>
    </p>
  </AuthLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; 
import axios from "axios";  // Import axios
import { useToast } from "vue-toastification";  // Import toast notifications
import { login } from "@/store/auth.js"; // Import login function
import AuthLayout from "@/components/auth/AuthLayout"; // Import AuthLayout

const email = ref("");
const password = ref("");
const toast = useToast();
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/users?email=${email.value}&password=${password.value}`
    );

    if (response.data.length > 0) { 
      const user = response.data[0];  
      
      // 📝 **احفظ بيانات المستخدم في Local Storage**
      localStorage.setItem("currentUserId", user.id); 
      
      // ✅ **تحديث النظام بحالة المستخدم**
      login(user); 

      toast.success(`مرحبًا ${user.name}!`);
      router.push("/"); 
    } else {  
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة!"); 
    }
  } catch (error) { 
    console.error("Error logging in:", error);  
    toast.error("حدث خطأ أثناء تسجيل الدخول!"); 
  }
};
</script>
