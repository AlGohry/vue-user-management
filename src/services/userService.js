import axios from "axios";

const API_URL = "http://localhost:3000/users"; // تأكد إن السيرفر شغال

export default {
  async getUsers() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },

  async getUserById(id) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
  },
};
