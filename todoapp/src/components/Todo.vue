<script setup lang="ts">
import type { TodoType } from '../types/text'
import Incomplete from '../assets/eclipseblack.svg'
import Complete from '../assets/completedTask.png'
import ArrowDown from './Icons/ArrowDown.vue'
import Calendar from '../components/Icons/Calendar.vue'
const props = defineProps<{
  todos: TodoType[]
}>()
const emit = defineEmits<{
  (e: 'deleteTaskIndex', index: number): void
  (e: 'markTodoDone', todo: TodoType): void
  (e: 'markTodoNotDone', todo: TodoType): void
}>()

const priority = { 0: 'Low', 1: 'Medium', 2: 'High' }

function handleImportance(index: keyof typeof priority) {
  return priority[index]
}

function isEditing(todo: TodoType) {
  todo.editing = true
}

function saveEditing(todo: TodoType) {
  todo.editing = false
  todo.priorityChange = false
  todo.textEdit = false
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

function markTodoStatus(todo: TodoType) {
  if (todo.status) {
    todo.status = false
    setTimeout(() => {
      emit('markTodoNotDone', todo)
    }, 200)
  } else {
    todo.status = true
    setTimeout(() => {
      emit('markTodoDone', todo)
    }, 600)
  }
}

function textEdit(todo: TodoType) {
  if (todo.editing) {
    todo.textEdit = true
  }
}
</script>
<template>
  <div class="todo" @click="isEditing(todo)" v-for="(todo, index) in todos" :key="index">
    <div class="status-content-priority">
      <div v-if="!todo.editing" @click.stop="markTodoStatus(todo)" class="status-container">
        <img
          :src="todo.status ? Complete : Incomplete"
          :alt="todo.status ? 'complete' : 'incomplete'"
        />
      </div>
      <div class="todo-importance-wrap">
        <div :class="['todo-content', { 'todo-importance-dropdown': todo.priorityChange }]">
          <div>
            <input
              v-if="todo.editing"
              v-model="todo.title"
              class="title-input"
              type="text"
              maxlength="19"
              placeholder="Add a title"
              @click.stop="isEditing(todo)"
            />
            <p v-else class="todo-title">
              {{ todo.title }}
            </p>
          </div>
          <div class="todo-date">
            <Calendar :class="['calendar', { 'display-calendar': todo.editing }]" />
            <p class="todo-created_at">
              {{ todo.created_at }}
            </p>
          </div>
          <div>
            <textarea
              v-if="todo.textEdit && todo.editing"
              v-model="todo.text"
              type="text"
              class="text-input"
              maxlength="160"
            ></textarea>
            <p
              v-if="!todo.textEdit"
              @click="textEdit(todo)"
              :class="['todo-text', { 'show-text': todo.editing }]"
            >
              {{ todo.text }}
            </p>
          </div>
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
          <ArrowDown v-if="todo.editing" :priorityChange="todo.priorityChange" />
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
  justify-content: space-between;
  width: 100%;
}

.todo-importance-dropdown {
  opacity: 0.3;
}

.todo-title {
  font-size: 18px;
  font-weight: 500;
  line-height: 21px;
}
.title-input {
  max-width: 14rem;
  width: 100%;
  height: 21px;
  border: 0;
  outline: none;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
}
.todo-text {
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #757575;
  display: none;
  width: 100%;
  margin-top: 16px;
}

.text-input {
  resize: none;
  height: 4.25rem;
  width: 100%;
  display: flex;
  text-align: start;
  border: 0;
  outline: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #757575;
  margin-top: 16px;
}

.show-text {
  display: block;
}

.todo-date {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 4px;
}

.calendar {
  height: 15px;
  width: 15px;
  display: none;
}

.display-calendar {
  display: block;
}

.todo-created_at {
  width: 97px;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #333333;
  opacity: 0.3;
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
  flex-wrap: wrap;
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
  .todo {
    max-width: 500px;
    width: 100%;
    min-height: 140px;
    position: relative;
    padding: 25px 26px;
  }
  .todo-title {
    font-size: 30px;
    line-height: 30px;
    font-weight: 600;
    width: fit-content;
  }

  .title-input {
    width: 100%;
    height: 30px;
    font-weight: 600;
    font-size: 30px;
    line-height: 30px;
  }
  .todo-text {
    display: block;
    font-size: 23px;
    font-weight: 600;
    line-height: 27px;
    margin-top: 30px;
  }

  .text-input {
    height: 5.44rem;
    width: 100%;
    font-size: 23px;
    font-weight: 600;
    line-height: 27px;
    margin-top: 30px;
    overflow: hidden;
  }

  .todo-date {
    align-items: center;
    gap: 5px;
  }

  .calendar {
    display: block;
    height: 20px;
    width: 20px;
  }

  .todo-created_at {
    font-size: 18px;
    color: black;
    opacity: 1;
  }

  .todo-importance {
    display: block;
    font-size: 18px;
    line-height: 34px;
  }

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

  .status-container {
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    margin: 0;
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
    padding: 20px 22px;
  }
  .todo-title {
    font-size: 42px;
    line-height: 50px;
  }

  .title-input {
    max-width: 22rem;
    width: 100%;
    height: 50px;
    font-weight: 600;
    font-size: 42px;
    line-height: 50px;
  }
  .todo-text {
    font-size: 28px;
    font-weight: 600;
    line-height: 34px;
    margin-top: 39px;
  }
  .text-input {
    height: 9.32rem;
    width: 100%;
    font-size: 28px;
    margin-top: 39px;
    line-height: 34px;
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

  .calendar {
    height: 23px;
    width: 23px;
  }
}
</style>
