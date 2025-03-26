import { createRouter, createWebHistory } from 'vue-router';
import AuthLogin from '../components/auth/AuthLogin.vue';
import AuthRegister from '../components/auth/AuthRegister.vue';
import HomePage from '../components/HomePage.vue';
import ForgotPassword from '@/components/auth/ForgotPassword.vue';
import UsersPage from '@/components/users/UsersPage.vue';
import Profile from '@/components/ProfileView.vue';
import EditProfileView from '@/components/EditProfileView.vue';
import auth from '../store/auth'
import { useToast } from "vue-toastification";
import UserForm from '@/components/users/UserForm.vue';
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
  { path: "/profile", component: Profile, meta: { requiresAuth: true } }, // Profile view page requires login
  { path: "/profile/edit", component: EditProfileView },// Edit profile page
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

