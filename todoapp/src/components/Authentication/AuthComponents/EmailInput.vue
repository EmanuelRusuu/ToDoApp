<template>
  <div class="flex flex-col relative gap-1">
    <div
      class="border-l-2 border-t-2 border-b-2 border-gray-200 bg-white h-14 w-14 rounded-full absolute"
    >
      <Email class="p-3" />
    </div>
    <input
      type="email"
      name="email"
      id="email"
      v-model="updateEmail"
      required
      class="bg-gray-50 border-2 border-gray-200 h-14 rounded-full pl-16"
      placeholder="Email"
    />
  </div>
</template>

<script setup lang="ts">
import Email from '../../Icons/Email.vue'
import { computed } from 'vue'

const props = defineProps<{ email: string }>()
const emit = defineEmits<{
  (e: 'onEmailUpdate', value: string): void
}>()

const updateEmail = computed({
  get() {
    return props.email
  },
  set(value) {
    emit('onEmailUpdate', value)
  }
})
</script>
