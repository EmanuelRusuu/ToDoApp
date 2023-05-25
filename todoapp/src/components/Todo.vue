<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { defineEmits, defineProps, type PropType } from 'vue'

const props = defineProps({
  todos: {
    type: Array as PropType<Task[]>,
    default: () => [],
    required: true,
    validator: (value: any) => Array.isArray(value)
  }
})
const emits = defineEmits(['removeTodo'])

type Task = { text: string }

function removeTodo(todo: Task) {
  emits('removeTodo', todo)
}
</script>

<template>
  <li class="todo" v-for="todo in todos" :key="todo.text">
    - {{ todo.text }}
    <button @click="removeTodo(todo)">remove</button>
  </li>
</template>
