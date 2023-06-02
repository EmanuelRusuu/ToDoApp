<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import TodoUl from './TodoUl.vue'
import EmptyState from './EmptyState.vue'
import type { TodoType } from '../types/text'

const props = defineProps<{
  todos: TodoType[]
}>()
</script>

<template>
  <div class="todos">
    <TodoUl :todos="todos" />
    <EmptyState :todos="todos" />
  </div>
</template>

<style scoped>
.todos {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.todoimage {
  margin-top: 40px;
  width: 100%;
}

@media screen and (min-width: 480px) and (max-width: 768px) {
  .todoimage {
    margin-top: 60px;
    width: 60%;
  }
}
@media screen and (min-width: 768px) {
  .todoimage {
    margin-top: 72px;
    width: 65%;
  }
}
</style>
