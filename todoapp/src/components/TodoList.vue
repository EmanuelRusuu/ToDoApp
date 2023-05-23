<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TodoForm from './TodoForm.vue'
import Header from './Header.vue'
import Todos from './Todos.vue'

const todos = ref<{ text: string }[]>([])
const inputContent = ref('')

function addTodo(inputContent: string) {
  if (inputContent.trim() === '') {
    return
  }

  todos.value.push({
    text: inputContent
  })
  inputContent = ''
}

function deleteTasks() {
  todos.value = []
  localStorage.removeItem('todos')
}

function removeTodo(todo: { text: string }) {
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
      <TodoForm :todos="todos" :inputContent="inputContent" @addTodo="addTodo"></TodoForm>
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
