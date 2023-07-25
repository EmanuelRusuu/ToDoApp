<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-semibold">Users</h2>
      <div class="flex gap-5">
        <button
          @click="fetchUsers"
          class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow"
        >
          Refresh
        </button>
        <button
          @click="deleteAllUsers"
          class="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow"
        >
          Delete All
        </button>
      </div>
    </div>
    <table class="w-full table-fixed border-collapse border border-gray-400">
      <thead>
        <tr class="bg-gray-200">
          <th
            v-for="item in ['ID', 'Email', 'Username', 'Actions']"
            :key="item"
            class="p-2 border border-gray-400"
          >
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id" class="border border-gray-400">
          <td class="p-2 border border-gray-400">{{ user._id }}</td>
          <td class="p-2 border border-gray-400">{{ user.email }}</td>
          <td class="p-2 border border-gray-400">{{ user.username }}</td>
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
import type { UserType } from '@/types/user'

const users = ref<UserType[]>([])

async function fetchUsers() {
  try {
    const response = await axios.get('http://localhost:3000/users')
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

fetchUsers()

async function deleteAllUsers() {
  try {
    await axios.delete('http://localhost:3000/users')
    users.value = []
  } catch (error) {
    console.error('Error deleting users:', error)
  }
}
</script>
