<template lang="">
  <div class="menu">
    <div class="btn-group" role="group" aria-label="Basic example">
      <button type="button" class="btn btn-custom">출석 체크</button>
      <button type="button" class="btn btn-custom">룰렛</button>
      <button type="button" class="btn btn-custom">퀴즈</button>
      <button type="button" class="btn btn-custom" @click="zzanda">짠다</button>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const zzanda = () => {
  router.push({ name: 'zzanda' });
};
</script>
<style>
.menu {
  width: 618px;
  height: 85px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.btn-custom {
  width: 151.5px;
  height: 85px;
  border: 3px solid #ffaf00;
  border-radius: 10px;
  font-size: 30px;
  margin-right: 5px;
}
</style>
