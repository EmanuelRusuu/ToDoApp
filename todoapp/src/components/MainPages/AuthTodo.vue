<template>
  <AdminPage v-if="isAdmin && isLoggedIn" @logOut="logOut" />
  <div v-else class="app w-screen h-screen flex justify-center overflow-x-hidden">
    <Login v-if="loginCondition" @isLogin="isLogin" @handleSignup="handleSignup" />
    <SignUp v-else-if="isSigningUp" @isSignUp="isSignUp" @handleLogin="handleLogin" />
    <TodoApp
      v-if="isLoggedIn"
      :isLoggedIn="isLoggedIn"
      @logOut="logOut"
      @handleAdmin="handleAdmin"
    />
  </div>
</template>

<script setup lang="ts">
import TodoApp from '../../components/MainPages/TodoApp.vue'
import Login from '../../components/Authentication/Login/Login.vue'
import SignUp from '../../components/Authentication/Signup/SignUp.vue'
import AdminPage from '../../components/Admin/AdminPage.vue'
import { ref, computed } from 'vue'

const isLoggedIn = ref(false)
const isLoggingIn = ref(false)
const isSigningUp = ref(false)
const isAdmin = ref(false)

function handleAdmin() {
  isAdmin.value = true
}

if (localStorage.getItem('user')) {
  isLoggedIn.value = true
} else {
  isLoggedIn.value = false
}

function handleLogin() {
  isLoggingIn.value = true
  isSigningUp.value = false
}

function handleSignup() {
  isSigningUp.value = true
  isLoggingIn.value = false
}

function isSignUp() {
  isLoggedIn.value = true
  isSigningUp.value = false
}

function isLogin() {
  isLoggedIn.value = true
}

function logOut() {
  isLoggedIn.value = false
  isAdmin.value = false
}

const loginCondition = computed(() => !isLoggedIn.value && !isSigningUp.value)
</script>
