<template>
  <DeletePopup
    v-if="isPopupDisplayed"
    :is-pop-up="isPopUp"
    :selected-todo-id="selectedTodoId"
    :is-finished-todo-pop-up="isFinishedTodoPopUp"
    :selected-finished-todo-id="selectedFinishedTodoId"
    @remove-task="removeTask"
    @close-pop-up="closePopUp"
  />
  <div
    class="relative flex flex-col items-center mt-32 max-w-288 w-4/5 xsm:max-w-500 xsm:w-11/12 xsm:mt-44 md:max-w-610 md:w-4/5 md:mt-48"
  >
    <Header @add-todo="addTodo" />
    <SearchTodos
      v-if="todos.length"
      v-model="localSearchInput"
      @clearSearchInput="clearSearchInput"
      @doSearch="doSearch"
    />
    <FilterTodos v-if="todos.length" :selectedSortingButtons="selectedSortingButtons" />
    <div class="flex flex-col w-full gap-7 xsm:gap-10 md:gap-12">
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
        :finished-todos="finishedTodos"
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
import moment from 'moment'
import type { TodoType } from '../types/text'
import Header from './Header.vue'
import Todos from './Todos/Todos.vue'
import FinishedTodos from './FinishedTodos/FinishedTodos.vue'
import SearchTodos from './SearchTodos.vue'
import FilterTodos from './FilterTodos.vue'
import DeletePopup from './DeletePopup.vue'

const todos = ref<TodoType[]>([])
const finishedTodos = ref<TodoType[]>([])
const isPopUp = ref(false)
const isFinishedTodoPopUp = ref(false)
const selectedTodoId = ref()
const selectedFinishedTodoId = ref()
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

function addTodo() {
  const currentDate = moment().format('DD.MM.YYYY')
  const customId = createId()

  const newTodo = {
    title: 'Add a title',
    createdAt: currentDate,
    id: customId,
    ...commonTodoProperties
  }

  todos.value.push(newTodo)
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

function addSearchTodo() {
  const currentDate = moment().format('DD.MM.YYYY')
  const customId = createId()
  const searchInputValue = searchInput.value.trim()

  const newTodo = {
    title: searchInputValue,
    createdAt: currentDate,
    id: customId,
    ...commonTodoProperties
  }

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
  isFinishedTodoPopUp.value = false
}

function createId() {
  const timestamp = Date.now()
  const randomNum = Math.floor(Math.random() * 1000)
  return timestamp + randomNum
}

function displayPopup(isFinishedTodo: boolean) {
  if (isFinishedTodo) {
    isFinishedTodoPopUp.value = true
  } else {
    isPopUp.value = true
  }
}

function doSearch() {
  searchInput.value = localSearchInput.value
}

function getTodoId(id: number, isFinishedTodo: boolean) {
  currentEditedTodo.value = id
  if (isFinishedTodo) {
    selectedFinishedTodoId.value = id
  } else {
    selectedTodoId.value = id
  }
}

const isPopupDisplayed = computed(() => isPopUp.value || isFinishedTodoPopUp.value)

function markTodoStatus(todo: TodoType) {
  if (todo.isChecked) {
    const updatedFinishedTodos = [...finishedTodos.value, todo]
    const updatedTodos = todos.value.filter((item) => item.id !== todo.id)
    finishedTodos.value = updatedFinishedTodos
    todos.value = updatedTodos
  } else {
    const updatedTodos = [...todos.value, todo]
    const updatedFinishedTodos = finishedTodos.value.filter((item) => item.id !== todo.id)
    todos.value = updatedTodos
    finishedTodos.value = updatedFinishedTodos
  }

  localStorage.setItem('todos', JSON.stringify(todos.value))
  localStorage.setItem('finishedTodos', JSON.stringify(finishedTodos.value))
}

function removeTask(ids: { selectedTodoId: number; selectedFinishedTodoId: number }) {
  const { selectedTodoId: todoId, selectedFinishedTodoId: finishedTodoId } = ids
  const todoIndex = todos.value.findIndex((todo) => todo.id === todoId)
  const finishedTodoIndex = finishedTodos.value.findIndex((todo) => todo.id === finishedTodoId)

  if (todoIndex !== -1) {
    todos.value.splice(todoIndex, 1)
    localStorage.setItem('todos', JSON.stringify(todos.value))
    todos.value = todos.value.filter((todo) => todo.id !== todoId)
  } else if (finishedTodoIndex !== -1) {
    finishedTodos.value.splice(finishedTodoIndex, 1)
    localStorage.setItem('finishedTodos', JSON.stringify(finishedTodos.value))
    finishedTodos.value = finishedTodos.value.filter((todo) => todo.id !== finishedTodoId)
  }
  closePopUp()
  selectedTodoId.value = null
  selectedFinishedTodoId.value = null
  currentEditedTodo.value = null
}

function updateTodo(updatedTodo: TodoType) {
  const todoIndex = todos.value.findIndex((todo) => todo.id === updatedTodo.id)
  const finishedTodoIndex = finishedTodos.value.findIndex((todo) => todo.id === updatedTodo.id)

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

const searchTodos = computed(() => {
  return todos.value.filter(
    (todo) =>
      todo.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      todo.text.toLowerCase().includes(searchInput.value.toLowerCase())
  )
})

const searchFinishedTodos = computed(() => {
  return finishedTodos.value.filter(
    (finishedTodos) =>
      finishedTodos.title.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      finishedTodos.text.toLowerCase().includes(searchInput.value.toLowerCase())
  )
})

onMounted(() => {
  const storedTodos = localStorage.getItem('todos')
  if (storedTodos) {
    todos.value = JSON.parse(storedTodos).map((todo: TodoType) => {
      return { ...todo, isEditing: false }
    })
  }
  const storedFinishedTodos = localStorage.getItem('finishedTodos')
  if (storedFinishedTodos) {
    finishedTodos.value = JSON.parse(storedFinishedTodos).map((finishedTodo: TodoType) => {
      return { ...finishedTodo, isEditing: false }
    })
  }
})
</script>
