<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import type { TextIdString } from '../types/text'

const props = defineProps<{
  todos: TextIdString[]
}>()
const emits = defineEmits<{
  (e: 'removeTodo', todo: TextIdString): void
}>()

function removeTodo(todo: TextIdString) {
  emits('removeTodo', todo)
}
</script>

<template>
  <li class="todo" v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
    <button @click="removeTodo(todo)">remove</button>
  </li>
</template>
