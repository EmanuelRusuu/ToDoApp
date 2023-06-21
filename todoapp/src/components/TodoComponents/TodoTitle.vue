<template>
  <div>
    <input
      v-if="todo.editing"
      v-model="localTodo.title"
      class="max-w-14-rem flex !items-center w-full h-5 bg-white border-0 outline-none font-medium text-lg xsm:w-full xsm:h-7 xsm:font-semibold xsm:text-3xl md:max-w-22-rem md:w-full md:h-12 md:text-42"
      type="text"
      maxlength="19"
      placeholder="Add a title"
      @click.stop="isEditing(todo)"
    />
    <p
      v-else
      class="max-w-14-rem flex !items-center w-full h-5 border-0 outline-none font-medium text-lg xsm:w-full xsm:h-7 xsm:font-semibold xsm:text-3xl md:max-w-22-rem md:w-full md:h-12 md:text-42"
    >
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
