<template>
  <button
    @click="handleSubmit()"
    type="submit"
    class="bg-gradient-to-br from-emerald-300 via-emerald-400 bg-emerald-500 w-full text-white p-3 rounded-lg font-bold tracking-wide"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
const emit = defineEmits<{ (e: 'handleSubmit'): void }>()

function handleSubmit() {
  emit('handleSubmit')
}
</script>
