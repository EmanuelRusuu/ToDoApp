<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import addTodo from '../assets/addbutton.svg'
import addTodoDesktop from '../assets/addTaskDesktop.svg'

const props = defineProps<{ isMobile: boolean }>()

const emit = defineEmits<{
  (e: 'addTodo'): void
}>()

function handleAdd() {
  emit('addTodo')
}
</script>

<template>
  <div class="header">
    <h1 class="header-title">To do list</h1>
    <button @click="handleAdd" class="add-todo-btn">
      <img :src="isMobile ? addTodo : addTodoDesktop" />
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
  margin-bottom: 49px;
}
.header-title {
  width: 92px;
  height: 26px;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
}
.add-todo-btn {
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--add-todo-btn);
}

@media screen and (min-width: 650px) {
  .header-title {
    width: 275px;
    height: 86px;
    font-size: 72px;
    line-height: 86px;
  }

  .add-todo-btn {
    width: 60px;
    height: 60px;
  }
}
</style>
