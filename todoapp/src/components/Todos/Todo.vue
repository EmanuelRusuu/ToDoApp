<template>
  <div
    class="relative flex flex-col justify-center gap-38 border-2 border-black rounded-2xl p-4 max-w-288 w-full min-h-82 xsm:max-w-500 xsm:w-full xsm:min-h-140 xsm:py-5 xsm:px-6 md:max-w-610 md:w-full md:min-h-163 md:p-6"
    @click="editTodo(todo.id)"
  >
    <div class="flex items-center justify-between w-full">
      <TodoStatus @mark-todo-status="markTodoStatus" :todo="localTodo" />
      <div class="flex items-center justify-between w-5/6">
        <div
          :class="[
            'flex flex-col justify-between w-full xsm:pr-11 md:p-0',
            { 'opacity-30': localTodo.isPriorityChange }
          ]"
        >
          <TodoTitle :todo="localTodo" @on-title-update="updateTodoTitle" />
          <TodoCreatedAt :todo="localTodo" />
          <TodoText :todo="localTodo" @on-description-update="updateTodoText" />
        </div>
        <TodoPriority :todo="localTodo" @change-priority="updateTodoPriorityChange" />
        <TodoPriorityOptions :todo="localTodo" @selected-priority="updateTodoPriorityValue" />
      </div>
    </div>
    <div
      v-if="localTodo.isEditing"
      :class="[
        'flex flex-row gap-2 flex-wrap mb-4 xsm:mb-0',
        { 'opacity-30': localTodo.isPriorityChange }
      ]"
    >
      <TodoSave @onTodoSave="onTodoUpdate" />
      <TodoDelete @click="displayPopup(false)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { TodoType } from '../../types/text'
import TodoPriority from '../TodoComponents/TodoPriority.vue'
import TodoPriorityOptions from '../TodoComponents/TodoPriorityOptions.vue'
import TodoDelete from '../TodoComponents/TodoDelete.vue'
import TodoSave from '../TodoComponents/TodoSave.vue'
import TodoText from '../TodoComponents/TodoText.vue'
import TodoTitle from '../TodoComponents/TodoTitle.vue'
import TodoCreatedAt from '../TodoComponents/TodoCreatedAt.vue'
import TodoStatus from '../TodoComponents/TodoStatus.vue'

const props = defineProps<{
  todo: TodoType
  index: number
  currentEditedTodo: number | null
}>()

const localTodo = reactive({
  title: props.todo.title,
  text: props.todo.text,
  priority: props.todo.priority,
  isPriorityChange: props.todo.isPriorityChange,
  isChecked: props.todo.isChecked,
  createdAt: props.todo.createdAt,
  isEditing: props.todo.isEditing,
  id: props.todo.id
})

const emit = defineEmits<{
  (e: 'getTodoId', id: number): void
  (e: 'displayPopup', isFinishedTodo: boolean): void
  (e: 'markTodoStatus', todo: TodoType): void
  (e: 'onTodoUpdate', todo: TodoType): void
}>()

function editTodo(id: number) {
  if (props.todo.id === props.currentEditedTodo || !props.currentEditedTodo) {
    localTodo.isEditing = true
    emit('getTodoId', id)
  }
}

function markTodoStatus(isChecked: boolean) {
  localTodo.isChecked = isChecked
  emit('markTodoStatus', localTodo)
}

function displayPopup(isFinishedTodo: boolean) {
  emit('displayPopup', isFinishedTodo)
}

function updateTodoTitle(title: string) {
  localTodo.title = title
}

function updateTodoText(text: string) {
  localTodo.text = text
}

function updateTodoPriorityChange(changedPriority: boolean) {
  localTodo.isPriorityChange = changedPriority
}

function updateTodoPriorityValue(selectedPriority: number) {
  localTodo.priority = selectedPriority
}

function onTodoUpdate() {
  localTodo.isEditing = false
  emit('onTodoUpdate', localTodo)
}
</script>
