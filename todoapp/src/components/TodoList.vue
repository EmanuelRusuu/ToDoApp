<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import type { TextString } from '../types/text'

import TodoForm from './TodoForm.vue'
import Header from './Header.vue'
import Todos from './Todos.vue'

const todos = ref<TextString[]>([])
const inputContent = ref('')

function addTodo(inputContent: string) {
  if (inputContent.trim() === '') {
    return
  }

  const concatenateIndexWText = todos.value.length + inputContent
  const index = concatenateIndexWText
  const newTodo: TextString = {
    text: inputContent,
    id: index
  }

  todos.value.push(newTodo)
}

function deleteTasks() {
  todos.value = []
  localStorage.removeItem('todos')
}

function removeTodo(todo: TextString) {
  todos.value = todos.value.filter((t) => t.text !== todo.text)
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
    <Header @deleteTasks="deleteTasks"></Header>
    <div class="todos-container">
      <TodoForm v-model="inputContent" @addTodo="addTodo"></TodoForm>
      <Todos :todos="todos" @removeTodo="removeTodo"></Todos>
    </div>
  </div>
</template>

<style>
body {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.todoapp-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 4rem;
  background-color: white;
  margin: auto;
}

.todos-container {
  width: 25%;
}

.title-cleartasks {
  display: flex;
  margin: 2rem 0;
  gap: 2rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
