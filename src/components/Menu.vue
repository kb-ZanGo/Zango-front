<template lang="">
  <div class="menu">
    <button type="button" class="btn btn-custom" @click="choolCheck">출첵</button>
    <button type="button" class="btn btn-custom" @click="roulette">룰렛</button>
    <button
      type="button"
      class="btn btn-custom"
      @click="
        () => {
          router.push({ name: 'quiz' });
        }
      "
    >
      퀴즈
    </button>
    <button type="button" class="btn btn-custom" @click="zzanda">짠다</button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

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
  background-color: gainsboro;
}

.btn-custom {
  width: 25%;
  height: 10vh;
  background-color: white;
  border: none;
  font-size: 150%;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
