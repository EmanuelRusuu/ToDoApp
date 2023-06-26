<template>
  <div class="w-full flex flex-wrap gap-5 mb-12 xsm:justify-between">
    <div class="sorting-options flex flex-wrap gap-3 items-center">
      <button
        v-for="button in buttons"
        :key="button.key"
        class="sorting-btn"
        :class="{
          'bg-emerald-400 border-emerald-400 text-white': button.selected && button.order
        }"
        @click="toggleSelected(button.key)"
      >
        {{ button.label }}
      </button>
    </div>
    <div class="ordering-options flex gap-2 items-center">
      <button class="sorting-btn bg-emerald-400">
        <img :src="Arrow" />
      </button>
      <button class="sorting-btn bg-black">
        <img class="rotate-180" :src="Arrow" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Arrow from '../assets/arrow.svg'
import { computed } from 'vue'
import type { SelectedState } from '../types/selected'

const props = defineProps<{ selectedSortingButtons: SelectedState }>()

const buttons = computed(() =>
  Object.keys(props.selectedSortingButtons).map((key) => ({
    key: key as keyof SelectedState,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    selected: props.selectedSortingButtons[key as keyof SelectedState].selected,
    order: props.selectedSortingButtons[key as keyof SelectedState].order
  }))
)

function toggleSelected(key: keyof SelectedState) {
  const updatedButtons = { ...props.selectedSortingButtons }
  Object.keys(updatedButtons).forEach((buttonKey) => {
    updatedButtons[buttonKey as keyof SelectedState].selected = buttonKey === key
  })
}
</script>
