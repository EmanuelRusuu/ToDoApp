<template>
  <div class="flex flex-col items-center w-full pb-20">
    <ul
      v-if="filteredTodos.length"
      class="w-full flex flex-col gap-7 list-none xsm:gap-10 md:gap-12"
    >
      <li v-for="(todo, index) in sortedAndFilteredTodos" :key="index">
        <Todo
          :todo="todo"
          :index="index"
          @deleteTaskIndex="deleteTaskIndex"
          @markTodoStatus="markTodoStatus"
        />
      </li>
    </ul>
    <p v-else-if="todos.length" class="text-2xl text-gray-500 xsm:text-3xl">
      No matching todos found for: <span class="text-black"> {{ searchInputContent }}</span>
    </p>
    <EmptyState v-if="todos.length < 1" :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Todo from './Todo.vue'
import EmptyState from './EmptyState.vue'
import type { TodoType } from '../types/text'
import type { SelectedState } from '@/types/selected'

const props = defineProps<{
  todos: TodoType[]
  searchInputContent: string
  selectedSortingButtons: SelectedState
}>()

const emit = defineEmits<{
  (e: 'deleteTaskIndex', index: number): void
  (e: 'markTodoStatus', todo: TodoType): void
}>()

function deleteTaskIndex(index: number) {
  emit('deleteTaskIndex', index)
}

function markTodoStatus(todo: TodoType) {
  emit('markTodoStatus', todo)
}

const filteredTodos = computed(() => {
  return props.todos.filter((todo) =>
    (todo.title + todo.text).toLowerCase().includes(props.searchInputContent.toLowerCase())
  )
})

const sortedAndFilteredTodos = computed(() => {
  const { selectedSortingButtons } = props
  const selectedButton = Object.keys(selectedSortingButtons).find(
    (key) => selectedSortingButtons[key as keyof SelectedState].selected
  )

  if (selectedButton === 'title' && selectedSortingButtons.title.order) {
    return filteredTodos.value.slice().sort((a, b) => a.title.localeCompare(b.title))
  } else if (selectedButton === 'description' && selectedSortingButtons.description.order) {
    return filteredTodos.value.slice().sort((a, b) => a.text.localeCompare(b.text))
  }

  return filteredTodos.value
})
</script>
