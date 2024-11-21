<template>
  <div class="modal-content">
    <span class="close-btn" @click="close">&times;</span>
    <div v-if="location">
      <h2 class="head-color">{{ location.name }}</h2>
      <p>주소: {{ location.address }}</p>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useQuizStore } from '@/stores/quiz';

// 부모로부터 위치 정보를 props로 받음
const props = defineProps({
  location: Object,
  isInRange: Boolean,
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
  height: 20%;
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
.quiz-btn {
  position: absolute;
  bottom: 10px;
  right: 15px;
  font-size: 20px;
  color: white;
  border-radius: 10px;
  border: none;
  background-color: #f3b706;
}

.head-color {
  color: #0168c3;
}
</style>
