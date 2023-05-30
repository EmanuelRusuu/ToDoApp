<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { TodoTypes } from '../types/text'
import Incomplete from '../assets/eclipseblack.svg'
const props = defineProps<{
  todos: TodoTypes[]
}>()
const emits = defineEmits<{
  (e: 'removeTodo', index: number): void
}>()
function removeTodo(index: number) {
  emits('removeTodo', index)
}
</script>
<template>
  <li class="todo" v-for="(todo, index) in todos" :key="index">
    <div class="status-container">
      <img v-if="!todo.status" :src="Incomplete" alt="incomplete" />
    </div>
    <div class="todo-content">
      <p class="todo-text">
        {{ todo.title }}
      </p>
      <p class="todo-created_at">
        {{ todo.created_at }}
      </p>
    </div>
    <div class="todo-importance-container">
      <div class="todo-importance"></div>
    </div>
    <button class="remove-todo-btn" @click="removeTodo(index)">remove</button>
  </li>
</template>
<style scoped>
.todo {
  display: flex;
  align-items: center;
  width: 291px;
  height: 82px;
  background-color: var(--todo);
  border: 2px solid #000000;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 30px;
  list-style: none;
}
.remove-todo-btn {
  height: 2rem;
  margin: 1rem;
}
.status-container img {
  width: 24px;
  height: 24px;
}
.todo-content {
  display: flex;
  flex-direction: column;
}
.todo-text {
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.02em;
}

.todo-importance {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: red;
}

@media screen and (min-width: 650px) {
  .todo {
    width: 610px;
    height: 163px;
    padding: 1rem;
    margin-bottom: 50px;
    flex-direction: row-reverse;
  }

  .status-container img {
    width: 40px;
    height: 40px;
  }

  .todo-created_at {
    display: none;
  }
}
</style>
