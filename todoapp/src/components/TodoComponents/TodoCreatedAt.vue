<template>
  <div class="flex flex-row items-end gap-1 xsm:items-center xsm:mt-1">
    <Calendar
      :class="['h-4 w-4 hidden xsm:block xsm:h-5 xsm:w-5 md:h-6 md:w-6', { block: todo.editing }]"
    />
    <p
      class="w-24 h-4 font-normal text-xs text-gray-700 opacity-30 xsm:h-5 xsm:text-base xsm:text-black xsm:opacity-100 md:text-lg md:h-6"
    >
      {{ todo.created_at }}
    </p>
  </div>
</template>
<script setup lang="ts">
import type { TodoType } from '@/types/text'
import Calendar from '../Icons/Calendar.vue'
defineProps<{ todo: TodoType }>()
</script>
