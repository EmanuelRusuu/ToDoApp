<script setup lang="ts">
import NoTodos from '../assets/notodosimg.svg'
import type { TodoType } from '../types/text'
const props = defineProps<{
  todos: TodoType[]
}>()
</script>

<template>
  <div v-if="todos.length < 1" class="no-todos">
    <img class="no-todos-img" :src="NoTodos" />
    <p class="no-todos-p">You have no todos yet</p>
  </div>
</template>

<style scoped>
.no-todos {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-todos-img {
  margin: 49px 0 20px;
}

.no-todos-p {
  font-size: 22px;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
  color: #6d6d6d;
}

@media screen and (min-width: 480px) and (max-width: 768px) {
  .no-todos-img {
    margin: 60px 0 26px;
    height: 290px;
    width: 250px;
  }

  .no-todos-p {
    text-align: center;
    color: #6d6d6d;
    font-size: 30px;
    line-height: 34px;
    text-align: left;
  }
}

@media screen and (min-width: 768px) {
  .no-todos-img {
    margin: 72px 0 34px;
    height: 315px;
    width: 273px;
  }

  .no-todos-p {
    text-align: center;
    color: #6d6d6d;
    font-size: 42px;
    line-height: 50px;
    text-align: left;
  }
}
</style>
