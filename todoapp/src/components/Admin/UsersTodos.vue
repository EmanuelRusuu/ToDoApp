<template>
  <AdminTodos :text="compText" :todos="todos" @delete="deleteAllTodos" @fetch="fetchTodos" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { TodoType } from '@/types/todo'
import AdminTodos from './AdminTodos.vue'

const todos = ref<TodoType[]>([])

const props = defineProps<{ compText: string; apiUrl: string }>()

async function fetchTodos() {
  try {
    const response = await axios.get(`http://localhost:3000/${props.apiUrl}`)
    todos.value = response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
  }
}

fetchTodos()

async function deleteAllTodos() {
  try {
    await axios.delete(`http://localhost:3000/${props.apiUrl}`)
    todos.value = []
  } catch (error) {
    console.error('Error deleting todos:', error)
  }
}
</script>
