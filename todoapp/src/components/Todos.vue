<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import TodoUl from './TodoUl.vue'
import type { TextIdString } from '../types/text'

const props = defineProps<{
  todos: TextIdString[]
}>()
const emits = defineEmits(['removeTodo'])

function removeTodo(todo: { text: string }) {
  emits('removeTodo', todo)
}
</script>

<template>
  <div class="todos">
    <p v-if="todos.length > 0">These are your tasks:</p>
    <p v-else>You have no tasks</p>
    <TodoUl :todos="todos" @remove-todo="removeTodo" />
  </div>
</template>

<style>
.todos {
  height: 30rem;
  overflow-y: scroll;
}
</style>
