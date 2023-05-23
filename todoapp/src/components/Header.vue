<script setup lang="ts">
import DeleteTasks from './DeleteTasks.vue'
import { defineEmits } from 'vue'
const emits = defineEmits(['deleteTasks'])

function deleteTasks() {
  emits('deleteTasks')
}
</script>
<template>
  <div class="title-cleartasks">
    <h1>To Do APP</h1>
    <DeleteTasks @deleteTasks="deleteTasks"></DeleteTasks>
  </div>
</template>
