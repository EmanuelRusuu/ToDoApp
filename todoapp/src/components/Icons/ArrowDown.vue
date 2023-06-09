<script setup lang="ts">
const props = defineProps<{
  priorityChange: boolean
}>()
</script>
<template>
  <svg
    fill="none"
    :stroke="priorityChange ? 'black' : 'white'"
    stroke-width="2.5"
    viewBox="-1 0 27 27"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M19.5 8.25l-8 8-8-8"></path>
  </svg>
</template>
<style scoped>
@media screen and (min-width: 480px) {
  .todo-importance-title svg {
    width: 20px;
    height: 20px;
  }
}
</style>
