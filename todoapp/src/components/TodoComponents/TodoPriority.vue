<template>
  <div
    @click.stop="changePriority(todo)"
    class="w-h-10 rounded-full gap-2 xsm:absolute xsm:top-6 xsm:right-5 select-none"
    :class="[
      { 'hidden cursor-pointer xsm:!w-32 xsm: gap-3 md:w-32': todo.editing },
      { '!bg-white !text-black border-2 border-black text-lg ': todo.priorityChange },
      handleImportance(todo.priority)
    ]"
  >
    <p class="hidden xsm:flex">{{ handleImportance(todo.priority) }}</p>
    <ArrowDown v-if="todo.editing" :priorityChange="todo.priorityChange" />
  </div>
</template>

<script setup lang="ts">
import ArrowDown from '../Icons/ArrowDown.vue'
import type { TodoType } from '@/types/text'

defineProps<{ todo: TodoType }>()

const priority = { 0: 'Low', 1: 'Medium', 2: 'High' }

function handleImportance(index: keyof typeof priority) {
  return priority[index]
}

function changePriority(todo: TodoType) {
  if (todo.editing) {
    todo.priorityChange = !todo.priorityChange
  }
}
</script>

<style scoped>
.High {
  background-color: #ff481f;
}

.Medium {
  background: #ffab00;
}
.Low {
  background: #38cbcb;
}

@media screen and (min-width: 480px) {
  .Low,
  .Medium,
  .High {
    border-radius: 500px;
    display: flex;
    justify-content: center;
    color: white;
    align-items: center;
  }

  .Low {
    width: 91px;
    height: 33px;
  }

  .Medium {
    width: 125px;
    height: 33px;
  }

  .High {
    width: 91px;
    height: 33px;
  }
}
</style>
