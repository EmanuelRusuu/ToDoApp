<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import DeleteTasks from './DeleteTasks.vue'

const emit = defineEmits(['deleteTasks'])

function deleteTasks() {
  emit('deleteTasks')
}
</script>
<template>
  <div class="title-cleartasks">
    <h1>To do list</h1>
    <DeleteTasks @deleteTasks="deleteTasks"></DeleteTasks>
  </div>
</template>

<style scoped></style>
