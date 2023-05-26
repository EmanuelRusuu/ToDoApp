<script setup lang="ts">
import TodoList from './components/TodoList.vue'
</script>

<template>
  <div class="app">
    <TodoList />
  </div>
</template>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
}
</style>
