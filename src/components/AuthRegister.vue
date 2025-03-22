<template>
  <AuthLayout>
    <h2 class="mb-4">تسجيل جديد</h2>
    <form @submit.prevent="handleRegister">
      <div class="mb-3">
        <label for="name" class="form-label">الاسم</label>
        <input type="text" class="form-control" id="name" v-model="name" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">البريد الإلكتروني</label>
        <input type="email" class="form-control" id="email" v-model="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">كلمة المرور</label>
        <input type="password" class="form-control" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">تسجيل</button>
    </form>
    <p class="mt-3">
      لديك حساب؟ <router-link to="/login">سجل الدخول هنا</router-link>
    </p>
  </AuthLayout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";   // استدعاء الرسائل التوضيحية
import { register } from "@/store/auth";        // استدعاء دالة التسجيل
import AuthLayout from "./AuthLayout.vue";     // استدعاء القالب

const name = ref("");
const email = ref("");
const password = ref("");

const nameError = ref(false);
const emailError = ref(false);
const passwordError = ref(false);
const router = useRouter();
const toast = useToast();

const validateForm = () => {
  nameError.value = !name.value;
  emailError.value = !email.value || !validateEmail(email.value);
  passwordError.value = !password.value || password.value.length < 6;
  return !nameError.value && !emailError.value && !passwordError.value;
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const handleRegister = async () => {
  if (!validateForm()) {
    toast.error("الرجاء ملء جميع الحقول بشكل صحيح.");
    return;
  }

  try {
    await register({ name: name.value, email: email.value, password: password.value });
    toast.success("تم التسجيل بنجاح!");
    router.push("/login");
  } catch (error) {
    toast.error(error.message || "حدث خطأ أثناء التسجيل!");
  }
};

</script>
