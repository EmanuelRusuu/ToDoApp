<script setup lang="ts">
import Todo from './Todo.vue'
import type { TextIdString } from '../types/text'
const props = defineProps<{
  todos: TextIdString[]
}>()

const emits = defineEmits(['removeTodo'])

function removeTodo(todo: TextIdString) {
  emits('removeTodo', todo)
}
</script>

<template>
  <ul class="todo-ul">
    <Todo :todos="todos" @remove-todo="removeTodo" />
  </ul>
</template>

<style>
.todo {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  overflow-wrap: break-word;
}

.todo-ul {
  height: 100%;
  width: 100%;
}
</style>
