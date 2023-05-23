<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps(['todos'])
const emits = defineEmits(['removeTodo'])

const removeTodo = (todo: string) => {
  emits('removeTodo', todo)
}
//calls the removeTodo method in parent component giving the todo as parameter
</script>

<template>
  <ul>
    <li class="todo" v-for="todo in todos" :key="todo.text">
      {{ todo.text }}
      <button @click="removeTodo(todo)">remove</button>
    </li>
  </ul>
</template>
