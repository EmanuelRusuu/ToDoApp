<template>
  <div class="w-screen h-screen flex flex-col">
    <div
      class="flex justify-between h-16 px-6 bg-gray-500 font-bold text-lg text-white items-center"
    >
      <h1 class="w-1/6 text-xl">Administration account</h1>
      <div class="w-3/6 flex justify-between">
        <button @click="handleIsUser" :class="isUsers ? 'text-blue-300' : ''">Users</button>
        <button @click="handleUserTodos" :class="isUsersTodos ? 'text-blue-300' : ''">Todos</button>
        <button
          @click="handleUserFinishedTodos"
          :class="isUsersFinishedTodos ? 'text-blue-300' : ''"
        >
          Finished Todos
        </button>
        <Logout @log-out="logOut" class="text-black" />
      </div>
    </div>
    <div class="w-full">
      <Users v-if="isUsers" />
      <UsersTodos v-if="isUsersTodos" :api-url="'todos'" :comp-text="'Todos'" />
      <UsersTodos v-if="isUsersFinishedTodos" :api-url="'finished'" :comp-text="'Finished Todos'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Users from './Users.vue'
import UsersTodos from './UsersTodos.vue'
import Logout from '../Authentication/LoggedIn/Logout.vue'
import { ref } from 'vue'

const emit = defineEmits<{ (e: 'logOut'): void }>()

const isUsers = ref(true)
const isUsersTodos = ref(false)
const isUsersFinishedTodos = ref(false)

function handleIsUser() {
  isUsers.value = true
  isUsersTodos.value = false
  isUsersFinishedTodos.value = false
}

function handleUserTodos() {
  isUsers.value = false
  isUsersTodos.value = true
  isUsersFinishedTodos.value = false
}

function handleUserFinishedTodos() {
  isUsers.value = false
  isUsersTodos.value = false
  isUsersFinishedTodos.value = true
}

function logOut() {
  emit('logOut')
}
</script>
