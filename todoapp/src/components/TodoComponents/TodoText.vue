<template>
  <div>
    <textarea
      v-if="todo.textEdit && todo.editing"
      v-model="localTodo.text"
      type="text"
      class="todo-text flex text-start border-0 outline-none resize-none h-24 xsm:h-36 xsm:mt-7 md:h-44 md:w-full"
      maxlength="160"
    ></textarea>
    <p
      v-if="!todo.textEdit"
      @click="textEdit(todo)"
      :class="['todo-text  xsm:block  xsm:mt-7 ', todo.editing ? 'block' : 'hidden']"
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
