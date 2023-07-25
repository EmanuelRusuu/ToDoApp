<template>
  <div
    @click="logOut"
    class="border-2 border-gray-300 xsm:bg-gray-200 xsm:border-0 w-12 h-12 xsm:w-28 xsm:h-12 flex justify-center items-center rounded-2xl cursor-pointer"
  >
    <p class="hidden xsm:flex">Log out</p>
    <img class="xsm:hidden" :src="Logout" alt="logout" />
  </div>
</template>

<script setup lang="ts">
import Logout from '../../assets/logout.svg'

const emit = defineEmits<{ (e: 'logOut'): void }>()

function logOut() {
  emit('logOut')
  localStorage.removeItem('user')
}
</script>
