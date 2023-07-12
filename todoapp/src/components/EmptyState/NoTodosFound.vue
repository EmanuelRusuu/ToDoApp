<template>
  <div class="flex flex-col items-center gap-4">
    <p class="text-xl text-gray-500 xsm:text-2xl md:text-3xl">
      No matching todos found for: <span class="text-black"> {{ searchInputContent }}</span>
    </p>
    <div class="flex flex-col items-center gap-2">
      <button @click="addSearchTodo" class="text-lg text-gray-400 xsm:text-xl md:text-xl">
        ( + add to list)
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ searchInputContent: string }>()

const emit = defineEmits<{ (e: 'addSearchTodo'): void }>()

function addSearchTodo() {
  emit('addSearchTodo')
}
</script>
