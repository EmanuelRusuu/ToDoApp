<template>
  <div class="close-icon" @click="togglePopUp">
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

<style scoped>
.close-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}
</style>
