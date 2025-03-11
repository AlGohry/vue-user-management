import { createRouter, createWebHistory } from 'vue-router';
import AuthLogin from '../components/AuthLogin.vue';
import AuthRegister from '../components/AuthRegister.vue';
import HomePage from '../components/HomePage.vue';
import UsersPage from '@/components/UsersPage.vue';

const routes = [
  { path: '/', component: HomePage, meta: { requiresAuth: true } }, // الصفحة الرئيسية تتطلب تسجيل دخول
  { path: '/login', component: AuthLogin }, // صفحة تسجيل الدخول
  { path: '/register', component: AuthRegister }, // صفحة التسجيل
  { path: '/home', component: HomePage },
  { path: '/users', component:UsersPage  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard للتحقق من تسجيل الدخول
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('userName'); // تحقق من وجود اسم مستخدم في localStorage

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // إذا كان المسار يتطلب تسجيل دخول ولم يكن المستخدم مسجلًا، توجيهه إلى صفحة الدخول
  } else {
    next(); // السماح بالانتقال إلى المسار المطلوب
  }
});

export default router;

