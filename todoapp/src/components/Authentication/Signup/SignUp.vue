<template>
  <AuthLayout>
    <form @submit.prevent class="flex flex-col gap-6">
      <SignupStatusMessage
        :is-email-registered="isEmailRegistered"
        :is-passord-matching="isPassordMatching"
      />
      <AuthInput
        :placeholder="'Username'"
        :content="username"
        @on-content-update="updateUsername"
      />
      <AuthInput :placeholder="'Email'" :content="email" @on-content-update="updateEmail" />
      <AuthInput
        :placeholder="'Password'"
        :content="password"
        @on-password-update="updatePassword"
      />
      <AuthInput
        :placeholder="'Confirm password'"
        :content="passwordCheck"
        @on-password-update="confirmPassword"
      />
      <AuthButton :text="'Sign up'" @handle-submit="handleSubmit" />
    </form>
    <AccountActionSelector
      :text="'already'"
      :selector-text="'Login'"
      @handle-action="handleLogin"
    />
  </AuthLayout>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import AuthLayout from '../../../layouts/AuthLayout.vue'
import SignupStatusMessage from './SignupStatusMessage.vue'
import AuthButton from '../AuthComponents/AuthButton.vue'
import AccountActionSelector from '../AuthComponents/AccountActionSelector.vue'
import AuthInput from '../AuthComponents/AuthInput.vue'

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
