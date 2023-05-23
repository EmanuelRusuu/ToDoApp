<script setup lang="ts">
import TodoUl from './TodoUl.vue'
import { defineEmits } from 'vue'

const props = defineProps(['todos'])
const emits = defineEmits(['removeTodo'])

function removeTodo(todo: string) {
  emits('removeTodo', todo)
}
</script>

<template>
  <div class="todos">
    <p v-if="todos.length > 0">These are your tasks:</p>
    <p v-else>You have no tasks</p>
    <TodoUl :todos="todos" @removeTodo="removeTodo"></TodoUl>
  </div>
</template>

<style>
.todos {
  height: 30rem;
  overflow-y: scroll;
}
</style>
