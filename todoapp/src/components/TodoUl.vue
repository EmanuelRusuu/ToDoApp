<script setup lang="ts">
import Todo from './Todo.vue'
import type { TodoTypes } from '../types/text'

const props = defineProps<{
  todos: TodoTypes[]
  isMobile: boolean
}>()
</script>
<template>
  <ul class="todo-ul">
    <Todo :is-mobile="isMobile" :todos="todos" />
  </ul>
</template>
<style scoped>
.todo-ul {
  height: 100%;
  width: 100%;
  list-style: none;
}
</style>
