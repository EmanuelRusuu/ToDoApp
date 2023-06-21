<template>
  <button
    @click.stop="deleteTaskIndex(index)"
    class="flex flex-row justify-center items-center gap-2 rounded-lg text-sm border-none outline-none px-4 py-1 h-7 cursor-pointer select-none w-16 bg-gray-200 xsm:w-24 xsm:h-10 xsm:rounded-2xl xsm:text-base md:w-28 md:h-12 md:rounded-2xl md:text-lg"
  >
    Delete
  </button>
</template>

<script setup lang="ts">
defineProps<{ index: number }>()

const emit = defineEmits<{
  (e: 'deleteTaskIndex', index: number): void
  (e: 'deleteFinishedTodo', index: number): void
}>()

function deleteTaskIndex(index: number) {
  emit('deleteTaskIndex', index)
  emit('deleteFinishedTodo', index)
}
</script>
