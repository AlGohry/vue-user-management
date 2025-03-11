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
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
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
