<template>
  <div class="app w-screen h-screen flex justify-center overflow-x-hidden">
    <AuthTodo />
  </div>
</template>

<script setup lang="ts">
import AuthTodo from './components/AuthTodo.vue'
</script>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
