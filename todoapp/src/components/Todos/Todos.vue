<template>
  <div class="flex flex-col items-center w-full">
    <ul v-if="searchTodos.length" class="w-full flex flex-col list-none gap-7 xsm:gap-10 md:gap-12">
      <TodoList
        :searchTodos="searchTodos"
        :currentEditedTodo="currentEditedTodo"
        :searchInput="searchInput"
        :selectedSortingButtons="selectedSortingButtons"
        @markTodoStatus="markTodoStatus"
        @displayPopup="displayPopup"
        @get-todo-id="getTodoId"
        @onTodoUpdate="updateTodo"
      />
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
import TodoList from '../TodoList.vue'
import EmptyState from '../EmptyState/EmptyState.vue'
import type { TodoType } from '../../types/text'
import type { SelectedState } from '../../types/selected'
import NoTodosFound from '../EmptyState/NoTodosFound.vue'

defineProps<{
  todos: TodoType[]
  searchInput: string
  searchTodos: TodoType[]
  selectedSortingButtons: SelectedState
  currentEditedTodo: number | null
}>()

const emit = defineEmits<{
  (e: 'getTodoId', id: number): void
  (e: 'displayPopup', isFinishedTodo: boolean): void
  (e: 'markTodoStatus', todo: TodoType): void
  (e: 'onTodoUpdate', todo: TodoType): void
  (e: 'addSearchTodo'): void
}>()

function markTodoStatus(todo: TodoType) {
  emit('markTodoStatus', todo)
}

function displayPopup(todo: boolean) {
  emit('displayPopup', todo)
}

function updateTodo(todo: TodoType) {
  emit('onTodoUpdate', todo)
}

function addSearchTodo() {
  emit('addSearchTodo')
}

function getTodoId(id: number) {
  emit('getTodoId', id)
}
</script>
