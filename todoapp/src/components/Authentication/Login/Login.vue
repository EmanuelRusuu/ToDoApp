<template>
  <AuthLayout>
    <form @submit.prevent class="flex flex-col gap-6">
      <LoginStatusMessage :is-account-available="isAccountAvailable" />
      <AuthInput :placeholder="'Email'" :content="email" @on-content-update="updateEmail" />
      <AuthInput
        :placeholder="'Password'"
        :content="password"
        @on-content-update="updatePassword"
      />
      <AuthButton :text="'Login'" @handle-submit="handleSubmit" />
    </form>
    <AccountActionSelector
      :text="'don`t'"
      :selector-text="'Sign up'"
      @handle-action="handleSignup"
    />
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginStatusMessage from './LoginStatusMessage.vue'
import AuthButton from '../AuthComponents/AuthButton.vue'
import AuthInput from '../AuthComponents/AuthInput.vue'
import AccountActionSelector from '../AuthComponents/AccountActionSelector.vue'

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
