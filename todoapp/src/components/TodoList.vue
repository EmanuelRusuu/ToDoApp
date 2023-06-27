<template>
  <div>
    <DeletePopUP
      v-if="popUp"
      :index="selectedTaskIndex"
      @toggle-pop-up="togglePopUp"
      @remove-task="removeTask"
    />
  </div>
  <div
    class="relative flex flex-col items-center mt-32 max-w-288 w-4/5 xsm:max-w-500 xsm:w-11/12 xsm:mt-44 md:max-w-610 md:w-4/5 md:mt-48"
  >
    <Header @add-todo="addTodo" />
    <SearchTodos v-if="todos.length" v-model="searchInputContent" />
    <FilterTodos v-if="todos.length" :selectedSortingButtons="selectedSortingButtons" />
    <Todos
      :todos="todos"
      :searchInputContent="searchInputContent"
      :selected-sorting-buttons="selectedSortingButtons"
      @delete-task-index="deleteTaskIndex"
      @mark-todo-status="markTodoStatus"
    />
    <DoneTodos
      v-if="doneTodos.length > 0"
      :doneTodos="doneTodos"
      @deleteFinishedTodo="deleteFinishedTodo"
      @mark-todo-status="markTodoStatus"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import moment from 'moment'
import type { TodoType } from '../types/text'
import DeletePopUP from './DeletePopUP.vue'
import Header from './Header.vue'
import Todos from './Todos.vue'
import DoneTodos from './DoneTodos.vue'
import SearchTodos from './SearchTodos.vue'
import FilterTodos from './FilterTodos.vue'

const todos = ref<TodoType[]>([])
const doneTodos = ref<TodoType[]>([])
const popUp = ref(false)
const selectedTaskIndex = ref()
const searchInputContent = ref('')
const selectedSortingButtons = ref({
  title: { selected: true, order: true },
  description: { selected: false, order: true },
  priority: { selected: false, order: true },
  date: { selected: false, order: true }
})

function addTodo() {
  const currentDate = moment().format('DD.MM.YYYY')
  const newTodo: TodoType = {
    title: 'Add a title',
    text: 'Add a description',
    isTextEdit: false,
    priority: 0,
    isPriorityChange: false,
    isStatus: false,
    createdAt: currentDate,
    isEditing: false
  }

  todos.value.push(newTodo)
}
onMounted(() => {
  const storedTodos = localStorage.getItem('todos')
  if (storedTodos) {
    todos.value = JSON.parse(storedTodos)
  }
  const storedDoneTodos = localStorage.getItem('doneTodos')
  if (storedDoneTodos) {
    doneTodos.value = JSON.parse(storedDoneTodos)
  }
})
watch(
  todos,
  (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  },
  { deep: true }
)
watch(
  doneTodos,
  (newVal) => {
    localStorage.setItem('doneTodos', JSON.stringify(newVal))
  },
  { deep: true }
)
function deleteTaskIndex(index: number) {
  popUp.value = true
  selectedTaskIndex.value = index
}
function deleteFinishedTodo(index: number) {
  doneTodos.value.splice(index, 1)
}
function togglePopUp() {
  popUp.value = !popUp.value
}
function removeTask(index: number) {
  todos.value.splice(index, 1)
  togglePopUp()
}
function markTodoStatus(todo: TodoType) {
  const todosIndex = todos.value.findIndex((item) => item === todo)
  const doneTodosIndex = doneTodos.value.findIndex((item) => item === todo)
  if (todosIndex !== -1) {
    todos.value.splice(todosIndex, 1)
    todo.isStatus = true
    doneTodos.value.push(todo)
    return
  }
  if (doneTodosIndex !== -1) {
    doneTodos.value.splice(doneTodosIndex, 1)
    todo.isStatus = false
    todos.value.push(todo)
  }
}
</script>
