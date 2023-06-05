<script setup lang="ts">
import type { TodoType } from '../types/text'

const props = defineProps<{ todos: TodoType[] }>()

function setPriority(todo: TodoType, number: number) {
  todo.priority = number
  todo.priorityChange = false
}
</script>

<template>
  <div v-for="(todo, index) in todos" :key="index">
    <div
      v-if="todo.editing"
      :class="['todo-priority-dropdown', { 'dropdown-toggle': todo.priorityChange }]"
    >
      <div
        :class="['todo-importance-option', 'High', { selected: todo.priority === 2 }]"
        @click="setPriority(todo, 2)"
      >
        <p class="desktop-priority">High</p>
      </div>
      <div
        :class="['todo-importance-option', 'Medium', { selected: todo.priority === 1 }]"
        @click="setPriority(todo, 1)"
      >
        <p class="desktop-priority">Medium</p>
      </div>
      <div
        :class="['todo-importance-option', 'Low', { selected: todo.priority === 0 }]"
        @click="setPriority(todo, 0)"
      >
        <p class="desktop-priority">Low</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-importance-option {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  gap: 8px;
}

.todo-importance-option {
  display: flex;
  align-items: center;
}
.todo-priority-dropdown {
  position: absolute;
  top: 9px;
  right: 20px;
  display: flex;
  flex-direction: row;
  gap: 6px;
}

.desktop-priority {
  display: none;
}
.todo-priority-dropdown {
  display: none;
}

@media screen and (min-width: 480px) {
  .dropdown-toggle {
    display: flex;
    width: 125px;
    height: 101px;
    position: absolute;
    top: 68px;
    right: 20px;
    border: 2px solid black;
    background-color: white;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    padding: 7px 17px;
  }
  .todo-importance-option {
    background-color: transparent;
  }
  .desktop-priority {
    display: block;
    font-size: 18px;
    line-height: 18px;
    color: black;
    width: 100%;
    cursor: pointer;
  }

  .Low,
  .Medium,
  .High {
    border-radius: 500px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Low {
    width: 91px;
    height: 33px;
  }

  .Medium {
    width: 125px;
    height: 33px;
  }

  .High {
    width: 91px;
    height: 33px;
  }
}
</style>
