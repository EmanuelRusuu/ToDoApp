<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Todos</h2>
      <div class="flex gap-5">
        <button
          @click="fetchTodos"
          class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow"
        >
          Refresh
        </button>
        <button
          @click="deleteAllTodos"
          class="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow"
        >
          Delete All
        </button>
      </div>
    </div>
    <table class="w-full table-fixed border-collapse border border-gray-400">
      <thead>
        <tr class="bg-gray-200">
          <th v-for="item in ['ID', 'Title', 'Description', 'Priority', 'Actions']" :key="item">
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo._id" class="border border-gray-400">
          <td class="p-2 border border-gray-400">{{ todo._id }}</td>
          <td class="p-2 border border-gray-400">{{ todo.title }}</td>
          <td class="p-2 border border-gray-400">{{ todo.text }}</td>
          <td class="p-2 border border-gray-400">{{ todo.priority }}</td>

          <td class="p-2 border border-gray-400">
            <button class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md">Edit</button>
            <button class="px-4 py-2 bg-red-500 text-white font-semibold rounded-md">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import type { TodoType } from '@/types/todo'

const todos = ref<TodoType[]>([])

async function fetchTodos() {
  try {
    const response = await axios.get('http://localhost:3000/todos')
    todos.value = response.data
  } catch (error) {
    console.error('Error fetching todos:', error)
  }
}

fetchTodos()

async function deleteAllTodos() {
  try {
    await axios.delete('http://localhost:3000/todos')
    todos.value = []
  } catch (error) {
    console.error('Error deleting todos:', error)
  }
}
</script>
