<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  (e: 'addTodo'): void
  (e: 'update:modelValue', value: string): void
}>()

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

function handleAdd() {
  emit('addTodo')
}
</script>

<template>
  <form @submit.prevent="handleAdd" class="todoapp-form">
    <input type="text" placeholder="add tasks" v-model="inputValue" />
  </form>
</template>

<style scoped>
.todoapp-form {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
}

.todoapp-form input {
  height: 2.5rem;
}
</style>
