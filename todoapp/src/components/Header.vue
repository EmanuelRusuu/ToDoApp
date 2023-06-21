<template>
  <div class="w-full flex flex-row justify-between items-center mb-12">
    <h1 class="w-24 h-7 text-2xl xsm:w-64 xsm:h-14 xsm:text-5xl md:w-72 md:h-20 md:text-7xl">
      To do list
    </h1>
    <button
      @click="handleAdd"
      class="border-0 flex justify-center items-center cursor-pointer w-8 h-8 rounded-full bg-emerald-500 text-white xsm:w-12 xsm:h-12 md:w-16 md:h-16"
    >
      <svg viewBox="-4 -4 32 32" stroke="currentColor">
        <path d="M12 6v12m6-6H6" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'addTodo'): void
}>()

function handleAdd() {
  emit('addTodo')
}
</script>
