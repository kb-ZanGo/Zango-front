<template>
  <div class="modal-content">
    <span class="close-btn" @click="close">&times;</span>
    <div v-if="location">
      <h2 class="head-color">
        <img
          v-if="location.type"
          :src="getImageByType(location.type)"
          alt="Location Type"
          style="width: 40px; height: 40px; margin-right: 2px"
        />{{ location.name }}
      </h2>
      <p style="color: #555558">{{ location.address }}</p>
      <p class="coalition-info">
        <i class="fa-solid fa-star-of-life"></i> {{ location.content }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { useToast } from 'vue-toastification';
import { useQuizStore } from '@/stores/quiz';

// 부모로부터 위치 정보를 props로 받음
const props = defineProps({
  location: Object,
  isInRange: Boolean,
});

// 닫기 이벤트를 부모에게 전달
const emit = defineEmits(['close']);

const getImageByType = (type) => {
  switch (type) {
    case 'gs':
      return '/images/gs.png';
    case 'coffee':
      return '/images/star.png';
    case 'olive':
      return '/images/olive.png';
    case 'cgv':
      return '/images/cgv.png';
    case 'cu':
      return '/images/cu.png';
    case 'out':
      return '/images/outback.png';
    default:
      return '/images/gs.png'; // 기본 이미지
  }
};

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
  margin-left: -6px;
  margin-top: 15px;
}
.coalition-info {
  color: #f6b965;
  font-size: 24px;
  /* text-align: center; */
}
</style>
