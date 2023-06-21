<template>
  <div
    v-if="todo.editing"
    :class="todo.priorityChange ? 'absolute' : 'flex xsm:hidden'"
    class="flex-row absolute top-2 right-5 gap-2 xsm:w-32 xsm:h-28 xsm:flex-col xsm:top-16 xsm:right-5 xsm:border-2 xsm:border-black xsm:bg-white xsm:rounded-2xl xsm:px-4 xsm:py-2"
  >
    <div
      :class="[
        'w-h-10 rounded-full gap-2 flex items-center xsm:bg-transparent cursor-pointer',
        'bg-red-500 xsm:bg-white xsm:text-lg xsm:h-8 xsm:w-full',
        { 'border border-black xsm:border-none': todo.priority === 2 }
      ]"
      @click="setPriority(todo, 2)"
    >
      <p class="hidden xsm:block xsm:text-lg xsm:text-black xsm:w-full xsm:cursor-pointer">High</p>
    </div>
    <div
      :class="[
        'w-h-10 rounded-full gap-2 flex items-center xsm: bg-transparent cursor-pointer',
        ' bg-yellow-400 xsm:bg-white xsm:text-lg xsm:h-8 xsm:w-full',
        { 'border border-black xsm:border-none': todo.priority === 1 }
      ]"
      @click="setPriority(todo, 1)"
    >
      <p class="hidden xsm:block xsm:text-lg xsm:text-black xsm:w-full xsm:cursor-pointer">
        Medium
      </p>
    </div>
    <div
      :class="[
        'w-h-10 rounded-full gap-2 flex items-center xsm: bg-transparent cursor-pointer',
        '  xsm:text-lg xsm:h-8 xsm:w-full',
        { 'border border-black xsm:border-none': todo.priority === 0 },
        todo.priorityChange ? '!xsm:bg-white' : '!bg-teal-400'
      ]"
      @click="setPriority(todo, 0)"
    >
      <p class="hidden xsm:block xsm:text-lg xsm:text-black xsm:w-full xsm:cursor-pointer">Low</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoType } from '@/types/text'

defineProps<{ todo: TodoType }>()

function setPriority(todo: TodoType, number: number) {
  todo.priority = number
  todo.priorityChange = false
}
</script>
