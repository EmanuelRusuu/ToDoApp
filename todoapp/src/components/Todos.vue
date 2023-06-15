<script setup lang="ts">
import { computed } from 'vue'
import Todo from './Todo.vue'
import EmptyState from './EmptyState.vue'
import type { TodoType } from '../types/text'
const props = defineProps<{
  todos: TodoType[]
  searchInputContent: string
}>()

const emit = defineEmits<{
  (e: 'markTodoDone', tddo: TodoType): void
  (e: 'deleteTaskIndex', index: number): void
}>()

function markTodoDone(todo: TodoType) {
  emit('markTodoDone', todo)
}

function deleteTaskIndex(index: number) {
  emit('deleteTaskIndex', index)
}

const searchTodos = computed(() => {
  return props.todos.filter((todo) =>
    (todo.title + todo.text).toLowerCase().includes(props.searchInputContent.toLowerCase())
  )
})
</script>
<template>
  <div class="todos">
    <ul v-if="searchTodos.length" class="todo-ul">
      <Todo
        :todos="searchTodos"
        @deleteTaskIndex="deleteTaskIndex"
        @mark-todo-done="markTodoDone"
      />
    </ul>
    <p v-else-if="todos.length" class="no-results-message">
      No matching todos found for: <span>{{ searchInputContent }}</span>
    </p>
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
