<template>
  <div
    v-if="todo.isEditing"
    :class="{ absolute: todo.isPriorityChange, 'flex xsm:hidden': !todo.isPriorityChange }"
    class="flex-row absolute top-2 right-5 gap-2 xsm:w-32 xsm:h-28 xsm:flex-col xsm:top-16 xsm:right-5 xsm:border-2 xsm:border-black xsm:bg-white xsm:rounded-2xl xsm:px-4 xsm:py-2"
  >
    <div
      v-for="item in priorityItems"
      :key="item.value"
      :class="[
        'priority-mobile',
        item.colorClass,
        { 'priority-selection': todo.priority === item.value }
      ]"
      @click="setPriority(todo, item.value)"
    >
      <p class="priority-text">{{ item.label }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoType } from '@/types/text'

defineProps<{ todo: TodoType }>()

const priorityItems = [
  { value: 2, label: 'High', colorClass: 'bg-orange-600 xsm:bg-white priority-option-mobile' },
  { value: 1, label: 'Medium', colorClass: 'bg-amber-400 xsm:bg-white priority-option-mobile' },
  { value: 0, label: 'Low', colorClass: 'bg-teal-400 xsm:bg-white priority-option-mobile' }
]

function setPriority(todo: TodoType, number: number) {
  todo.priority = number
  todo.isPriorityChange = false
}
</script>
