<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import TodoUl from './TodoUl.vue'
import NoTodosMobile from '../assets/notodosmobile.svg'
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
    <TodoUl :todos="todos" @remove-todo="removeTodo" />
    <img :src="NoTodosMobile" v-if="todos.length < 1" />
  </div>
</template>

<style scoped>
.todos {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
