<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import TodoUl from './TodoUl.vue'
import NoTodosMobile from '../assets/notodosmobile.svg'
import NoTodos from '../assets/notodos.svg'
import type { TodoTypes } from '../types/text'

const props = defineProps<{
  todos: TodoTypes[]
  isMobile: boolean
}>()
</script>

<template>
  <div class="todos">
    <TodoUl :is-mobile="isMobile" :todos="todos" />
    <img :src="isMobile ? NoTodosMobile : NoTodos" v-if="todos.length < 1" />
  </div>
</template>

<style scoped>
.todos {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todos img {
  margin-top: 49px;
}

@media screen and (min-height: 650px) {
  .todos img {
    margin-top: 72px;
  }
}
</style>
