<script setup lang="ts">
import TodoApp from './components/TodoApp.vue'
</script>

<template>
  <div class="app w-screen h-screen flex justify-center overflow-x-hidden">
    <TodoApp />
  </div>
</template>

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
