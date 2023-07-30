<template>
  <button @click="doAction()" :class="text === 'Refresh' ? 'refresh' : 'delete'">
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
const emit = defineEmits<{ (e: 'doAction'): void }>()

function doAction() {
  emit('doAction')
}
</script>
