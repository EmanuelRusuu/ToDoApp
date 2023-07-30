<template>
  <DeletePopup
    v-if="isPopUp"
    @remove-task="removeTask"
    @close-pop-up="closePopUp"
    :id="currentEditedTodo"
  />
  <div
    class="relative flex flex-col items-center mt-32 h-fit max-w-288 w-4/5 xsm:max-w-500 xsm:w-11/12 xsm:mt-44 md:max-w-610 md:w-4/5 md:mt-48"
  >
    <LoggedIn :isLoggedIn="isLoggedIn" :username="username" @log-out="logOut" />
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
import type { TodoType } from '../../types/todo'
import { findItemIndex } from '../../helpers/findItemIndex'
import moment from 'moment'
import Header from '../MainPageComponents/Header.vue'
import Todos from '../Todos/Todos.vue'
import FinishedTodos from '../Todos/FinishedTodos.vue'
import SearchTodos from '../HandleTodos/SearchTodos.vue'
import FilterTodos from '../HandleTodos/FilterTodos.vue'
import DeletePopup from '../MainPageComponents/DeletePopup.vue'
import LoggedIn from '../Authentication/LoggedIn/LoggedIn.vue'
import axios from 'axios'

defineProps<{ isLoggedIn: boolean }>()
const emit = defineEmits<{ (e: 'logOut'): void; (e: 'handleAdmin'): void }>()

const username = ref('')
const userId = ref('')

const todos = ref<TodoType[]>([])
const finishedTodos = ref<TodoType[]>([])
const isPopUp = ref(false)
const searchInput = ref('')
const localSearchInput = ref('')
const currentEditedTodo = ref('')
const selectedSortingButtons = ref({
  title: { selected: true, order: true },
  description: { selected: false, order: true },
  priority: { selected: false, order: true },
  date: { selected: false, order: true }
})

async function postTodos(todo: TodoType) {
  try {
    const response = await axios.post('http://localhost:3000/todos', todo)
    return response.data
  } catch (error) {
    console.error('Error posting todo:', error)
    throw error
  }
}

const commonTodoProperties = {
  _id: '',
  text: 'Add a description',
  priority: 'low',
  isPriorityChange: false,
  isChecked: false,
  isEditing: false
}

function createNewTodo(title: string) {
  const currentDate = moment().toDate()

  return {
    title: title,
    createdAt: currentDate,
    userId: userId.value,
    ...commonTodoProperties
  }
}

async function addTodo() {
  const newTodo = createNewTodo('Add a title')

  try {
    const addedTodo = await postTodos(newTodo)

    newTodo._id = addedTodo.todo._id
    todos.value.push(newTodo)
  } catch (error) {
    console.error('Error adding todo:', error)
  }
}

async function addSearchTodo() {
  const searchInputValue = searchInput.value.trim()
  const newTodo = createNewTodo(searchInputValue)
  todos.value.push(newTodo)

  clearSearchInput()
  postTodos(newTodo)
  await fetchUserAndTodos()
}

function clearSearchInput() {
  searchInput.value = ''
  localSearchInput.value = ''
}

function closePopUp() {
  isPopUp.value = false
}

function logOut() {
  emit('logOut')
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

function getTodoId(id: string) {
  currentEditedTodo.value = id
}

async function markTodoStatus(todo: TodoType) {
  const updatedTodo = { ...todo, isChecked: true, userId: userId.value }

  try {
    await axios.put(`http://localhost:3000/todos/${updatedTodo._id}`, updatedTodo)

    await axios.post('http://localhost:3000/finished', updatedTodo)

    const updatedTodos = todos.value.filter((t) => t._id !== updatedTodo._id)
    todos.value = updatedTodos

    const updatedFinishedTodos = [...finishedTodos.value, updatedTodo]
    finishedTodos.value = updatedFinishedTodos
  } catch (error) {
    console.error('Error updating todo:', error)
  }
}

// ?? DELETING /TODOS WORKS
// ?? DELETING /FINISHED does not work
// !!!! check the currenteditedtodo
// ??cannot uncheck todo

async function removeTask() {
  const todoId = currentEditedTodo.value
  const todoIndexInTodos = findItemIndex(todos.value, (todo) => todo._id === todoId)
  const todoIndexInFinishedTodos = findItemIndex(finishedTodos.value, (todo) => todo._id === todoId)

  try {
    if (todoIndexInTodos !== -1) {
      const todo = todos.value[todoIndexInTodos]
      if (todo.isChecked) {
        await axios.delete(`http://localhost:3000/finished/${todoId}`)
        finishedTodos.value.splice(todoIndexInFinishedTodos, 1)
      } else {
        await axios.delete(`http://localhost:3000/todos/${todoId}`)
        todos.value.splice(todoIndexInTodos, 1)
      }
    } else if (todoIndexInFinishedTodos !== -1) {
      await axios.delete(`http://localhost:3000/finished/${todoId}`)
      finishedTodos.value.splice(todoIndexInFinishedTodos, 1)
    }

    closePopUp()
    currentEditedTodo.value = ''
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

function updateTodo(updatedTodo: TodoType) {
  const todoIndex = findItemIndex(todos.value, (todo) => todo._id === updatedTodo._id)
  const finishedTodoIndex = findItemIndex(
    finishedTodos.value,
    (todo) => todo._id === updatedTodo._id
  )

  if (todoIndex !== -1) {
    const editingTodo = { ...todos.value[todoIndex], ...updatedTodo }
    todos.value.splice(todoIndex, 1, editingTodo)
    todos.value[todoIndex].isEditing = false
  } else if (finishedTodoIndex !== -1) {
    const editingFinishedTodo = { ...finishedTodos.value[finishedTodoIndex], ...updatedTodo }
    finishedTodos.value.splice(finishedTodoIndex, 1, editingFinishedTodo)
    finishedTodos.value[finishedTodoIndex].isEditing = false
  }

  // try {
  //   await axios.put(`http://localhost:3000/todos/${updatedTodo._id}`, updatedTodo)

  //   await fetchUserAndTodos()
  // } catch (error) {
  //   console.error('Error updating todo:', error)
  // }

  currentEditedTodo.value = ''
}

const searchTodos = computed(() => filterTodosBySearchInput(todos.value, searchInput.value))

const searchFinishedTodos = computed(() =>
  filterTodosBySearchInput(finishedTodos.value, searchInput.value)
)

async function fetchUserAndTodos() {
  try {
    const userEmail = localStorage.getItem('user')

    if (!userEmail) {
      console.error('User email not found in localStorage')
      return
    }

    const response = await fetch(`http://localhost:3000/user/${encodeURIComponent(userEmail)}`)
    const userData = await response.json()

    if (!userData || !userData.username) {
      console.error('User not found for the provided email')
      return
    }

    if (userEmail === 'admin@gmail.com') {
      emit('handleAdmin')
    }

    username.value = userData.username
    userId.value = userData._id

    const todosResponse = await axios.get(`http://localhost:3000/todos/${userId.value}`)
    todos.value = todosResponse.data.todos

    const finishedTodosResponse = await axios.get(`http://localhost:3000/finished/${userId.value}`)
    finishedTodos.value = finishedTodosResponse.data.finishedTodos
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
}

onMounted(async () => {
  try {
    const userEmail = localStorage.getItem('user')

    if (!userEmail) {
      console.error('User email not found in localStorage')
      return
    }

    const response = await fetch(`http://localhost:3000/user/${encodeURIComponent(userEmail)}`)
    const data = await response.json()

    if (!data || !data.username) {
      console.error('User not found for the provided email')
      return
    }

    username.value = data.username
    userId.value = data._id
  } catch (error) {
    console.error('Error fetching user data:', error)
  }
})

onMounted(async () => {
  await fetchUserAndTodos()
})
</script>
