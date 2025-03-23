<template>
  <div class="users-page d-flex flex-column min-vh-100">
    <HeaderComponent />
    <main class="container mt-5 flex-grow-1">
      <div class="d-flex justify-content-between mb-4">
        <h2>إدارة المستخدمين</h2>
        <router-link to="/add-user" class="btn btn-primary">
          <i class="fas fa-plus ms-2"></i> إضافة مستخدم
        </router-link>
      </div>

      <!-- Loading Indicator -->
      <div v-if="loading" class="text-center my-5">
        <ProgressSpinner />
      </div>

      <!-- Users Table -->
      <DataTable v-if="!loading" :value="users" tableStyle="min-width: 50rem">
        <Column field="id" header="معرف" style="width: 5%"></Column>
        <Column field="name" header="الاسم"></Column>
        <Column field="email" header="البريد الإلكتروني"></Column>

        <!-- Status Column -->
        <Column header="الحالة">
          <template #body="{ data }">
            <Tag :value="getUserRole(data.role)" :severity="getRoleSeverity(data.role)"></Tag>
          </template>
        </Column>

        <!-- Actions Column -->
        <Column header="الإجراءات" style="width: 20%">
          <template #body="{ data }">
            <Button icon="pi pi-pencil" class="p-button-warning p-button-sm" @click="editUser(data.id)" />
            <Button icon="pi pi-trash" class="p-button-danger p-button-sm me-2" @click="deleteUser(data.id)" />
          </template>
        </Column>
      </DataTable>

      <!-- Loading Indicator -->
      <ProgressSpinner v-if="loading" class="my-5" />
      <Toast />
      <ConfirmDialog />

    </main>

    <FooterComponent />

  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Tag from "primevue/tag";
import ProgressSpinner from "primevue/progressspinner";
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

import { useToast } from "primevue/usetoast";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";


const users = ref([]);
const loading = ref(true);
const router = useRouter();

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

const editUser = (userId) => {
  router.push(`/edit-user/${userId}`);
};

const toast = useToast();
const confirm = useConfirm();

const deleteUser = (userId) => {
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

onMounted(fetchUsers);
</script>
