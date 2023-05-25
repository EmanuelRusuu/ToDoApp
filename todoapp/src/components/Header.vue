<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import plus from '../assets/plus.svg'
import type { TextIdString } from '../types/text'
import { computed } from 'vue'
const props = defineProps<{
  todos: TextIdString[]
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
  <div class="header">
    <h1 class="header-title">To do list</h1>
    <button @click="handleAdd" class="add-todo">
      <img :src="plus" />
    </button>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.header-title {
  font-size: 2rem;
}

.add-todo {
  background-color: var(--add-todo-button);
  border: 0;
  height: 3.5rem;
  width: 3.5rem;
  border-radius: var(--br-add-todo-button);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
