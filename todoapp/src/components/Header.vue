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
  (e: 'addTodo', todo: string): void
  (e: 'update:modelValue', value: any): void
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
  margin-bottom: 65px;
}
.header-title {
  width: 275px;
  height: 86px;
  font-family: 'Neue Haas Grotesk Display Pro';
  font-style: normal;
  font-weight: 600;
  font-size: 72px;
  line-height: 86px;
  color: #000000;
}

.add-todo {
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 59.64px;
  height: 59.64px;
  border-radius: 50%;
  background-color: var(--add-todo-btn);
}
</style>
