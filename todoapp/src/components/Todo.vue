<template>
  <div
    class="relative flex flex-col justify-center gap-38 border-2 border-black rounded-2xl p-4 max-w-288 w-full min-h-82 xsm:max-w-500 xsm:w-full xsm:min-h-140 xsm:py-5 xsm:px-6 md:max-w-610 md:w-full md:min-h-163 md:p-6"
    @click="isEditing(todo)"
  >
    <div class="flex items-center w-full">
      <TodoStatus @mark-todo-status="markTodoStatus" :todo="todo" />
      <div class="flex items-center justify-between flex-grow">
        <div
          :class="['flex flex-col justify-between w-full', { 'opacity-30': todo.isPriorityChange }]"
        >
          <TodoTitle :todo="todo" @is-editing="isEditing" />
          <TodoCreatedAt :todo="todo" />
          <TodoText :todo="todo" />
        </div>
        <TodoPriority :todo="todo" />
        <TodoPriorityOptions :todo="todo" />
      </div>
    </div>
    <div
      v-if="todo.isEditing"
      :class="[
        'flex flex-row gap-2 flex-wrap mb-4 xsm:mb-0',
        { 'opacity-30': todo.isPriorityChange }
      ]"
    >
      <TodoSave :todo="todo" />
      <TodoDelete @delete-task-index="deleteTaskIndex" :index="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoType } from '../types/text'
import TodoPriority from './TodoComponents/TodoPriority.vue'
import TodoPriorityOptions from './TodoComponents/TodoPriorityOptions.vue'
import TodoDelete from './TodoComponents/TodoDelete.vue'
import TodoSave from './TodoComponents/TodoSave.vue'
import TodoText from './TodoComponents/TodoText.vue'
import TodoTitle from './TodoComponents/TodoTitle.vue'
import TodoCreatedAt from './TodoComponents/TodoCreatedAt.vue'
import TodoStatus from './TodoComponents/TodoStatus.vue'

defineProps<{
  todo: TodoType
  index: number
}>()

const emit = defineEmits<{
  (e: 'deleteTaskIndex', index: number): void
  (e: 'markTodoStatus', todo: TodoType): void
  (e: 'onTodoUpdate', todo: TodoType): void
  (e: 'deleteFinishedTodo', index: number): void
}>()

function isEditing(todo: TodoType) {
  todo.isEditing = true
}

function markTodoStatus(todo: TodoType) {
  emit('markTodoStatus', todo)
}

function deleteTaskIndex(index: number) {
  emit('deleteTaskIndex', index)
  emit('deleteFinishedTodo', index)
}
</script>
