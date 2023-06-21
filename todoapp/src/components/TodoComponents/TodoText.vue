<template>
  <div>
    <textarea
      v-if="todo.textEdit && todo.editing"
      v-model="localTodo.text"
      type="text"
      class="flex text-start border-0 outline-none text-sm font-normal text-gray-500 mt-4 resize-none h-24 w-full xsm:h-36 xsm:w-11/12 xsm:text-xl xsm:font-semibold xsm:mt-7 md:h-44 md:w-full md:text-3xl md:mt-10"
      maxlength="160"
    ></textarea>
    <p
      v-if="!todo.textEdit"
      @click="textEdit(todo)"
      :class="[
        'text-sm font-normal text-gray-500 w-full mt-4 xsm:block xsm:text-xl xsm:font-semibold xsm:mt-7 xsm:w-11/12  md:text-3xl md:mt-10',
        todo.editing ? 'block' : 'hidden'
      ]"
    >
      {{ todo.text }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { TodoType } from '@/types/text'
import { computed } from 'vue'

const props = defineProps<{ todo: TodoType }>()

const emit = defineEmits<{ (e: 'onTodoUpdate', todo: TodoType): void }>()

const localTodo = computed({
  get() {
    return props.todo
  },
  set(value) {
    emit('onTodoUpdate', value)
  }
})

function textEdit(todo: TodoType) {
  if (todo.editing) {
    todo.textEdit = true
  }
}
</script>
