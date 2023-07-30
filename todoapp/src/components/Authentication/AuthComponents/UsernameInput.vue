<template>
  <div class="flex flex-col relative">
    <div
      class="border-l-2 border-t-2 border-b-2 border-gray-200 bg-white h-14 w-14 rounded-full absolute"
    >
      <Person class="p-3" />
    </div>
    <input
      type="text"
      name="username"
      id="username"
      v-model="updateUsername"
      required
      class="bg-gray-50 border-2 border-gray-200 h-14 rounded-full pl-16"
      placeholder="Username"
    />
  </div>
</template>

<script setup lang="ts">
import Person from '../../Icons/Person.vue'
import { computed } from 'vue'

const props = defineProps<{ username: string }>()
const emit = defineEmits<{
  (e: 'onUsernameUpdate', value: string): void
}>()

const updateUsername = computed({
  get() {
    return props.username
  },
  set(value) {
    emit('onUsernameUpdate', value)
  }
})
</script>
