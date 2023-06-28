<template>
  <div
    class="relative flex flex-col justify-center gap-38 border-2 border-black rounded-2xl p-4 max-w-288 w-full min-h-82 xsm:max-w-500 xsm:w-full xsm:min-h-140 xsm:py-5 xsm:px-6 md:max-w-610 md:w-full md:min-h-163 md:p-6"
    @click="editTodo(finishedTodo.id, true)"
  >
    <div class="flex items-center w-full">
      <TodoStatus @mark-todo-status="markTodoStatus" :todo="localTodo" />
      <div class="flex items-center justify-between flex-grow">
        <div
          :class="[
            'flex flex-col justify-between w-full',
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
      <TodoSave @onTodoSave="onSave" />
      <DeleteFinishedTodo @click="displayPopup(true)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { TodoType } from '../../types/text'
import TodoPriority from '../TodoComponents/TodoPriority.vue'
import TodoPriorityOptions from '../TodoComponents/TodoPriorityOptions.vue'
import DeleteFinishedTodo from '../TodoComponents/DeleteFinishedTodo.vue'
import TodoSave from '../TodoComponents/TodoSave.vue'
import TodoText from '../TodoComponents/TodoText.vue'
import TodoTitle from '../TodoComponents/TodoTitle.vue'
import TodoCreatedAt from '../TodoComponents/TodoCreatedAt.vue'
import TodoStatus from '../TodoComponents/TodoStatus.vue'

const props = defineProps<{
  currentEditedTodo: number | null
  finishedTodo: TodoType
  index: number
}>()

const emit = defineEmits<{
  (e: 'getTodoId', id: number, isFinishedTodo: boolean): void
  (e: 'displayPopup', isFinishedTodo: boolean): void
  (e: 'markTodoStatus', todo: TodoType): void
  (e: 'onTodoUpdate', todo: TodoType): void
}>()

const localTodo = reactive({
  title: props.finishedTodo.title,
  text: props.finishedTodo.text,
  priority: props.finishedTodo.priority,
  isPriorityChange: props.finishedTodo.isPriorityChange,
  isChecked: props.finishedTodo.isChecked,
  createdAt: props.finishedTodo.createdAt,
  isEditing: props.finishedTodo.isEditing,
  id: props.finishedTodo.id
})

function editTodo(id: number, isFinishedTodo: boolean) {
  if (props.currentEditedTodo === null) {
    localTodo.isEditing = true
    emit('getTodoId', id, isFinishedTodo)
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

function onSave() {
  localTodo.isEditing = false
  emit('onTodoUpdate', localTodo)
}
</script>
