<template>
  <div
    class="w-screen h-screen relative flex flex-col justify-between xl:flex-row px-6 py-20 xsm:max-w-500 xl:pr-20 xl:py-12 md:max-w-610 xl:max-w-none"
  >
    <AuthImages />
    <div class="w-full h-5/6 xl:w-2/6 flex flex-col justify-end">
      <div class="w-full flex flex-col gap-5">
        <form @submit.prevent class="flex flex-col gap-6">
          <div class="hidden xsm:flex w-full justify-center mb-5">
            <p v-if="isAccountAvailable" class="text-3xl text-gray-600">
              <span class="text-orange-500">Log in</span> into your account
            </p>
            <p v-else class="text-3xl">
              Incorrect<span class="text-orange-400"> username</span> or
              <span class="text-orange-500">password</span>
            </p>
          </div>
          <EmailInput :email="email" @onEmailUpdate="updateEmail" />
          <PasswordInput :password="password" @onPasswordUpdate="updatePassword" />
          <button
            @click="handleSubmit()"
            type="submit"
            class="bg-gradient-to-br from-emerald-300 via-emerald-400 bg-emerald-500 w-full text-white p-3 rounded-lg font-bold tracking-wide"
          >
            Log in
          </button>
        </form>
        <div class="w-full flex justify-center">
          <p class="text-l text-gray-300">
            You don`t have an account?
            <span class="text-orange-400 pl-2 cursor-pointer" @click="handleSignup">Sign up</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthImages from './AuthImages.vue'
import EmailInput from './EmailInput.vue'
import PasswordInput from './PasswordInput.vue'
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits<{
  (e: 'isLogin'): void
  (e: 'handleSignup'): void
}>()

const isAccountAvailable = ref(true)
const email = ref('')
const password = ref('')

async function handleSubmit() {
  const user = {
    email: email.value,
    password: password.value
  }

  try {
    await axios.post('http://localhost:3000/login', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    localStorage.setItem('user', user.email)
    isLogin()
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        isAccountAvailable.value = false
        console.error('Login error:', error.response.data.message)
      } else {
        console.error('Login error:', error.message)
      }
    }
  }
}

function handleSignup() {
  emit('handleSignup')
}

function isLogin() {
  if (email.value && password.value) {
    emit('isLogin')
  }
}

function updateEmail(value: string) {
  email.value = value
}

function updatePassword(value: string) {
  password.value = value
}
</script>
