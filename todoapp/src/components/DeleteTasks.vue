<script setup lang="ts">
import { defineEmits } from 'vue'

const emits = defineEmits(['deleteTasks'])

function deleteTasks() {
  emits('deleteTasks')
}
</script>

<template>
  <button @click="deleteTasks">clear all</button>
</template>
