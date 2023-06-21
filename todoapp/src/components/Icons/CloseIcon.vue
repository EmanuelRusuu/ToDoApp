<template>
  <div class="absolute top-4 right-4 z-10 w-5 h-5 cursor-pointer" @click="togglePopUp">
    <svg
      fill="none"
      stroke="darkgray"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'togglePopUp'): void
}>()

function togglePopUp() {
  emit('togglePopUp')
}
</script>
