<template>
  <div
    v-if="!todo.isEditing"
    @click.stop="markTodoStatus(todo)"
    class="w-6 h-6 cursor-pointer xsm:absolute xsm:w-8 xsm:h-8 bottom-4 right-4 xsm:m-0 md:w-10 md:h-10"
  >
    <div
      v-if="!todo.isChecked"
      class="w-full h-full border-2 border-black rounded-full xsm:border-4 md:border-6"
    ></div>
    <div v-else class="w-full h-full relative">
      <img class="absolute top-0 w-full h-full" :src="circle" />
      <img class="absolute -top-1 right-0 w-full h-full xsm:-top-1.5" :src="check" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TodoType } from '@/types/text'
import circle from '../../assets/circle.svg'
import check from '../../assets/check.svg'

defineProps<{ todo: TodoType }>()

const emit = defineEmits<{ (e: 'markTodoStatus', isChecked: boolean): void }>()

function markTodoStatus(todo: TodoType) {
  setTimeout(() => {
    emit('markTodoStatus', !todo.isChecked)
  }, 200)
}
</script>
