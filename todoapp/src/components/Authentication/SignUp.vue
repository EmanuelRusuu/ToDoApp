<template>
  <div
    class="w-screen h-screen relative flex flex-col justify-between xl:flex-row px-6 py-20 xsm:max-w-500 xl:pr-20 xl:py-12 md:max-w-610 xl:max-w-none"
  >
    <AuthImages />
    <div class="w-full h-5/6 xl:w-2/6 flex flex-col justify-end">
      <div class="w-full flex flex-col gap-5">
        <form @submit.prevent class="flex flex-col gap-6">
          <div class="hidden xsm:flex w-full justify-center">
            <p v-if="!isEmailRegistered && isPassordMatching" class="text-3xl text-gray-600">
              <span class="text-orange-500">Create</span> an account
            </p>
            <p v-if="isEmailRegistered" class="text-3xl">
              Email<span class="text-orange-400"> already</span> exists
            </p>
            <p v-if="!isPassordMatching" class="text-3xl">
              Passwords<span class="text-orange-400"> do not</span> match
            </p>
          </div>
          <UsernameInput :username="username" @onUsernameUpdate="updateUsername" />
          <EmailInput :email="email" @on-email-update="updateEmail" />
          <PasswordInput :password="password" @onPasswordUpdate="updatePassword" />
          <ConfirmPassword :passwordCheck="passwordCheck" @confirmPassword="confirmPassword" />
          <button
            @click="handleSubmit"
            type="submit"
            class="bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-500 w-full text-white p-3 rounded-lg font-bold tracking-wide"
          >
            Sign Up
          </button>
        </form>
        <div class="w-full flex justify-center">
          <p class="text-l text-gray-300">
            You already have an account?
            <span class="text-orange-400 pl-2 cursor-pointer" @click="handleLogin">Login</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthImages from './AuthImages.vue'
import axios from 'axios'
import { ref } from 'vue'
import EmailInput from './EmailInput.vue'
import PasswordInput from './PasswordInput.vue'
import UsernameInput from './UsernameInput.vue'
import ConfirmPassword from './ConfirmPassword.vue'

const emit = defineEmits<{
  (e: 'isSignUp'): void
  (e: 'handleLogin'): void
  (e: 'onUsernameUpdate', value: string): void
  (e: 'onEmailUpdate', value: string): void
  (e: 'onPasswordUpdate', value: string): void
}>()

const username = ref('')
const email = ref('')
const password = ref('')
const passwordCheck = ref('')
const isPassordMatching = ref(true)
const isEmailRegistered = ref(false)

function handleLogin() {
  emit('handleLogin')
}

function updateUsername(value: string) {
  username.value = value
}

function updateEmail(value: string) {
  email.value = value
}

function updatePassword(value: string) {
  password.value = value
}

function confirmPassword(value: string) {
  passwordCheck.value = value
}

async function handleSubmit() {
  const user = {
    username: username.value,
    email: email.value,
    password: password.value
  }

  if (password.value === passwordCheck.value && isEmailRegistered.value === false) {
    try {
      await axios.post('http://localhost:3000/users', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      localStorage.setItem('user', email.value)
      username.value = ''
      email.value = ''
      password.value = ''
      passwordCheck.value = ''
      emit('isSignUp')

      isPassordMatching.value = true
    } catch (error) {
      console.error(error)
      isEmailRegistered.value = true
      isPassordMatching.value = true
    }
  } else {
    isPassordMatching.value = false
    isEmailRegistered.value = false
  }
}
</script>
