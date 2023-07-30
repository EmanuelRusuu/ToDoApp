<template>
  <div class="hidden xsm:flex w-full justify-center mb-5">
    <p v-if="isAccountAvailable" class="text-3xl text-gray-600">
      <span class="text-orange-500">Log in</span> into your account
    </p>
    <p v-else class="text-3xl">
      Incorrect<span class="text-orange-400"> username</span> or
      <span class="text-orange-500">password</span>
    </p>
  </div>
</template>
<script setup lang="ts">
defineProps<{ isAccountAvailable: boolean }>()
</script>
