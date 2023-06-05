<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { TodoType } from '../types/text'
import Incomplete from '../assets/eclipseblack.svg'
import Complete from '../assets/completedTask.png'
const props = defineProps<{
  todos: TodoType[]
}>()
const emit = defineEmits<{
  (e: 'deleteTaskIndex', index: number): void
}>()
const priority = { 0: 'Low', 1: 'Medium', 2: 'High' }
function handleImportance(index: keyof typeof priority) {
  return priority[index]
}
function toggleTodoState(todo: TodoType) {
  todo.status = !todo.status
}
function isEditing(todo: TodoType) {
  todo.editing = true
}

function saveEditing(todo: TodoType) {
  todo.editing = false
  todo.priorityChange = false
}

function deleteTaskIndex(index: number) {
  emit('deleteTaskIndex', index)
}
function changePriority(todo: TodoType) {
  if (todo.editing) {
    todo.priorityChange = !todo.priorityChange
  }
}
function setPriority(todo: TodoType, number: number) {
  todo.priority = number
  todo.priorityChange = false
}
</script>
<template>
  <div class="todo" @click="isEditing(todo)" v-for="(todo, index) in todos" :key="index">
    <div class="status-content-priority">
      <div v-if="!todo.editing" @click.stop="toggleTodoState(todo)" class="status-container">
        <img v-if="!todo.status" :src="Incomplete" alt="incomplete" />
        <img v-else :src="Complete" alt="complete" />
      </div>
      <div class="todo-importance-wrap">
        <div :class="['todo-content', { 'todo-importance-dropdown': todo.priorityChange }]">
          <p class="todo-title">
            {{ todo.title }}
          </p>
          <p :class="['todo-text', { 'show-text': todo.editing }]">{{ todo.text }}</p>
          <p class="todo-created_at">
            {{ todo.created_at }}
          </p>
        </div>
        <div
          @click.stop="changePriority(todo)"
          :class="[
            'todo-importance-title',
            { 'todo-priority': todo.editing },
            { 'todo-dropdown-active': todo.priorityChange },
            handleImportance(todo.priority)
          ]"
        >
          <p class="desktop-priority-title">{{ handleImportance(todo.priority) }}</p>
          <svg
            v-if="todo.editing"
            fill="none"
            :stroke="todo.priorityChange ? 'black' : 'white'"
            stroke-width="2.5"
            viewBox="-1 0 27 27"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M19.5 8.25l-8 8-8-8"></path>
          </svg>
        </div>
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
    </div>
    <div
      v-if="todo.editing"
      :class="['save-delete', { 'todo-importance-dropdown': todo.priorityChange }]"
    >
      <button @click.stop="saveEditing(todo)" class="todo-btn save-btn">Save</button>
      <button @click.stop="deleteTaskIndex(index)" class="todo-btn delete-btn">Delete</button>
    </div>
  </div>
</template>
<style scoped>
.todo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 38px;
  background-color: var(--todo);
  border: 2px solid #000000;
  border-radius: 16px;
  padding: 17px;
  max-width: 291px;
  width: 100%;
  min-height: 82px;
  position: relative;
}
.status-content-priority {
  display: flex;
  align-items: center;
  width: 100%;
}
.status-container {
  width: 24px;
  height: 24px;
  margin-right: 18px;
  cursor: pointer;
}
.status-container img {
  width: 100%;
  height: 100%;
  margin-right: 18px;
}

.todo-importance-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
}

.todo-content {
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 5px;
}

.todo-importance-dropdown {
  opacity: 0.3;
}

.todo-title {
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
}
.todo-text {
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #757575;
  display: none;
  width: 100%;
}

.show-text {
  display: block;
}

.todo-created_at {
  width: 97.56px;
  height: 15px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #333333;
  mix-blend-mode: normal;
  opacity: 0.3;
  flex: none;
  order: 1;
  flex-grow: 0;
}

.todo-importance-title,
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

.todo-priority {
  display: none;
  width: 125px !important;
  gap: 14px;
}

.todo-dropdown-active {
  background-color: white !important;
  color: black !important;
  border: 2px solid black;
  font-size: 18px;
  line-height: 29px;
}
.desktop-priority-title {
  display: none;
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

.High {
  background: #ff481f;
}
.Medium {
  background: #ffab00;
}
.Low {
  background: #38cbcb;
}

.selected {
  border: 1px solid black;
}

.save-delete {
  display: flex;
  flex-direction: row;
  gap: 9px;
}

.todo-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  border: 0;
  outline: none;
  padding: 5px 15px;
  height: 27px;
  cursor: pointer;
  user-select: none;
}
.save-btn {
  width: 60px;
  background-color: var(--save-btn);
  color: white;
}
.delete-btn {
  width: 69px;
  background: var(--delete-btn);
}

@media screen and (min-width: 480px) {
  .todo-importance-title {
    position: absolute;
    top: 23px;
    right: 20px;
    cursor: pointer;
    user-select: none;
  }

  .desktop-priority-title {
    display: flex;
  }
  .todo-importance-option {
    background-color: transparent;
  }
  .todo-importance-title svg {
    width: 20px;
    height: 20px;
  }
  .todo-priority-dropdown {
    display: none;
  }

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

  .desktop-priority {
    display: block;
    font-size: 18px;
    line-height: 18px;
    color: black;
    width: 100%;
    cursor: pointer;
  }
  .selected {
    border: 0;
  }
  .todo {
    max-width: 500px;
    width: 100%;
    min-height: 140px;
    position: relative;
    padding: 20px 22px;
  }
  .todo-title {
    font-size: 30px;
    line-height: 30px;
    font-weight: 600;
  }
  .todo-text {
    display: block;
    font-size: 23px;
    font-weight: 600;
    line-height: 27px;
    margin-top: 30px;
  }
  .todo-importance {
    display: block;
    font-size: 18px;
    line-height: 34px;
  }

  .status-container {
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    margin: 0;
  }
  .todo-created_at {
    font-size: 18px;
    position: absolute;
    right: 8px;
    top: 4rem;
    font-size: 17px;
  }

  .Low,
  .Medium,
  .High {
    border-radius: 500px;
    display: flex;
    justify-content: center;
    color: white;
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
  .delete-btn,
  .save-btn {
    width: 95px;
    height: 40px;
    border-radius: 16px;
    font-size: 17px;
    line-height: 21px;
  }
}
@media screen and (min-width: 768px) {
  .todo {
    max-width: 610px;
    width: 100%;
    min-height: 163px;
  }
  .todo-title {
    font-size: 42px;
    line-height: 50px;
    width: fit-content;
  }
  .todo-text {
    font-size: 28px;
    font-weight: 600;
    line-height: 34px;
    margin-top: 39px;
  }
  .status-container {
    width: 40px;
    height: 40px;
  }
  .delete-btn,
  .save-btn {
    width: 119px;
    height: 52px;
    border-radius: 16px;
    font-size: 18px;
    line-height: 21px;
  }
  .todo-created_at {
    font-size: 18px;
    top: 4.5rem;
  }
}
</style>
