<template>
  <div class="done-todos">
    <hr v-if="doneTodos.length > 0" class="hr" />
    <p class="no-todos-p">Done todos:</p>
    <ul>
      <li class="done-todo" v-for="(doneTodo, index) in doneTodos" :key="index">
        <Todo :todo="doneTodo" @mark-todo-status="markTodoStatus" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TodoType } from '@/types/text'
import Todo from './Todo.vue'

defineProps<{
  todo: TodoType
  doneTodos: TodoType[]
}>()
const emit = defineEmits<{
  (e: 'markTodoStatus', todo: TodoType): void
}>()

function markTodoStatus(todo: TodoType) {
  emit('markTodoStatus', todo)
}

function deleteFinishedTodo(index: number) {
  emit('deleteFinishedTodo', index)
}
</script>

<style scoped>
.done-todos {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 73px;
  gap: 30px;
}

.hr {
  border-top: 1px dotted rgb(205, 205, 205);
  margin-bottom: 2rem;
}

.no-todos-p {
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0em;
  color: #6d6d6d;
}

.done-todo {
  opacity: 0.4;
}
.done-todos ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

@media screen and (min-width: 480px) and (max-width: 768px) {
  .no-todos-p {
    font-size: 26px;
    line-height: 32px;
  }

  .done-todos ul {
    gap: 40px;
  }
}

@media screen and (min-width: 768px) {
  .no-todos-p {
    font-size: 38px;
    line-height: 46px;
  }
  .done-todos ul {
    gap: 50px;
  }
}
</style>
