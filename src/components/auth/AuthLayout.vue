<template>
  <div class="auth-layout d-flex align-items-center justify-content-center vh-100">
    <div class="auth-container p-4 shadow-lg bg-white rounded">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  background: linear-gradient(135deg, #007bff, #6610f2);
}
.auth-container {
  width: 100%;
  max-width: 400px;
  text-align: center;
}
</style>
