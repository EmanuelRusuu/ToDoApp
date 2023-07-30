<template>
  <div class="flex flex-col font-medium text-sm xsm:text-base md:text-lg lg:text-xl text-gray-800">
    <p>Welcome,</p>
    <p>{{ username }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ username: string }>()
</script>
