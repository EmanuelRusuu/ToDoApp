<template>
  <div class="w-full flex justify-center">
    <p class="text-l text-gray-300">
      You {{ text }} have an account?
      <span class="text-orange-400 pl-2 cursor-pointer" @click="handleAction()">{{
        selectorText
      }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ text: string; selectorText: string }>()
const emit = defineEmits<{ (e: 'handleAction'): void }>()

function handleAction() {
  emit('handleAction')
}
</script>
