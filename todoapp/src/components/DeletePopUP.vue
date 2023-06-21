<template>
  <div
    class="absolute flex items-center justify-center flex-col inset-0 w-full h-full bg-gray-300 bg-opacity-60 z-10"
  >
    <div
      class="relative flex flex-col items-center bg-white py-8 px-2 rounded-b-md border-t-4 border-solid border-red-500 gap-5 m-4 md:py-10 md:px-12 md:gap-8"
    >
      <CloseIcon @toggle-pop-up="togglePopUp" />
      <ExclamationIcon />
      <div class="flex flex-col items-center">
        <p class="text-lg font-medium xsm:text-2xl xsm:font-medium">Confirm Deletion</p>
        <p class="font-medium text-xs text-gray-400 xsm:font-medium xsm:text-base text-center">
          Are you sure you want to delete the selected task?
        </p>
      </div>
      <div class="flex flex-row items-center gap-2 xsm:gap-4">
        <button class="popup-btn bg-red-500" @click="removeTask">
          <p class="btn-text text-white">Delete</p>
        </button>
        <button class="popup-btn bg-gray-300" @click="togglePopUp">
          <p class="btn-text">Cancel</p>
        </button>
      </div>
    </div>
  </div>
</template>

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
