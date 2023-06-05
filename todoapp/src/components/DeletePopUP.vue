<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ index: number }>()
const emit = defineEmits<{
  (e: 'togglePopUP'): void
  (e: 'removeTask', index: number): void
}>()

function togglePopUP() {
  emit('togglePopUP')
}

function removeTask() {
  emit('removeTask', props.index)
}
</script>

<template>
  <div class="popup-main-container">
    <div class="popup-second-container">
      <div class="x" @click="togglePopUP">
        <svg
          fill="none"
          stroke="darkgray"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <svg
        fill="red"
        class="exclamation"
        stroke="white"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        ></path>
      </svg>
      <div class="popup-title-text">
        <p class="popup-title">Confirm Deletion</p>
        <p class="popup-text">Are you sure you want to delete the selected task?</p>
      </div>
      <div class="popup-buttons">
        <button class="popup-btn delete-btn" @click="removeTask">
          <p class="btn-text">Delete</p>
        </button>
        <button class="popup-btn cancel-btn" @click="togglePopUP">
          <p class="btn-text">Cancel</p>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-main-container {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(188, 188, 188, 0.6);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.popup-second-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 2rem 0.5rem;
  border-radius: 5px;
  border-top: 4px solid #ff481f;
  gap: 20px;
  position: relative;
  margin: 1rem;
}

.x {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

.popup-title-text {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.popup-title {
  font-size: 18px;
  font-weight: 500;
}

.popup-text {
  font-weight: 500;
  font-size: 12px;
  color: rgb(108, 108, 108);
  text-align: center;
}

.exclamation {
  width: 2rem;
  height: 2rem;
}

.popup-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
}

.popup-btn {
  border-radius: 16px;
  height: 30px;
  width: 70px;
  border: 0;
  outline: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.delete-btn {
  background-color: #ff481f;
  color: white;
}

.cancel-btn {
  background-color: #e6e6e6;
}

.btn-text {
  width: 52px;
  height: 22px;
  font-weight: 500;
  font-size: 13px;
  line-height: 22px;
}

@media screen and (min-width: 480px) {
  .popup-second-container {
    padding: 2.5rem 3rem;
    gap: 30px;
  }

  .x {
    width: 1.8rem;
    height: 1.8rem;
  }

  .popup-title {
    font-size: 26px;
    font-weight: 500;
  }

  .popup-text {
    font-weight: 500;
    font-size: 15px;
  }

  .exclamation {
    width: 4rem;
    height: 4rem;
  }

  .popup-buttons {
    gap: 1rem;
  }

  .popup-btn {
    height: 45px;
    width: 105px;
  }


  .btn-text {
    width: 52px;
    height: 22px;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
  }
}
