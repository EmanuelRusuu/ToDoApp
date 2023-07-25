<template>
  <div class="hidden xl:flex xl:w-80 xl:h-80 absolute top-0 right-20">
    <img :src="Sloth" alt="hello" />
  </div>
  <div class="hidden xl:flex xl:w-4/6 xl:h-5/6 xl:justify-center xl:items-center">
    <img class="lg:h-4/6 xl:h-full" :src="AuthToDoList" alt="loginimage" />
  </div>
  <div class="xl:hidden h-1/2 flex flex-col items-center justify-center">
    <img :src="AuthLogo" alt="logo" class="w-4/6" />
  </div>
</template>

<script setup lang="ts">
import AuthToDoList from '../../assets/login.png'
import AuthLogo from '../../assets/authlogo.png'
import Sloth from '../../assets/bgfill.png'
</script>
