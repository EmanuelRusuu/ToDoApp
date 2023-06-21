<template>
  <div class="w-full flex flex-col pb-20 gap-8">
    <hr v-if="props.doneTodos.length > 0" class="border-t border-dotted border-gray-300" />
    <p class="text-xl text-gray-700 xsm:text-2xl md:text-4xl">Done todos:</p>
    <ul class="flex flex-col-reverse list-none gap-8 xsm:gap-10 md:gap-12">
      <li class="opacity-40" v-for="(doneTodo, index) in props.doneTodos" :key="index">
        <Todo
          :todo="doneTodo"
          :index="index"
          @mark-todo-status="markTodoStatus"
          @delete-finished-todo="deleteFinishedTodo"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TodoType } from '@/types/text'
import Todo from './Todo.vue'

const props = defineProps<{
  doneTodos: TodoType[]
}>()
const emit = defineEmits<{
  (e: 'markTodoStatus', todo: TodoType): void
  (e: 'deleteFinishedTodo', index: number): void
}>()

function markTodoStatus(todo: TodoType) {
  emit('markTodoStatus', todo)
}

function deleteFinishedTodo(index: number) {
  emit('deleteFinishedTodo', index)
}
</script>
