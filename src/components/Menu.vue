<template lang="">
  <div class="menu">
    <button type="button" class="btn btn-custom" @click="choolCheck">출첵</button>
    <button type="button" class="btn btn-custom">룰렛</button>
    <button type="button" class="btn btn-custom">퀴즈</button>
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
  border: 3px solid #f5bb65;
  background-color: white;
  border-radius: 10px;
  font-size: 150%;
}
</style>
