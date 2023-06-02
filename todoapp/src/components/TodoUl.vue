<script setup lang="ts">
import Todo from './Todo.vue'
import type { TodoType } from '../types/text'

const props = defineProps<{
  todos: TodoType[]
}>()
</script>
<template>
  <ul class="todo-ul">
    <Todo :todos="todos" />
  </ul>
</template>
<style scoped>
.todo-ul {
  height: 100%;
  width: 100%;
}
</style>
