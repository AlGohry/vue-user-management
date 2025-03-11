import { reactive } from "vue";

const auth = reactive({
  user: null, // ده اللي هنتحقق منه
});

export function login(userData) {
  auth.user = userData; // هنا نحفظ بيانات المستخدم
}

export function logout() {
  auth.user = null;
}

export function isAuthenticated() {
  return auth.user !== null; // يرجع true لو المستخدم مسجل دخول
}

export default auth;
