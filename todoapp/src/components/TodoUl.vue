<script setup lang="ts">
import { defineProps } from 'vue'
import type { TextString } from '../types/text'
const props = defineProps<{
  todos: TextString[]
}>()
const emits = defineEmits(['removeTodo'])

function removeTodo(todo: string) {
  emits('removeTodo', todo)
}
</script>

<template>
  <ul class="todo-ul">
    <li class="todo" v-for="todo in todos" :key="todo.text">
      - {{ todo.text }}
      <button @click="removeTodo(todo.text)">remove</button>
    </li>
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
