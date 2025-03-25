<template>
  <div class="users-page d-flex flex-column min-vh-100">
    <HeaderComponent />
    <main class="container mt-5 flex-grow-1">
      <div class="d-flex justify-content-between mb-4">
        <h2>إدارة المستخدمين</h2>
        <router-link v-if="userRole === 'admin'" to="/add-user" class="btn btn-primary">
          <i class="fas fa-plus ms-2"></i> إضافة مستخدم
        </router-link>
      </div>

      <!-- 🔍 Search Bar -->
      <div class="mb-3">
        <input v-model="searchQuery" type="text" class="form-control" placeholder="🔍 ابحث عن مستخدم..." />
      </div>

      <!-- 🔄 Loading Indicator -->
      <div v-if="loading" class="text-center my-5">
        <ProgressSpinner />
      </div>

      <!-- 📊 Users Table -->
      <DataTable v-if="!loading" :value="sortedUsers" tableStyle="min-width: 50rem" :paginator="true" :rows="5"
        :rowsPerPageOptions="[5, 10, 15]">

        <!-- ID Column -->
        <Column field="id" header="معرف" style="width: 5%"></Column>

        <!-- 🔄 Sortable Name Column -->
        <Column field="name" header="الاسم" @click="sortBy('name')" :sortable="true">
          <template #header>
            <i v-if="sortField === 'name'" :class="sortIcon" class="ms-1"></i>
          </template>
          <template #body="{ data }">{{ data.name }}</template>
        </Column>

        <!-- 🔄 Sortable Email Column -->
        <Column field="email" header="البريد الإلكتروني" @click="sortBy('email')" :sortable="true">
          <template #header>
            <i v-if="sortField === 'email'" :class="sortIcon" class="ms-1"></i>
          </template>
          <template #body="{ data }">{{ data.email }}</template>
        </Column>

        <!-- Role Column -->
        <Column header="الصلاحية">
          <template #body="{ data }">
            <Tag :value="getUserRole(data.role)" :severity="getRoleSeverity(data.role)"></Tag>
          </template>
        </Column>

        <!-- Actions Column -->
        <Column header="الإجراءات" style="width: 20%">
          <template #body="{ data }">
            <Button v-if="userRole !== 'guest'" icon="pi pi-pencil" class="p-button-warning p-button-sm" @click="editUser(data.id)" />
            <Button v-if="userRole === 'admin'" icon="pi pi-trash" class="p-button-danger p-button-sm me-2" @click="deleteUser(data.id)" />
          </template>
        </Column>
      </DataTable>

      <Toast />
      <ConfirmDialog />
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Tag from "primevue/tag";
import ProgressSpinner from "primevue/progressspinner";
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";
import userService from "@/services/userService";
import { useToast } from "primevue/usetoast";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";

const users = ref([]);
const loading = ref(true);
const searchQuery = ref("");
const sortField = ref(""); // 🏷️ Sort Field (name/email)
const sortOrder = ref(1); // 🔄 1 for Asc, -1 for Desc
const router = useRouter();
const toast = useToast();
const confirm = useConfirm();

// 🔄 User Role State
const userRole = ref("guest"); 

// 🔄 Fetch Current User Role
const fetchCurrentUser = async () => {
  const user = await userService.getCurrentUser();
  userRole.value = user.role || "guest";
  console.log("🚀 Current User Role:", userRole.value);
};


const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/users");
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    loading.value = false;
  }
};

// 🔄 Sort Users by Field
const sortBy = (field) => {
  if (sortField.value === field) {
    sortOrder.value *= -1; // تبديل الاتجاه (تصاعدي ⇄ تنازلي)
  } else {
    sortField.value = field;
    sortOrder.value = 1; // الافتراضي تصاعدي
  }
};

// 📊 Computed: Filtered & Sorted Users
const sortedUsers = computed(() => {
  return [...users.value]
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField.value) return 0;
      return (
        a[sortField.value].localeCompare(b[sortField.value]) * sortOrder.value
      );
    });
});

// ⬆⬇ Sort Icon Dynamic Class
const sortIcon = computed(() =>
  sortOrder.value === 1 ? "pi pi-sort-amount-up" : "pi pi-sort-amount-down"
);

const editUser = (userId) => {
  router.push(`/edit-user/${userId}`);
};

const deleteUser = (userId) => {
  if (userRole.value !== "admin") return;
  confirm.require({
    message: "هل أنت متأكد من حذف هذا المستخدم؟",
    header: "تأكيد الحذف",
    icon: "pi pi-exclamation-triangle",
    acceptLabel: "نعم، احذف",
    rejectLabel: "إلغاء",
    acceptClass: "p-button-danger",
    accept: async () => {
      try {
        await axios.delete(`http://localhost:3000/users/${userId}`);
        await fetchUsers();
        toast.add({ severity: "success", summary: "تم الحذف", detail: "تم حذف المستخدم بنجاح", life: 3000 });
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.add({ severity: "error", summary: "خطأ", detail: "فشل في حذف المستخدم", life: 3000 });
      }
    },
    reject: () => {
      toast.add({ severity: "info", summary: "إلغاء", detail: "تم إلغاء الحذف", life: 2000 });
    },
  });
};

const getUserRole = (role) => {
  const roles = { admin: "مدير", member: "عضو", guest: "زائر" };
  return roles[role] || "غير معروف";
};

const getRoleSeverity = (role) => {
  const severities = { admin: "danger", member: "success", guest: "info" };
  return severities[role] || "secondary";
};

// 🔄 Fetch Users on Mount
onMounted(async () => {
  await fetchCurrentUser();// fetch the current user role first
  await fetchUsers(); // then fetch the users
});
</script>
