<template>
  <div class="flex flex-col relative gap-1">
    <div
      class="border-l-2 border-t-2 border-b-2 border-gray-200 bg-white h-14 w-14 rounded-full absolute"
    >
      <component :is="iconComponent" class="p-3" />
    </div>
    <input
      :type="placeholder"
      :name="placeholder"
      :id="placeholder"
      v-model="updateContent"
      required
      class="bg-gray-50 border-2 border-gray-200 h-14 rounded-full pl-16"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import Email from '@/components/Icons/Email.vue'
import Person from '@/components/Icons/Person.vue'
import Password from '../../Icons/Password.vue'
import { computed } from 'vue'

const props = defineProps<{ content: string; placeholder: string }>()
const emit = defineEmits<{
  (e: 'onContentUpdate', value: string): void
}>()

const updateContent = computed({
  get() {
    return props.content
  },
  set(value) {
    emit('onContentUpdate', value)
  }
})

const iconComponent = computed(() => {
  const { placeholder } = props
  switch (placeholder) {
    case 'Email':
      return Email
    case 'Password':
      return Password
    case 'Confirm password':
      return Password
    case 'Username:':
      return Person
    default:
      return Person
  }
})
</script>
