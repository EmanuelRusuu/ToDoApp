<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import TodoUl from './TodoUl.vue'
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
  <div class="todos">
    <p v-if="todos.length > 0">These are your tasks:</p>
    <p v-else>You have no tasks</p>
    <TodoUl :todos="todos" @remove-todo="removeTodo" />
  </div>
</template>

<style scoped></style>
