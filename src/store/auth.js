import { reactive } from "vue";
import axios from "axios";

const storedUser = JSON.parse(localStorage.getItem("user")); // تحميل بيانات المستخدم من التخزين
const auth = reactive({
  user: storedUser || null, // حفظ الحالة بناءً على التخزين المحلي
});

export function login(userData) {
  auth.user = userData;
  localStorage.setItem("user", JSON.stringify(userData)); // تخزين البيانات تلقائيًا
}

export function logout() {
  auth.user = null;
  localStorage.removeItem("user"); // حذف البيانات عند تسجيل الخروج
}

export async function register(userData) {
  const response = await axios.get(`http://localhost:3000/users?email=${userData.email}`);
  if (response.data.length > 0) {
    throw new Error("هذا البريد الإلكتروني مسجل بالفعل!");
  } else {
    await axios.post("http://localhost:3000/users", userData);
    auth.user = userData; // تحديث المستخدم بعد التسجيل
    return true;
  }
}

export function isAuthenticated() {
  return auth.user !== null;
}

export default auth;
