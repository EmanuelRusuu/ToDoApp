<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { TextIdString } from '../types/text'

import TodoForm from './TodoForm.vue'
import Header from './Header.vue'
import Todos from './Todos.vue'

const todos = ref<TextIdString[]>([])
const inputContent = ref('')

function addTodo(inputContent: string) {
  const concatenateIndexWText = todos.value.length + inputContent
  const index = concatenateIndexWText
  const newTodo: TextIdString = {
    text: inputContent,
    id: index
  }

  todos.value.push(newTodo)
}

function removeTodo(todo: TextIdString) {
  todos.value = todos.value.filter((t) => t.id !== todo.id)
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
    <Header v-model="inputContent" :todos="todos" @add-todo="addTodo" />
    <div class="todos-container">
      <TodoForm v-model="inputContent" @add-todo="addTodo" />
      <Todos :todos="todos" @removeTodo="removeTodo" />
    </div>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.todoapp-container {
  margin-top: 170px;
  width: 610px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todos-container {
  width: 100%;
}
</style>
