<template>
  <div class="w-full flex flex-col pb-20 gap-7 xsm:gap-10 md:gap-12">
    <hr v-if="isActiveSearch" class="border-t border-dotted border-gray-300" />
    <ul class="opacity-30 flex flex-col list-none gap-8 xsm:gap-10 md:gap-12">
      <TodoList
        :searchTodos="searchFinishedTodos"
        :currentEditedTodo="currentEditedTodo"
        :searchInput="searchInput"
        :selectedSortingButtons="selectedSortingButtons"
        @markTodoStatus="markTodoStatus"
        @displayPopup="displayPopup"
        @get-todo-id="getTodoId"
        @onTodoUpdate="updateTodo"
      />
    </ul>
    <p v-if="isEmptySearch" class="text-xl text-gray-500 xsm:text-2xl md:text-3xl text-center">
      No finished todos matching.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TodoType } from '../types/text'
import type { SelectedState } from '../types/selected'
import TodoList from './TodoList.vue'

const props = defineProps<{
  searchInput: string
  searchFinishedTodos: TodoType[]
  selectedSortingButtons: SelectedState
  currentEditedTodo: number | null
}>()

const emit = defineEmits<{
  (e: 'getTodoId', id: number): void
  (e: 'displayPopup', isFinishedTodo: boolean): void
  (e: 'markTodoStatus', todo: TodoType): void
  (e: 'onTodoUpdate', todo: TodoType): void

  (e: 'clearSearchInput'): void
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

function getTodoId(id: number) {
  emit('getTodoId', id)
}
const isActiveSearch = computed(() => props.searchFinishedTodos.length || props.searchInput)
const isEmptySearch = computed(() => !props.searchFinishedTodos.length && props.searchInput)
</script>
