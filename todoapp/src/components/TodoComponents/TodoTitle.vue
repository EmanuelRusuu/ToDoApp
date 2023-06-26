<template>
  <div>
    <input
      v-if="todo.isEditing"
      v-model="localTodo.title"
      class="bg-white todo-title"
      type="text"
      maxlength="19"
      placeholder="Add a title"
      @click.stop="isEditing(todo)"
    />
    <p v-else class="todo-title">
      {{ todo.title }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { TodoType } from '@/types/text'
import { computed } from 'vue'

const props = defineProps<{ todo: TodoType }>()

const emit = defineEmits<{
  (e: 'onTodoUpdate', todo: TodoType): void
  (e: 'isEditing', todo: TodoType): void
}>()

const localTodo = computed({
  get() {
    return props.todo
  },
  set(value) {
    emit('onTodoUpdate', value)
  }
})

function isEditing(todo: TodoType) {
  emit('isEditing', todo)
}
</script>
