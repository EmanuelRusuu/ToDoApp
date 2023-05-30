<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { TextString } from '../types/text'
import Header from './Header.vue'
import Todos from './Todos.vue'

const todos = ref<TextString[]>([])
const inputContent = ref('')

function addTodo() {
  const newTodo: TextString = {
    text: inputContent.value
  }
  todos.value.push(newTodo)
}

function removeTodo(index: number) {
  todos.value.splice(index, 1)
}

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')!) || []
})

watch(
  todos,
  (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  },
  { deep: true }
)
</script>

<template>
  <div class="todoapp-container">
    <Header @add-todo="addTodo" />
    <Todos :todos="todos" @removeTodo="removeTodo" />
  </div>
</template>

<style scoped>
.todoapp-container {
  margin-top: 136px;
  width: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
