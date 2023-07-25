<template>
  <div>
    <textarea
      v-if="todo.isEditing"
      type="text"
      class="todo-text flex text-start border-0 outline-none resize-none h-20 xsm:h-36 md:h-44 md:w-full"
      @input="updateLocalText"
      :placeholder="localText"
    ></textarea>
    <p v-else :class="['todo-text  xsm:block', todo.isEditing ? 'block' : 'hidden xsm:block']">
      {{ todo.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { TodoType } from '@/types/todo'
import { computed } from 'vue'

const props = defineProps<{ todo: TodoType }>()

const emit = defineEmits<{ (e: 'onDescriptionUpdate', text: string): void }>()

const localText = computed({
  get() {
    return props.todo.text
  },
  set(value) {
    emit('onDescriptionUpdate', value)
  }
})

function updateLocalText(event: Event) {
  const target = event.target as HTMLTextAreaElement
  localText.value = target.value
}
</script>
