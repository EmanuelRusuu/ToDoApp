<template>
  <div
    class="w-full h-12 flex flex-row items-center justify-between border-2 border-black rounded-lg mb-7 py-2 pr-2 pl-4 xsm:py-4 xsm:pr-8 xsm:h-14 xsm:rounded-2xl xsm:px-5 md:pr-8 md:pl-4 md:h-16"
  >
    <div class="flex flex-row items-center gap-2 w-3/4 h-full">
      <img class="s w-5 h-5 xsm:w-6 xsm:h-6" :src="searchIcon" alt="searchicon" />
      <input
        class="border-0 outline-none w-2/3 h-full font-inter font-medium text-sm tracking-tighter text-black placeholder:opacity-50 xsm:text-lg xsm:text-gray-700 xsm:opacity-100 xsm:w-full xsm:h-13 md:h-14"
        type="text"
        placeholder="Search todos"
        v-model="inputValue"
        @input="doSearchDebounced"
      />
    </div>
    <div class="flex items-center gap-2">
      <CloseIcon v-if="inputValue" @click="clearSearchInput" />
      <button
        @click="doSearch"
        class="flex justify-center items-center w-16 h-8 bg-black text-white rounded-lg border-0 outline-none cursor-pointer xsm:w-20 xsm:h-8"
      >
        <p
          class="text-xs text-white w-10 h-4 xsm:w-11 xsm:h-4 xsm:text-sm xsm:text-white xsm:flex xsm:items-center"
        >
          Search
        </p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { debounce } from '../../helpers/debounce'
import searchIcon from '../../assets/searchIcon.svg'
import CloseIcon from './../Icons/CloseIcon.vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string): void
  (e: 'clearSearchInput'): void
  (e: 'doSearch'): void
}>()

const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

function doSearch() {
  emit('doSearch')
}

function clearSearchInput() {
  emit('clearSearchInput')
}

const doSearchDebounced = debounce(async () => {
  doSearch()
}, 500)
</script>
