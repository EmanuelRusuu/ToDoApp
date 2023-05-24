<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import DeleteTasks from './DeleteTasks.vue'

<<<<<<< develop
const emit = defineEmits(['deleteTasks'])

function deleteTasks() {
  emit('deleteTasks')
}
</script>
<template>
  <div class="title-cleartasks">
    <h1>To do list</h1>
    <DeleteTasks @deleteTasks="deleteTasks"></DeleteTasks>
=======
<template>
  <div class="header">
    <h1 class="header-title">To do list</h1>
>>>>>>> ITL-8 Add the title
  </div>
</template>

<style scoped></style>
