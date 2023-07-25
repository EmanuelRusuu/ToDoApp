<template>
  <div>
    <textarea
      v-if="todo.isEditing"
      v-model="localTitle"
      class="bg-white todo-title h-12 resize-none"
      type="text"
      placeholder="Add a title"
    ></textarea>
    <p v-else class="todo-title">
      {{ todo.title }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { TodoType } from '@/types/todo'
import { computed } from 'vue'

const props = defineProps<{ todo: TodoType }>()

const emit = defineEmits<{
  (e: 'onTitleUpdate', title: string): void
}>()

const localTitle = computed({
  get() {
    return props.todo.title
  },
  set(value) {
    emit('onTitleUpdate', value)
  }
})
</script>
