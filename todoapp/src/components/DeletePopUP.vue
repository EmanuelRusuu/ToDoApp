<script setup lang="ts">
import ExclamationIcon from './Icons/ExclamationIcon.vue'
import CloseIcon from './Icons/CloseIcon.vue'

const props = defineProps<{ index: number }>()
const emit = defineEmits<{
  (e: 'togglePopUp'): void
  (e: 'removeTask', index: number): void
}>()

function togglePopUp() {
  emit('togglePopUp')
}

function removeTask() {
  emit('removeTask', props.index)
}
</script>

<template>
  <div class="confirmation-dialog-container">
    <div class="confirmation-dialog-content">
      <CloseIcon @toggle-pop-up="togglePopUp" />
      <ExclamationIcon />
      <div class="popup-title-text">
        <p class="popup-title">Confirm Deletion</p>
        <p class="popup-text">Are you sure you want to delete the selected task?</p>
      </div>
      <div class="popup-buttons">
        <button class="popup-btn delete-btn" @click="removeTask">
          <p class="btn-text">Delete</p>
        </button>
        <button class="popup-btn cancel-btn" @click="togglePopUp">
          <p class="btn-text">Cancel</p>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.confirmation-dialog-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(188, 188, 188, 0.6);
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.confirmation-dialog-content {
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
  .confirmation-dialog-content {
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
</style>
