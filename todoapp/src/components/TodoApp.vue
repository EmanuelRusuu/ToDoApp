<template>
  <PopupTodo
    v-if="isPopUp"
    @remove-task="removeTask"
    @close-pop-up="closePopUp"
    :id="currentEditedTodo ?? -1"
  />
  <div
    class="relative flex flex-col items-center mt-32 h-fit max-w-288 w-4/5 xsm:max-w-500 xsm:w-11/12 xsm:mt-44 md:max-w-610 md:w-4/5 md:mt-48"
  >
    <Header @add-todo="addTodo" />
    <div v-if="todos.length" class="flex flex-col w-full">
      <SearchTodos
        v-model="localSearchInput"
        @clearSearchInput="clearSearchInput"
        @doSearch="doSearch"
      />
      <FilterTodos :selectedSortingButtons="selectedSortingButtons" />
    </div>

    <div
      class="flex flex-col w-full gap-7 xsm:gap-10 md:gap-12"
      :class="!finishedTodos.length ? 'pb-10 xsm:pb-20 md:pb-40' : ''"
    >
      <Todos
        :todos="todos"
        :search-input="searchInput"
        :search-todos="searchTodos"
        :current-edited-todo="currentEditedTodo"
        :selected-sorting-buttons="selectedSortingButtons"
        @get-todo-id="getTodoId"
        @on-todo-update="updateTodo"
        @display-popup="displayPopup"
        @add-search-todo="addSearchTodo"
        @mark-todo-status="markTodoStatus"
      />
      <FinishedTodos
        v-if="finishedTodos.length"
        :search-input="searchInput"
        :current-edited-todo="currentEditedTodo"
        :search-finished-todos="searchFinishedTodos"
        :selected-sorting-buttons="selectedSortingButtons"
        @get-todo-id="getTodoId"
        @on-todo-update="updateTodo"
        @display-popup="displayPopup"
        @mark-todo-status="markTodoStatus"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { TodoType } from '../types/text'
import { findItemIndex } from '../helpers/findItemIndex'
import { getLocalStorageData } from '../helpers/getLocal'
import moment from 'moment'
import Header from './Header.vue'
import Todos from './Todos/Todos.vue'
import FinishedTodos from './FinishedTodos.vue'
import SearchTodos from './SearchTodos.vue'
import FilterTodos from './FilterTodos.vue'
import PopupTodo from './PopupTodo.vue'

const todos = ref<TodoType[]>([])
const finishedTodos = ref<TodoType[]>([])
const isPopUp = ref(false)
const searchInput = ref('')
const localSearchInput = ref('')
const currentEditedTodo = ref<number | null>(null)
const selectedSortingButtons = ref({
  title: { selected: true, order: true },
  description: { selected: false, order: true },
  priority: { selected: false, order: true },
  date: { selected: false, order: true }
})

const commonTodoProperties = {
  text: 'Add a description',
  priority: 0,
  isPriorityChange: false,
  isChecked: false,
  isEditing: false
}

function createNewTodo(title: string) {
  const currentDate = moment().format('DD.MM.YYYY')
  const customId = createId()

  return {
    title: title,
    createdAt: currentDate,
    id: customId,
    ...commonTodoProperties
  }
}

function addTodo() {
  const newTodo = createNewTodo('Add a title')
  todos.value.push(newTodo)
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

function addSearchTodo() {
  const searchInputValue = searchInput.value.trim()
  const newTodo = createNewTodo(searchInputValue)
  todos.value.push(newTodo)
  localStorage.setItem('todos', JSON.stringify(todos.value))
  clearSearchInput()
}

function clearSearchInput() {
  searchInput.value = ''
  localSearchInput.value = ''
}

function closePopUp() {
  isPopUp.value = false
}

function createId() {
  const timestamp = moment().valueOf()
  const randomNum = Math.floor(Math.random() * 1000)
  return timestamp + randomNum
}

function displayPopup() {
  isPopUp.value = true
}

function doSearch() {
  searchInput.value = localSearchInput.value
}

function filterTodosBySearchInput(todosArray: TodoType[], searchInput: string) {
  return todosArray.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      todo.text.toLowerCase().includes(searchInput.toLowerCase())
  )
}

function getTodoId(id: number) {
  currentEditedTodo.value = id
}

function markTodoStatus(todo: TodoType) {
  const updatedFinishedTodos = finishedTodos.value.filter((item) => item.id !== todo.id)
  const updatedTodos = todos.value.filter((item) => item.id !== todo.id)

  if (todo.isChecked) {
    updatedFinishedTodos.push(todo)
  } else {
    updatedTodos.push(todo)
  }

  finishedTodos.value = updatedFinishedTodos
  todos.value = updatedTodos

  localStorage.setItem('todos', JSON.stringify(todos.value))
  localStorage.setItem('finishedTodos', JSON.stringify(finishedTodos.value))
}

function removeTask() {
  const todoId = currentEditedTodo.value

  const todoIndex = findItemIndex(todos.value, (todo) => todo.id === todoId)
  const finishedTodoIndex = findItemIndex(finishedTodos.value, (todo) => todo.id === todoId)

  if (todoIndex !== -1) {
    todos.value.splice(todoIndex, 1)
    localStorage.setItem('todos', JSON.stringify(todos.value))
    todos.value = todos.value.filter((todo) => todo.id !== todoId)
  } else if (finishedTodoIndex !== -1) {
    finishedTodos.value.splice(finishedTodoIndex, 1)
    localStorage.setItem('finishedTodos', JSON.stringify(finishedTodos.value))
    finishedTodos.value = finishedTodos.value.filter((todo) => todo.id !== todoId)
  }

  closePopUp()
  currentEditedTodo.value = null
}

function updateTodo(updatedTodo: TodoType) {
  const todoIndex = findItemIndex(todos.value, (todo) => todo.id === updatedTodo.id)
  const finishedTodoIndex = findItemIndex(finishedTodos.value, (todo) => todo.id === updatedTodo.id)

  if (todoIndex !== -1) {
    const editingTodo = { ...todos.value[todoIndex], ...updatedTodo }
    todos.value.splice(todoIndex, 1, editingTodo)
    todos.value[todoIndex].isEditing = false
  } else if (finishedTodoIndex !== -1) {
    const editingFinishedTodo = { ...finishedTodos.value[finishedTodoIndex], ...updatedTodo }
    finishedTodos.value.splice(finishedTodoIndex, 1, editingFinishedTodo)
    finishedTodos.value[finishedTodoIndex].isEditing = false
  }
  localStorage.setItem('todos', JSON.stringify(todos.value))
  localStorage.setItem('finishedTodos', JSON.stringify(finishedTodos.value))
  currentEditedTodo.value = null
}

const searchTodos = computed(() => filterTodosBySearchInput(todos.value, searchInput.value))

const searchFinishedTodos = computed(() =>
  filterTodosBySearchInput(finishedTodos.value, searchInput.value)
)

onMounted(() => {
  getLocalStorageData('todos', todos, 'todo')
  getLocalStorageData('finishedTodos', finishedTodos, 'finishedTodo')
})
</script>
