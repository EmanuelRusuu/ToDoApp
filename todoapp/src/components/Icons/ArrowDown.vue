<template>
  <svg
    fill="none"
    class="w-5 h-5"
    :stroke="priorityChange ? 'black' : 'white'"
    stroke-width="2.5"
    viewBox="0 0 27 27"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M19.5 8.25l-8 8-8-8"></path>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  priorityChange: boolean
}>()
</script>
