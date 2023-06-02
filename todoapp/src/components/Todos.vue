<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Todo from './Todo.vue'
import EmptyState from './EmptyState.vue'
import type { TodoType } from '../types/text'

const props = defineProps<{
  todos: TodoType[]
}>()
</script>

<template>
  <div class="todos">
    <ul class="todo-ul">
      <Todo :todos="todos" />
    </ul>
    <EmptyState :todos="todos" />
  </div>
</template>

<style scoped>
.todos {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-bottom: 73px;
}

.todo-ul {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.todoimage {
  margin-top: 40px;
  width: 100%;
}

@media screen and (min-width: 480px) and (max-width: 768px) {
  .todos {
    padding-bottom: 100px;
  }
  .todoimage {
    margin-top: 60px;
    width: 60%;
  }

  .todo-ul {
    gap: 40px;
  }
}
@media screen and (min-width: 768px) {
  .todos {
    padding-bottom: 185px;
  }
  .todoimage {
    margin-top: 72px;
    width: 65%;
  }

  .todo-ul {
    gap: 50px;
  }
}
</style>
