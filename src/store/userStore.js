import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null, // تحميل المستخدم لو كان مسجل
  }),
  actions: {
    login(userData) {
      this.user = userData;
      localStorage.setItem("user", JSON.stringify(userData)); // حفظ البيانات في التخزين المحلي
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user"); // إزالة بيانات المستخدم عند تسجيل الخروج
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user, // إرجاع true لو فيه مستخدم مسجل
  },
});
