<template>
  <div class="flex flex-col relative gap-1">
    <div
      class="border-l-2 border-t-2 border-b-2 border-gray-200 bg-white h-14 w-14 rounded-full absolute"
    >
      <Password class="p-3" />
    </div>
    <input
      type="password"
      name="password"
      id="password"
      v-model="updatePassword"
      required
      class="bg-gray-50 border-2 border-gray-200 h-14 rounded-full pl-16"
      placeholder="Confirm password"
    />
  </div>
</template>

<script setup lang="ts">
import Password from '../Icons/Password.vue'
import { computed } from 'vue'

const props = defineProps<{ passwordCheck: string }>()
const emit = defineEmits<{
  (e: 'confirmPassword', value: string): void
}>()

const updatePassword = computed({
  get() {
    return props.passwordCheck
  },
  set(value) {
    emit('confirmPassword', value)
  }
})
</script>
