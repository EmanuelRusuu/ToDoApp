<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
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
  <li class="todo" v-for="(todo, index) in todos" :key="index">
    {{ todo.text }}
    <button class="remove-todo-btn" @click="removeTodo(index)">remove</button>
  </li>
</template>

<style scoped>
.todo {
  width: 291px;
  height: 82px;
  background-color: var(--todo);
  border: 2px solid #000000;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 30px;
  list-style: none;
}

.remove-todo-btn {
  height: 2rem;
  margin: 1rem;
}
</style>
