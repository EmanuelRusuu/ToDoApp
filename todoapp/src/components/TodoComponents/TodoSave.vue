<template>
  <button
    @click.stop="saveEditing()"
    class="flex flex-row justify-center items-center text-sm gap-2 rounded-lg border-none outline-none px-4 py-1 h-7 cursor-pointer select-none w-14 bg-emerald-400 text-white xsm:w-24 xsm:h-10 xsm:rounded-2xl xsm:text-base md:w-28 md:h-12 md:rounded-2xl md:text-lg"
  >
    Save
  </button>
</template>
<script setup lang="ts">
const emit = defineEmits<{ (e: 'onTodoSave'): void }>()

function saveEditing() {
  emit('onTodoSave')
}
</script>
