<script setup lang="ts">
const emit = defineEmits<{
  (e: 'addTodo'): void
}>()

function handleAdd() {
  emit('addTodo')
}
</script>

<template>
  <div class="header">
    <h1 class="header-title">To do list</h1>
    <button @click="handleAdd" class="add-todo-btn">
      <svg viewBox="-4 -4 32 32" stroke="currentColor">
        <path d="M12 6v12m6-6H6" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 49px;
}
.header-title {
  width: 92px;
  height: 26px;
  font-size: 24px;
  line-height: 29px;
  color: #000000;
}
.add-todo-btn {
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--add-todo-btn);
  color: WHITE;
}

.add-todo-icon {
  color: white;
}

@media screen and (min-width: 480px) {
  .header-title {
    width: 275px;
    height: 60px;
    font-size: 55px;
    line-height: 55px;
  }

  .add-todo-btn {
    width: 46px;
    height: 46px;
  }
}

@media screen and (min-width: 768px) {
  .header-title {
    width: 275px;
    height: 86px;
    font-size: 72px;
    line-height: 86px;
  }

  .add-todo-btn {
    width: 60px;
    height: 60px;
  }
}
</style>
