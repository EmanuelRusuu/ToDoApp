<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps(['todos', 'inputContent'])
const emits = defineEmits(['addTodo'])
const inputContentRef = ref(props.inputContent)

function handleAdd() {
  emits('addTodo', inputContentRef.value)
  // console.log('handleAdd called - ', inputContentRef.value)
  inputContentRef.value = ''
}
</script>

<template>
  <form @submit.prevent="handleAdd" class="todoapp-form">
    <input type="text" placeholder="add tasks" v-model="inputContentRef" />
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
