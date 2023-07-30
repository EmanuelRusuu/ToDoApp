<template>
  <div class="hidden xsm:flex w-full justify-center mb-5">
    <p v-if="!isEmailRegistered && isPassordMatching" class="text-3xl text-gray-600">
      <span class="text-orange-500">Create</span> an account
    </p>
    <p v-if="isEmailRegistered" class="text-3xl">
      Email<span class="text-orange-400"> already</span> exists
    </p>
    <p v-if="!isPassordMatching" class="text-3xl">
      Passwords<span class="text-orange-400"> do not</span> match
    </p>
  </div>
</template>
<script setup lang="ts">
defineProps<{ isEmailRegistered: boolean; isPassordMatching: boolean }>()
</script>
