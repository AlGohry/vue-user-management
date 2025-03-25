<template>
  <div class="home-page">

    <HeaderComponent />

    <!-- Main Content -->
    <main class="container my-5">
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card shadow">
            <div class="card-body">
              <h5 class="card-title">الإجراءات السريعة</h5>
              <router-link to="/users" class="btn btn-primary w-100 mb-2">
                إدارة المستخدمين
              </router-link>
              <router-link to="/profile" class="btn btn-outline-secondary w-100">
                الملف الشخصي
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
    <FooterComponent />

  </div>
</template>

<script setup>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";
</script>

