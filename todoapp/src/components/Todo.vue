<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { TodoTypes } from '../types/text'
import Incomplete from '../assets/eclipseblack.svg'
import Complete from '../assets/completedTask.png'

const props = defineProps<{
  todos: TodoTypes[]
  isMobile: boolean
}>()

function handleImportance(priority: number) {
  if (priority === 0) {
    return 'low'
  } else if (priority === 1) {
    return 'medium'
  } else if (priority === 2) {
    return 'high'
  } else {
    return ''
  }
}

function statusState(todo: TodoTypes) {
  if (todo.status === false) {
    todo.status = true
  } else {
    todo.status = false
  }
}
</script>
<template>
  <div v-for="(todo, index) in todos" :key="index">
    <div class="todo" v-if="isMobile">
      <div @click="statusState(todo)" class="status-container">
        <div v-if="!todo.status">
          <img class="status" :src="Incomplete" alt="incomplete" />
        </div>
        <div v-else>
          <img class="status" :src="Complete" alt="complete" />
        </div>
      </div>
      <div class="todo-importance-wrap">
        <div class="todo-content">
          <p class="todo-title">
            {{ todo.title }}
          </p>
          <p class="todo-created_at">
            {{ todo.created_at }}
          </p>
        </div>
        <div class="todo-importance-container">
          <p :class="handleImportance(todo.priority)" class="todo-importance"></p>
        </div>
      </div>
    </div>

    <div class="todo-desktop" v-else>
      <div class="todo-content-desktop">
        <p class="todo-title-desktop">
          {{ todo.title }}
        </p>
        <p class="todo-text-desktop">
          {{ todo.text }}
        </p>
      </div>
      <div class="todo-imp-status-rem">
        <div class="todo-importance-container-desktop">
          <p v-if="todo.priority === 0" class="todo-importance-desktop low">Low</p>
          <p v-else-if="todo.priority === 1" class="todo-importance-desktop medium">Medium</p>
          <p v-else class="todo-importance-desktop high">High</p>
        </div>
        <div @click="statusState(todo)" class="status-container-desktop">
          <div v-if="!todo.status">
            <img class="status" :src="Incomplete" alt="incomplete" />
          </div>
          <div v-else>
            <img class="status" :src="Complete" alt="complete" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.todo,
.todo-desktop {
  display: flex;
  align-items: center;
  background-color: var(--todo);
  border: 2px solid #000000;
  border-radius: 16px;
  padding: 1rem;
}
.todo {
  width: 291px;
  height: 82px;
  margin-bottom: 30px;
}

.todo-desktop {
  width: 610px;
  height: 163px;
  margin-bottom: 50px;
}

.remove-todo-btn {
  height: 2rem;
  margin: 1rem;
}
.status-container img {
  width: 24px;
  height: 24px;
  margin-right: 18px;
}

.status-container-desktop img {
  width: 40px;
  height: 40px;
}

.todo-imp-status-rem {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
}

.todo-importance-container-desktop {
  color: white;
}

.todo-importance-desktop {
  font-size: 18px;
  font-weight: 600;
  line-height: 29px;
  text-align: center;
  padding: 0 20px;
  border-radius: 500px;
}

.high {
  background: #ff481f;
}

.medium {
  background: #ffab00;
}

.low {
  background: #38cbcb;
}

.todo-content,
.todo-content-desktop {
  display: flex;
  flex-direction: column;
}

.todo-content-desktop {
  flex-grow: 1;
}

.todo-title {
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
}

.todo-title-desktop {
  font-size: 42px;
  font-weight: 600;
  line-height: 50px;
  width: 275px;
  height: 86px;
}

.todo-importance-wrap-desktop,
.todo-importance-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
}

.todo-importance-wrap-desktop {
  display: flex;
}

.todo-importance {
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
</style>
