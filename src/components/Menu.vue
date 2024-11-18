<template lang="">
  <div class="menu">
    <button type="button" class="btn btn-custom" @click="map">
      <div class="icon-container">
        <i class="fa-solid fa-map"></i>
      </div>
      <div class="text-container">지도</div>
    </button>
    <button type="button" class="btn btn-custom" @click="choolCheck">
      <div class="icon-container">
        <i class="fa-regular fa-calendar-check"></i>
      </div>
      <div class="text-container">출첵</div>
    </button>
    <button type="button" class="btn btn-custom" @click="roulette">
      <div class="icon-container">
        <i class="fa-solid fa-rotate"></i>
      </div>
      <div class="text-container">룰렛</div>
    </button>
    <button
      type="button"
      class="btn btn-custom"
      @click="
        () => {
          router.push({ name: 'quiz' });
        }
      "
    >
      <div class="icon-container">
        <i class="fa-solid fa-question"></i>
      </div>
      <div class="text-container">퀴즈</div>
    </button>
    <button type="button" class="btn btn-custom" @click="zzanda">
      <div class="icon-container">
        <i class="fa-solid fa-book"></i>
      </div>
      <div class="text-container">짠다</div>
    </button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

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
<style>
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

.icon-container {
  font-size: 110%;
}

.text-container {
  font-size: 60%;
}
</style>
