<template>
  <PopupTodo
    v-if="isPopUp"
    :id="selectedTodoId"
    @remove-task="removeTask"
    @close-pop-up="closePopUp"
  />
  <PopupFinishedTodo
    v-if="isFinishedTodoPopUp"
    :id="selectedFinishedTodoId"
    @remove-task="removeTask"
    @close-pop-up="closePopUp"
  />
</template>

<script setup lang="ts">
import PopupTodo from './DeletePopups/PopupTodo.vue'
import PopupFinishedTodo from './DeletePopups/PopupFinishedTodo.vue'

const props = defineProps<{
  selectedTodoId: number
  selectedFinishedTodoId: number
  isFinishedTodoPopUp: boolean
  isPopUp: boolean
}>()
const emit = defineEmits<{
  (e: 'removeFinishedTask', id: number): void
  (e: 'removeTask', id: { selectedTodoId: number; selectedFinishedTodoId: number }): void
  (e: 'closePopUp'): void
}>()

function removeTask() {
  const { selectedTodoId, selectedFinishedTodoId } = props
  emit('removeTask', { selectedTodoId, selectedFinishedTodoId })
}

function closePopUp() {
  emit('closePopUp')
}
</script>
