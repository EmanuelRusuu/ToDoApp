<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TodoUl from './TodoUl.vue'
import TodoForm from './TodoForm.vue'
const todos = ref<{ text: string }[]>([])
const inputContent = ref('')
console.log('parinte: ' + inputContent.value.trim())

const addTodo = () => {
  if (inputContent.value.trim() === '') {
    return
  }

  todos.value.push({
    text: inputContent.value
  })
  inputContent.value = ''
}

watch(
  todos,
  (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  },
  { deep: true }
)

onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')!) || []
})

const deleteTasks = () => {
  todos.value = []
  localStorage.removeItem('todos')
}

const removeTodo = (todo: { text: string }) => {
  todos.value = todos.value.filter((t) => t.text !== todo.text)
}
</script>

<template>
  <div class="todoapp-main-container">
    <div class="title-cleartasks">
      <h1>To Do APP</h1>
      <button @click="deleteTasks">clear all</button>
    </div>
    <div class="todoapp-form">
      <TodoForm :inputContent="inputContent" @addTodo="addTodo"></TodoForm>
      <div class="todos">
        <p>These are your tasks:</p>
        <TodoUl :todos="todos" @removeTodo="removeTodo"></TodoUl>
      </div>
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
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.todoapp-main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 4rem;
  background-color: white;
  margin: auto;
}

.todoapp-form {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 20rem;
  gap: 1rem;
  margin-bottom: 2rem;
}
.title-cleartasks {
  display: flex;
  margin: 2rem 0;
  gap: 2rem;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.todo-container {
  height: 36rem;
  width: 100%;
  overflow-y: scroll;
}

.todo {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
</style>
<!-- <ul class="todo-container">
  <li class="todo" v-for="todo in todos" :key="todo.text">
    - {{ todo.text }}
    <button @click="removeTodo(todo)">remove</button>
  </li>
</ul> -->

<!-- calls the removeTodo method, by comparing the todos array with todos filtered array 
  // makes the array empty []
  // removing tasks by filtering todos. Creates a new array and then can compare the current todo to the filtered todo.
  we can now use the todo.text because we have set the text:string for the const todos  
  v-for - loops thru the todos  
  v-model="inputContent" - the inputContent value is changed live as the user types 
  calling deleteTasks - clears out all the tasks by setting an empty array and deleting localStorage info
  // If the todo.text from the origian array matches  the filtered array, it gets deleted
  // and clears out the localStorage "todos"
  // when reloading we need the tasks that have been added to mount / be able again so the user can use them
  // when the todos gets a new value / string / task, it saves it in localStorage as a string
  // when adding a task, the input will clear so the user can introduce another task easily
  // text now represents the inputContent`s value (we can now acces todo.text (todo in todos))
  // else the return will be -> we are pushing the inputContent(it`s value) in the todos array
 calls the addTodo method 
  //if the inputContent is empty / if the user did not type anything in the input, returns nothing
  // inputContent = live input of the user -->
