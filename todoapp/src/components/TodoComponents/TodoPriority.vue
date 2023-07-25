<template>
  <div
    @click.stop="changePriority(todo)"
    class="w-h-10 rounded-full priority-option xsm:h-8 gap-2 xsm:absolute xsm:top-6 xsm:right-5 select-none"
    :class="[
      todo.isPriorityChange
        ? 'bg-white text-black border-2 border-black text-lg'
        : getPriorityColor,
      todo.isEditing ? 'xsm:w-32 hidden xsm:flex cursor-pointer xsm: gap-3' : 'xsm:w-28'
    ]"
  >
    <p class="hidden xsm:flex">{{ handleImportance(todo.priority) }}</p>
    <ArrowDown v-if="todo.isEditing" :priorityChange="todo.isPriorityChange" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TodoType } from '@/types/todo'
import ArrowDown from '../Icons/ArrowDown.vue'

const props = defineProps<{ todo: TodoType }>()
defineEmits<{ (e: 'changePriority', isPriorityChange: boolean): void }>()

const priority = { low: 'Low', medium: 'Medium', high: 'High' }

function handleImportance(index: keyof typeof priority) {
  return priority[index]
}

const colorMaps: Record<string, string> = {
  low: 'bg-teal-400',
  medium: 'bg-amber-400',
  high: 'bg-orange-600'
}

const getPriorityColor = computed(() => colorMaps[props.todo.priority as keyof typeof colorMaps])
function changePriority(todo: TodoType) {
  if (todo.isEditing) {
    todo.isPriorityChange = !todo.isPriorityChange
  }
}
</script>
