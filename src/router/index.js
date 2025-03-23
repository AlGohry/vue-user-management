import { createRouter, createWebHistory } from 'vue-router';
import AuthLogin from '../components/AuthLogin.vue';
import AuthRegister from '../components/AuthRegister.vue';
import HomePage from '../components/HomePage.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import UsersPage from '@/components/UsersPage.vue';
import auth from "@/store/auth.js"; 
import { useToast } from "vue-toastification";
import UserForm from '@/components/UserForm.vue';
const toast = useToast(); 

const routes = [
  { path: '/', component: HomePage, meta: { requiresAuth: true } },  // Home page requires login
  { path: '/login', component: AuthLogin }, // Login page
  { path: '/register', component: AuthRegister }, // Register page
  { path: '/home', component: HomePage },
  { path: '/forgot-password', component: ForgotPassword },  // Forgot password page
  { path: '/users', component: UsersPage, meta: { requiresAuth: true } }, // Users page requires login
  { path: "/add-user", component: UserForm }, // Add user
  { path: "/edit-user/:id", component: UserForm, props: true }, // Edit user
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.user) { // Check if the route requires authentication and the user is not logged in
    toast.error("ليس لديك صلاحية للدخول");  // Show error message
    next("/login"); 
  } else {
    next(); // Redirect user
  }
});

export default router;

