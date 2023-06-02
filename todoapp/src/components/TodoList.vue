<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import moment from 'moment'
import type { TodoType } from '../types/text'

import Header from './Header.vue'
import Todos from './Todos.vue'

const todos = ref<TodoType[]>([])

function addTodo() {
  const currentDate = moment().format('DD.MM.YYYY')
  const newTodo: TodoType = {
    title: 'Pay for rent',
    text: 'Lorem ipsum dolor sit amet ipsum dolor sit amet',
    priority: 0,
    status: false,
    created_at: ` ${currentDate}`
  }
  todos.value.push(newTodo)
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
    <Todos :todos="todos" />
  </div>
</template>

<style scoped>
.todoapp-container {
  margin-top: 136px;
  max-width: 288px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (min-width: 480px) {
  .todoapp-container {
    max-width: 500px;
    width: 90%;
    margin-top: 180px;
  }
}

@media screen and (min-width: 768px) {
  .todoapp-container {
    max-width: 610px;
    width: 80%;
    margin-top: 190px;
  }
}
</style>
