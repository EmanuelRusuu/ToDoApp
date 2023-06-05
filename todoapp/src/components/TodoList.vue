<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import moment from 'moment'
import type { TodoType } from '../types/text'
import DeletePopUP from './DeletePopUP.vue'
import Header from './Header.vue'
import Todos from './Todos.vue'

const todos = ref<TodoType[]>([])
const popUp = ref(false)
const selectedTaskIndex = ref()

function addTodo() {
  const currentDate = moment().format('DD.MM.YYYY')
  const newTodo: TodoType = {
    title: 'Add a title',
    text: 'Add a description',
    priority: 0,
    priorityChange: false,
    status: false,
    created_at: ` ${currentDate}`,
    editing: false
  }
  todos.value.push(newTodo)
}
onMounted(() => {
  todos.value = JSON.parse(localStorage.getItem('todos')!) || []
})
watch(
  todos,
  (newVal) => {
    localStorage.setItem('todos', JSON.stringify(newVal))
  },
  { deep: true }
)

function deleteTaskIndex(index: number) {
  popUp.value = true
  selectedTaskIndex.value = index
}

function togglePopUP() {
  popUp.value = !popUp.value
}
function removeTask(index: number) {
  todos.value.splice(index, 1)
  togglePopUP()
}
</script>
<template>
  <div class="delete-popup">
    <DeletePopUP
      v-if="popUp"
      @togglePopUP="togglePopUP"
      @remove-task="removeTask"
      :index="selectedTaskIndex"
    />
  </div>
  <div class="todoapp-container">
    <Header @add-todo="addTodo" />
    <Todos :todos="todos" @deleteTaskIndex="deleteTaskIndex" />
  </div>
</template>
<style scoped>
.todoapp-container {
  margin-top: 136px;
  max-width: 288px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
@media screen and (min-width: 480px) {
  .todoapp-container {
    max-width: 500px;
    width: 90%;
    margin-top: 180px;
  }
}
@media screen and (min-width: 768px) {
  .todoapp-container {
    max-width: 610px;
    width: 80%;
    margin-top: 190px;
  }
}
</style>
