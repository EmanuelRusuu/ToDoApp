<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps(['todos', 'inputContent'])
const emits = defineEmits(['addTodo'])

const handleAdd = () => {
  emits('addTodo')
}

// console.log('copil: ' + props.inputContent)
</script>

<template>
  <form @submit.prevent="handleAdd" class="todoapp-form">
    <input type="text" placeholder="add tasks" v-model="props.inputContent" />
    <button>Add todo</button>
  </form>
</template>
