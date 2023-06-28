<template>
  <div class="flex flex-col items-center">
    <img class="mt-12 xsm:w-60 xsm:mt-14 md:mt-20 md:w-72" :src="NoTodos" />
    <p
      class="text-xl tracking-normal mt-4 text-gray-500 xsm:text-3xl xsm:mt-10 md:text-5xl md:mt-14"
    >
      You have no todos yet
    </p>
  </div>
</template>

<script setup lang="ts">
import NoTodos from '../../assets/notodosimg.svg'
</script>
