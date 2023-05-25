<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
}>()
const emit = defineEmits<{
  addTodo: any
  'update:modelValue': any
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
  emit('addTodo', inputValue.value)
  inputValue.value = ''
}
</script>

<template>
  <form @submit.prevent="handleAdd" class="todoapp-form">
    <input type="text" placeholder="add tasks" v-model="inputValue" />
    <button>Add todo</button>
  </form>
</template>

<style>
.todoapp-form {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  margin-bottom: 2rem;
}

.todoapp-form input {
  height: 2.5rem;
}

.todoapp-form button {
  height: 1.5rem;
}
</style>
