<template>
  <li v-for="(todo, index) in sortedAndFilteredTodos" :key="todo._id">
    <Todo
      :todo="todo"
      :index="index"
      :current-edited-todo="currentEditedTodo"
      @get-todo-id="getTodoId"
      @on-todo-update="onTodoUpdate"
      @display-popup="displayPopup"
      @mark-todo-status="markTodoStatus"
      @onTodoUpdate="onTodoUpdate"
    />
  </li>
</template>

<script setup lang="ts">
import type { TodoType } from '@/types/todo'
import type { SelectedState } from '@/types/selected'
import { computed } from 'vue'
import { trimWhiteSpace } from '../helpers/trim'
import Todo from './Todos/Todo.vue'

const props = defineProps<{
  searchInput: string
  currentEditedTodo: string
  selectedSortingButtons: SelectedState
  searchTodos: TodoType[]
}>()

const emit = defineEmits<{
  (e: 'getTodoId', id: string): void
  (e: 'markTodoStatus', todo: TodoType): void
  (e: 'displayPopup', todo: boolean): void
  (e: 'onTodoUpdate', todo: TodoType): void
  (e: 'createDateObject', date: string): void
}>()

function getTodoId(id: string) {
  emit('getTodoId', id)
}

function markTodoStatus(todo: TodoType) {
  emit('markTodoStatus', todo)
}

function displayPopup(isFinishedTodo: boolean) {
  emit('displayPopup', isFinishedTodo)
}

function onTodoUpdate(todo: TodoType) {
  emit('onTodoUpdate', todo)
}

function createDateObject(date: string) {
  return new Date(
    parseInt(date.slice(6, 10)),
    parseInt(date.slice(3, 5)) - 1,
    parseInt(date.slice(0, 2))
  )
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
      const dateA = createDateObject(a.createdAt)
      const dateB = createDateObject(b.createdAt)
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
