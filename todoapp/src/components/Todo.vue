<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { TodoType } from '../types/text'
import Incomplete from '../assets/eclipseblack.svg'
import Complete from '../assets/completedTask.png'

const props = defineProps<{
  todos: TodoType[]
}>()

const priority = { 0: 'Low', 1: 'Medium', 2: 'High' }

function handleImportance(index: keyof typeof priority) {
  return priority[index]
}

function toggleTodoState(todo: TodoType) {
  todo.status = !todo.status
}
</script>
<template>
  <div class="todo" v-for="(todo, index) in todos" :key="index">
    <div @click="toggleTodoState(todo)" class="status-container">
      <img v-if="!todo.status" class="status" :src="Incomplete" alt="incomplete" />
      <img v-else class="status" :src="Complete" alt="complete" />
    </div>
    <div class="todo-importance-wrap">
      <div class="todo-content">
        <p class="todo-title">
          {{ todo.title }}
        </p>
        <p class="todo-text">{{ todo.text }}</p>
        <p class="todo-created_at">
          {{ todo.created_at }}
        </p>
      </div>
      <div :class="handleImportance(todo.priority)" class="todo-importance-container">
        <p class="todo-importance">{{ handleImportance(todo.priority) }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.todo {
  display: flex;
  align-items: center;
  background-color: var(--todo);
  border: 2px solid #000000;
  border-radius: 16px;
  padding: 20px 22px;
  max-width: 291px;
  width: 100%;
  min-height: 82px;
}

.status-container {
  width: 24px;
  height: 24px;
  margin-right: 18px;
  cursor: pointer;
}

.status-container img {
  width: 100%;
  height: 100%;
  margin-right: 18px;
}

.High {
  background: #ff481f;
}

.Medium {
  background: #ffab00;
}

.Low {
  background: #38cbcb;
}

.todo-content {
  display: flex;
  flex-direction: column;
}

.todo-title {
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
}

.todo-text {
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #757575;
  display: none;
  width: 80%;
}

.todo-importance {
  display: none;
  color: white;
}

.todo-importance-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
}

.todo-importance-container {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.todo-created_at {
  width: 97.56px;
  height: 15px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #333333;
  mix-blend-mode: normal;
  opacity: 0.3;
  flex: none;
  order: 1;
  flex-grow: 0;
}

@media screen and (min-width: 480px) {
  .todo {
    max-width: 500px;
    width: 100%;
    min-height: 140px;
    position: relative;
  }

  .todo-title {
    font-size: 30px;
    line-height: 30px;
    font-weight: 600;
  }

  .todo-text {
    display: block;
    font-size: 23px;
    font-weight: 600;
    line-height: 27px;
    margin-top: 30px;
  }
  .todo-importance {
    display: block;
    font-size: 18px;
    line-height: 34px;
  }
  .todo-importance-container {
    width: fit-content;
    height: 33px;
    border-radius: 500px;
    padding: 0 22px;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .status-container {
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    margin: 0;
  }

  .todo-created_at {
    font-size: 18px;
    position: absolute;
    right: 0;
    top: 4rem;
  }
}

@media screen and (min-width: 768px) {
  .todo {
    max-width: 610px;
    width: 100%;
    min-height: 163px;
  }

  .todo-title {
    font-size: 42px;
    line-height: 50px;
    width: fit-content;
  }

  .todo-text {
    font-size: 28px;
    font-weight: 600;
    line-height: 34px;
    margin-top: 39px;
  }

  .status-container {
    width: 40px;
    height: 40px;
  }
}
</style>
