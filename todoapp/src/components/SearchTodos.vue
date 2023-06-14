<script setup lang="ts">
import searchIcon from '../assets/searchIcon.svg'
</script>

<template>
  <div class="search-container">
    <div class="search-bar">
      <img class="search-icon" :src="searchIcon" alt="searchicon" />
      <input class="search-input" type="text" placeholder="Search todos" maxlength="30" />
    </div>
    <button class="search-btn"><p class="search-btn-text">Search</p></button>
  </div>
</template>

<style scoped>
.search-container {
  height: 47px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #040415;
  border-radius: 8px;
  padding: 0 9px;
  margin-bottom: 30px;
}

.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 70%;
}

.search-icon {
  width: 20px;
  height: 20px;
}

.search-input {
  border: 0;
  outline: none;
  width: 60%;
}
.search-input,
.search-input::placeholder {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: -0.3px;
  color: #040415;
  mix-blend-mode: normal;
}

.search-input::placeholder {
  opacity: 0.5;
}

.search-btn {
  width: 68px;
  height: 32px;
  background-color: black;
  color: white;
  border-radius: 8px;
  border: 0;
  outline: 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-btn-text {
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
  width: 38px;
  height: 14px;
}

@media screen and (min-width: 768px) {
  .search-container {
    height: 68px;
    border-radius: 16px;
    padding: 18px 30px 18px 17px;
  }
  .search-icon {
    width: 24px;
    height: 24px;
  }
  .search-btn {
    width: 74px;
  }

  .search-btn-text {
    width: 44px;
    height: 17px;
    font-size: 14px;
    line-height: 17px;
    color: #ffffff;
  }

  .search-input,
  .search-input::placeholder {
    font-family: 'Neue Haas Grotesk Display Pro';
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #4f4f4f;
    mix-blend-mode: normal;
    opacity: 1;
  }
}
</style>
