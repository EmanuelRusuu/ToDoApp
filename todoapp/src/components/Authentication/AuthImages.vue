<template>
  <div class="hidden xl:flex xl:w-80 xl:h-80 absolute top-0 right-20">
    <img :src="Sloth" alt="hello" />
  </div>
  <div class="xl:hidden flex flex-col items-center justify-center">
    <img :src="AuthLogo" alt="logo" class="w-60 h-60 md:w-72 md:h-72" />
  </div>
</template>

<script setup lang="ts">
import AuthLogo from '../../assets/authlogo.png'
import Sloth from '../../assets/bgfill.png'
</script>
