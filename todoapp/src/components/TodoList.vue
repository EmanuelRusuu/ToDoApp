<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { TodoTypes } from '../types/text'
import Header from './Header.vue'
import Todos from './Todos.vue'

const todos = ref<TodoTypes[]>([])
const isMobile = ref(false)

function handleResize() {
  isMobile.value = window.innerWidth < 650
}

function addTodo() {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  const newTodo: TodoTypes = {
    title: 'Pay for rent',
    text: 'Lorem ipsum dolor sit amet',
    priority: 0,
    status: false,
    created_at: `${day}.${month}.${year}`
  }
  todos.value.push(newTodo)
}

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')!) || []
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
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
    <Header :is-mobile="isMobile" @add-todo="addTodo" />
    <Todos :is-mobile="isMobile" :todos="todos" />
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

@media screen and (min-width: 650px) {
  .todoapp-container {
    width: 610px;
    margin-top: 78px;
  }
}
</style>
