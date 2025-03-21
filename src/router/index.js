import { createRouter, createWebHistory } from 'vue-router';
import AuthLogin from '../components/AuthLogin.vue';
import AuthRegister from '../components/AuthRegister.vue';
import HomePage from '../components/HomePage.vue';
import UsersPage from '@/components/UsersPage.vue';
import auth from "@/store/auth.js"; // استيراد حالة المستخدم
import { useToast } from "vue-toastification";
const toast = useToast(); // استدعاء التوست

const routes = [
  { path: '/', component: HomePage, meta: { requiresAuth: true } }, // الصفحة الرئيسية تتطلب تسجيل دخول
  { path: '/login', component: AuthLogin }, // صفحة تسجيل الدخول
  { path: '/register', component: AuthRegister }, // صفحة التسجيل
  { path: '/home', component: HomePage },
  { path: '/users', component: UsersPage, meta: { requiresAuth: true } }, // صفحة المستخدمين تتطلب تسجيل دخول
  // { 
  //   path: "/users",
  //   component: UsersPage,
  //   beforeEnter: (to, from, next) => {
  //     if (!auth.user) {
  //       toast.error("ليس لديك صلاحية للدخول"); // رسالة خطأ
  //       next("/login");  // توجيه المستخدم إلى صفحة تسجيل الدخول
  //     } else {
  //       next(); // توجيه المستخدم
  //     }
  //   },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => { 
  if (to.meta.requiresAuth && !auth.user) { // التحقق من تسجيل الدخول
    toast.error("ليس لديك صلاحية للدخول"); // رسالة خطأ للمستخدم
    next("/login");
  } else {
    next(); // توجيه المستخدم
  }
});

export default router;

