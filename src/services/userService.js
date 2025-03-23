import axios from "axios";

const API_URL = "http://localhost:3000/users"; // تأكد من تشغيل JSON Server

export default {
  async getUsers() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      return [];
    }
  },

  async getUserById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching user:", error);
      return null;
    }
  },

  async getCurrentUser() {
    try {
      const storedUserId = localStorage.getItem("currentUserId"); // اجلب الـ ID من التخزين المحلي
      if (!storedUserId) {
        console.warn("⚠️ No user ID found in localStorage. Defaulting to guest.");
        return { role: "guest" }; // ارجاع زائر كافتراضي
      }

      const response = await axios.get(`${API_URL}/${storedUserId}`);
      return response.data || { role: "guest" };
    } catch (error) {
      console.error("❌ Error fetching current user:", error);
      return { role: "guest" };
    }
  },
};
