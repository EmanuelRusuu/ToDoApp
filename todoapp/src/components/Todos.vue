<template>
  <div class="todos">
    <ul class="todo-ul">
      <li v-for="(todo, index) in todos" :key="index">
        <Todo
          :todo="todo"
          :index="index"
          @deleteTaskIndex="deleteTaskIndex"
          @mark-todo-status="markTodoStatus"
        />
      </li>
    </ul>
    <EmptyState v-if="todos.length < 1" :todos="todos" />
  </div>
</template>

<script setup lang="ts">
import Todo from './Todo.vue'
import EmptyState from './EmptyState.vue'
import type { TodoType } from '../types/text'
defineProps<{
  todos: TodoType[]
  searchInputContent: string
}>()

const emit = defineEmits<{
  (e: 'markTodoDone', tddo: TodoType): void
  (e: 'deleteTaskIndex', index: number): void
  (e: 'markTodoStatus', tddo: TodoType): void
}>()

function deleteTaskIndex(index: number) {
  emit('deleteTaskIndex', index)
}

function markTodoStatus(todo: TodoType) {
  emit('markTodoStatus', todo)
}
</script>

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
  list-style: none;
}
.todoimage {
  margin-top: 40px;
  width: 100%;
}

.no-results-message {
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  color: #6d6d6d;
}

.no-results-message span {
  color: black;
}

@media screen and (min-width: 480px) {
  .todoimage {
    margin-top: 60px;
    width: 60%;
  }
  .todo-ul {
    gap: 40px;
  }
  .no-results-message {
    text-align: center;
    color: #6d6d6d;
    font-size: 30px;
    line-height: 34px;
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
