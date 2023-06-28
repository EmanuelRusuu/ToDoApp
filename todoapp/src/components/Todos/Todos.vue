<template>
  <div class="flex flex-col items-center w-full">
    <ul v-if="searchTodos.length" class="w-full flex flex-col list-none gap-7 xsm:gap-10 md:gap-12">
      <li v-for="(todo, index) in sortedAndFilteredTodos" :key="todo.id">
        <Todo
          :todo="todo"
          :index="index"
          :current-edited-todo="currentEditedTodo"
          @get-todo-id="getTodoId"
          @on-todo-update="updateTodo"
          @display-popup="displayPopup"
          @mark-todo-status="markTodoStatus"
        />
      </li>
    </ul>
    <NoTodosFound
      v-else-if="todos.length"
      :search-input-content="searchInput"
      @add-search-todo="addSearchTodo"
    />
    <EmptyState v-if="!todos.length" :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Todo from './Todo.vue'
import EmptyState from '../EmptyState/EmptyState.vue'
import type { TodoType } from '../../types/text'
import type { SelectedState } from '../../types/selected'
import NoTodosFound from '../EmptyState/NoTodosFound.vue'

const props = defineProps<{
  todos: TodoType[]
  searchInput: string
  searchTodos: TodoType[]
  selectedSortingButtons: SelectedState
  currentEditedTodo: number | null
}>()

const emit = defineEmits<{
  (e: 'getTodoId', id: number, isFinishedTodo: boolean): void
  (e: 'getId', id: number, isFinishedTodo: boolean): void
  (e: 'displayPopup', isFinishedTodo: boolean): void
  (e: 'markTodoStatus', todo: TodoType): void
  (e: 'onTodoUpdate', todo: TodoType): void
  (e: 'clearSearchInput'): void
  (e: 'addSearchTodo'): void
}>()

function updateTodo(todo: TodoType) {
  emit('onTodoUpdate', todo)
}

function getTodoId(id: number, isFinishedTodo: boolean) {
  emit('getTodoId', id, isFinishedTodo)
}

function markTodoStatus(todo: TodoType) {
  emit('markTodoStatus', todo)
}

function displayPopup(isFinishedTodo: boolean) {
  emit('displayPopup', isFinishedTodo)
}

function addSearchTodo() {
  emit('addSearchTodo')
}

function trimWhiteSpace(str: string) {
  return str.trim()
}

const sortedAndFilteredTodos = computed(() => {
  const selectedButton = Object.keys(props.selectedSortingButtons).find(
    (key) => props.selectedSortingButtons[key as keyof SelectedState].selected
  )

  if (selectedButton === 'title') {
    return props.searchTodos
      .slice()
      .sort((a, b) =>
        props.selectedSortingButtons.title.order
          ? trimWhiteSpace(a.title).localeCompare(trimWhiteSpace(b.title))
          : trimWhiteSpace(b.title).localeCompare(trimWhiteSpace(a.title))
      )
  } else if (selectedButton === 'description') {
    return props.searchTodos
      .slice()
      .sort((a, b) =>
        props.selectedSortingButtons.description.order
          ? trimWhiteSpace(a.text).localeCompare(trimWhiteSpace(b.text))
          : trimWhiteSpace(b.text).localeCompare(trimWhiteSpace(a.text))
      )
  } else if (selectedButton === 'date') {
    return props.searchTodos.slice().sort((a, b) => {
      const dateA = new Date(
        parseInt(a.createdAt.slice(6, 10)),
        parseInt(a.createdAt.slice(3, 5)) - 1,
        parseInt(a.createdAt.slice(0, 2))
      )
      const dateB = new Date(
        parseInt(b.createdAt.slice(6, 10)),
        parseInt(b.createdAt.slice(3, 5)) - 1,
        parseInt(b.createdAt.slice(0, 2))
      )
      return props.selectedSortingButtons.date.order
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })
  } else if (selectedButton === 'priority') {
    return props.searchTodos
      .slice()
      .sort((a, b) =>
        props.selectedSortingButtons.priority.order
          ? a.priority - b.priority
          : b.priority - a.priority
      )
  }

  return props.searchTodos
})
</script>
