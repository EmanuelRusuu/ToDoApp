<template>
  <div class="w-full flex flex-col pb-20 gap-7 xsm:gap-10 md:gap-12">
    <hr v-if="isActiveSearch" class="border-t border-dotted border-gray-300" />
    <ul class="flex flex-col list-none gap-8 xsm:gap-10 md:gap-12">
      <li
        class="opacity-30"
        v-for="(finishedTodo, index) in sortedAndFilteredFinishedTodos"
        :key="finishedTodo.id"
      >
        <FinishedTodo
          :index="index"
          :finished-todo="finishedTodo"
          :current-edited-todo="currentEditedTodo"
          @get-todo-id="getTodoId"
          @on-todo-update="updateTodo"
          @display-popup="displayPopup"
          @mark-todo-status="markTodoStatus"
        />
      </li>
    </ul>
    <p v-if="isEmptySearch" class="text-xl text-gray-500 xsm:text-2xl md:text-3xl text-center">
      No finished todos matching.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TodoType } from '../../types/text'
import type { SelectedState } from '../../types/selected'
import FinishedTodo from './FinishedTodo.vue'

const props = defineProps<{
  searchInput: string
  finishedTodos: TodoType[]
  searchFinishedTodos: TodoType[]
  currentEditedTodo: number | null
  selectedSortingButtons: SelectedState
}>()

const emit = defineEmits<{
  (e: 'getTodoId', id: number, isFinishedTodo: boolean): void
  (e: 'markTodoStatus', finishedTodo: TodoType): void
  (e: 'displayPopup', isFinishedTodo: boolean): void
  (e: 'onTodoUpdate', finishedTodo: TodoType): void
}>()

function getTodoId(id: number, isFinishedTodo: boolean) {
  emit('getTodoId', id, isFinishedTodo)
}

function markTodoStatus(finishedTodo: TodoType) {
  emit('markTodoStatus', finishedTodo)
}

function updateTodo(finishedTodo: TodoType) {
  emit('onTodoUpdate', finishedTodo)
}

function displayPopup(isFinishedTodo: boolean) {
  emit('displayPopup', isFinishedTodo)
}

const isActiveSearch = computed(() => props.searchFinishedTodos.length || props.searchInput)
const isEmptySearch = computed(() => !props.searchFinishedTodos.length && props.searchInput)

const sortedAndFilteredFinishedTodos = computed(() => {
  const selectedButton = Object.keys(props.selectedSortingButtons).find(
    (key) => props.selectedSortingButtons[key as keyof SelectedState].selected
  )

  if (selectedButton === 'title') {
    return props.searchFinishedTodos
      .slice()
      .sort((a, b) =>
        props.selectedSortingButtons.title.order
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      )
  } else if (selectedButton === 'description') {
    return props.searchFinishedTodos
      .slice()
      .sort((a, b) =>
        props.selectedSortingButtons.description.order
          ? a.text.localeCompare(b.text)
          : b.text.localeCompare(a.text)
      )
  } else if (selectedButton === 'date') {
    return props.searchFinishedTodos.slice().sort((a, b) => {
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
    return props.searchFinishedTodos
      .slice()
      .sort((a, b) =>
        props.selectedSortingButtons.priority.order
          ? a.priority - b.priority
          : b.priority - a.priority
      )
  }

  return props.searchFinishedTodos
})
</script>
