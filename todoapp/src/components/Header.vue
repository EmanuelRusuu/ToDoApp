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
    <button class="add-todo">
      <img :src="plus" />
    </button>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.header-title {
  font-size: 2rem;
}

.add-todo {
  background-color: var(--add-todo-button);
  border: 0;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: var(--br-add-todo-button);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
