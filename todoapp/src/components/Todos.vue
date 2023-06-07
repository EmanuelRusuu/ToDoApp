<script setup lang="ts">
import Todo from './Todo.vue'
import EmptyState from './EmptyState.vue'
import type { TodoType } from '../types/text'
const props = defineProps<{
  todos: TodoType[]
}>()

const emit = defineEmits<{
  (e: 'deleteTaskIndex', index: number): void
  (e: 'markTodoDone', tddo: TodoType): void
}>()

function deleteTaskIndex(index: number) {
  emit('deleteTaskIndex', index)
}

function markTodoDone(todo: TodoType) {
  emit('markTodoDone', todo)
}
</script>
<template>
  <div class="todos">
    <ul class="todo-ul">
      <Todo :todos="todos" @deleteTaskIndex="deleteTaskIndex" @mark-todo-done="markTodoDone" />
    </ul>
    <EmptyState v-if="todos.length < 1" :todos="todos" />
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
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  gap: 30px;
}
.todoimage {
  margin-top: 40px;
  width: 100%;
}
@media screen and (min-width: 480px) {
  .todoimage {
    margin-top: 60px;
    width: 60%;
  }
  .todo-ul {
    gap: 40px;
  }
}
@media screen and (min-width: 768px) {
  .todoimage {
    margin-top: 72px;
    width: 65%;
  }
  .todo-ul {
    gap: 50px;
  }
}
</style>
