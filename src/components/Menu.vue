<template>
  <div class="menu">
    <button type="button" class="btn btn-custom" :class="{ active: activeButton === 'map' }"
      @click="setActiveButton('map'); map()">
      <div class="icon-container">
        <i class="fa-solid fa-map"></i>
      </div>
      <div class="text-container">지도</div>
    </button>
    <button type="button" class="btn btn-custom" :class="{ active: activeButton === 'choolCheck' }"
      @click="setActiveButton('choolCheck'); choolCheck()">
      <div class="icon-container">
        <i class="fa-regular fa-calendar-check"></i>
      </div>
      <div class="text-container">출첵</div>
    </button>
    <button type="button" class="btn btn-custom" :class="{ active: activeButton === 'roulette' }"
      @click="setActiveButton('roulette'); roulette()">
      <div class="icon-container">
        <i class="fa-solid fa-rotate"></i>
      </div>
      <div class="text-container">룰렛</div>
    </button>
    <button type="button" class="btn btn-custom" :class="{ active: activeButton === 'quiz' }"
      @click="setActiveButton('quiz'); router.push({ name: 'quiz' })">
      <div class="icon-container">
        <i class="fa-solid fa-question"></i>
      </div>
      <div class="text-container">퀴즈</div>
    </button>
    <button type="button" class="btn btn-custom" :class="{ active: activeButton === 'zzanda' }"
      @click="setActiveButton('zzanda'); zzanda()">
      <div class="icon-container">
        <i class="fa-solid fa-book"></i>
      </div>
      <div class="text-container">짠다</div>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeButton = ref('');

const setActiveButton = (buttonName) => {
  activeButton.value = buttonName;
};

const map = () => {
  router.push({ name: 'map' });
};

const zzanda = () => {
  router.push({ name: 'zzanda' });
};

const choolCheck = () => {
  router.push({ name: 'choolCheck' });
};

const roulette = () => {
  router.push({ name: 'roulette' });
};
</script>

<style scoped>
i {
  color: #F5BA65;
}

.menu {
  width: 100%;
  height: 10vh;
  position: fixed;
  bottom: 0;
}

.btn-custom {
  width: 20%;
  height: 10vh;
  background-color: white;
  border: none;
  font-size: 150%;
}

.btn-custom.active {
  border: 2px solid #F4F2ED;
  /* 활성화된 버튼의 테두리 색상 */
  background-color: #F4F2ED;
  /* 활성화된 버튼의 배경색 */
  /* 활성화된 버튼의 글자색 */
}

.icon-container {
  font-size: 110%;
}

.text-container {
  font-weight: bold;
  font-size: 60%;
}
</style>