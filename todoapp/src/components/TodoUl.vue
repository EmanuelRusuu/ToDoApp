<script setup lang="ts">
import Todo from './Todo.vue'
import type { TextString } from '../types/text'
const props = defineProps<{
  todos: TextString[]
}>()

const emits = defineEmits<{
  (e: 'removeTodo', index: number): void
}>()

function removeTodo(index: number) {
  emits('removeTodo', index)
}
</script>

<template>
  <ul class="todo-ul">
    <Todo :todos="todos" @remove-todo="removeTodo" />
  </ul>
</template>

<style scoped>
.todo-ul {
  height: 100%;
  width: 100%;
  list-style: none;
}
</style>
