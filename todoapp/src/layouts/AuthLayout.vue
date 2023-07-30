<template>
  <div
    class="w-screen h-screen relative flex flex-col justify-between px-6 py-20 xsm:max-w-500 xl:pr-20 xl:py-12 md:max-w-610 xl:max-w-none"
  >
    <AuthImages />
    <div class="w-full h-5/6 flex flex-col justify-end xl:h-full xl:items-center">
      <div class="w-full flex flex-col gap-5 xl:w-2/6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthImages from '../components/Authentication/AuthImages.vue'
</script>
