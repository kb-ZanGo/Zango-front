<template>
  <div class="modal-content">
    <span class="close-btn" @click="close">&times;</span>
    <div v-if="location">
      <h2>{{ location.name }}</h2>
      <p>주소: {{ location.addr }}</p>
      <p>전화번호: {{ location.tel }}</p>
      <p>영업시간: {{ location.startTime }} ~ {{ location.endTime }}</p>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

// 부모로부터 위치 정보를 props로 받음
const props = defineProps({
  location: Object,
});

// 닫기 이벤트를 부모에게 전달
const emit = defineEmits(['close']);

const close = () => {
  emit('close'); // 부모 컴포넌트에 close 이벤트 전달
};
</script>
<style>
.modal-content {
  background-color: white;
  padding: 20px;
  width: 100%;
  height: 30%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  font-size: 24px;
}
</style>
