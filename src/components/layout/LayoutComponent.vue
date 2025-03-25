<template>
  <div class="layout">
    <HeaderComponent />
    <main>
      <slot /> <!-- هنا يتم تمرير محتوى الصفحة -->
    </main>
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import FooterComponent from "@/components/layout/FooterComponent.vue";
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex-grow: 1;
  padding: 20px;
}
</style>
