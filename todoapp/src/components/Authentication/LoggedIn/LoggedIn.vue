<template>
  <div class="w-full flex justify-between mb-6">
    <Welcome :username="username" />
    <Logout v-if="isLoggedIn" @logOut="logOut" />
  </div>
  <hr class="bg-gray-200 w-full mb-6 xsm:hidden" />
</template>

<script setup lang="ts">
import Logout from './Logout.vue'
import Welcome from './Welcome.vue'

defineProps<{ isLoggedIn: boolean; username: string }>()
const emit = defineEmits<{ (e: 'logOut'): void }>()

function logOut() {
  emit('logOut')
}
</script>
