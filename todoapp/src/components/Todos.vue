<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TodoUl from './TodoUl.vue'
import NoTodosMobile from '../assets/notodosmobile.svg'
import NoTodos from '../assets/notodos.svg'
import type { TodoTypes } from '../types/text'
const props = defineProps<{
  todos: TodoTypes[]
}>()
const emits = defineEmits<{
  (e: 'removeTodo', index: number): void
}>()
function removeTodo(index: number) {
  emits('removeTodo', index)
}

const imageSource = ref<string>(window.innerWidth < 650 ? NoTodosMobile : NoTodos)

function handleResize() {
  imageSource.value = window.innerWidth < 650 ? NoTodosMobile : NoTodos
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="todos">
    <TodoUl :todos="todos" @remove-todo="removeTodo" />
    <img :src="imageSource" v-if="todos.length < 1" />
  </div>
</template>

<style scoped>
.todos {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (min-height: 650px) {
  .todos img {
    margin-top: 72px;
  }
}
</style>
