<template>
  <div class="roulette-container" @click="closeResult">
    <div class="title-container">
      <div class="title">점메추 루-렛 !!</div>
      <div class="text">KB 스타뱅킹과 함께</div>
      <div class="text">점심 메뉴를 골라보세요!</div>
    </div>

    <div class="box-roulette">
      <div class="pin"></div>
      <button type="button" @click="spin" :disabled="isSpinning" class="spin-button">
        <div class="inner-circle">START</div>
      </button>

      <div
        class="roulette"
        :style="{ transform: `rotate(${currentRotation}deg)` }"
        :class="{ spinning: isSpinning }"
      >
        <div
          v-for="(item, index) in items"
          :key="`section-${index}`"
          class="roulette-item"
          :style="getItemStyle(index, item.color)"
        ></div>

        <div
          v-for="(item, index) in items"
          :key="`text-${index}`"
          class="text-layer"
          :style="getTextStyle(index)"
        >
          {{ item.text }}
        </div>
      </div>

      <div v-if="selectedItem && !isSpinning" class="result-overlay">
        <div class="result-content">
          <h4>🎉 축하합니다! 🎉</h4>
          <p>{{ selectedItem.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const items = ref([
  { text: '돈까스', color: '#F2E7ED' },
  { text: '햄버거', color: '#FFFBE7' },
  { text: '부대찌개', color: '#FFF1B2' },
  { text: '카레라이스', color: '#F2E7ED' },
  { text: '멸치국수', color: '#FFFBE7' },
  { text: '뚝배기불고기', color: '#FFF1B2' },
]);

const currentRotation = ref(0);
const isSpinning = ref(false);
const selectedItem = ref(null);
const segmentAngle = computed(() => 360 / items.value.length);

function getItemStyle(index, color) {
  return {
    transform: `rotate(${index * segmentAngle.value}deg) skewY(${90 - segmentAngle.value}deg)`,
    backgroundColor: color,
  };
}

function getTextStyle(index) {
  const angle = index * segmentAngle.value;
  const rotateAngle = angle + segmentAngle.value / 2;
  const radius = 120;

  const radian = (rotateAngle - 90) * (Math.PI / 180);
  const x = radius * Math.cos(radian);
  const y = radius * Math.sin(radian);

  return {
    transform: `translate(${x}px, ${y}px) rotate(${rotateAngle}deg)`,
  };
}

function spin() {
  if (isSpinning.value) return;

  isSpinning.value = true;
  selectedItem.value = null;

  const spins = 5 + Math.random() * 5;
  const randomDegree = Math.random() * 360;
  const totalRotation = spins * 360 + randomDegree;

  currentRotation.value += totalRotation;

  setTimeout(() => {
    isSpinning.value = false;
    const finalAngle = currentRotation.value % 360;
    const itemIndex = Math.floor(((360 - finalAngle) % 360) / segmentAngle.value);
    selectedItem.value = items.value[itemIndex];
  }, 5000);
}

function closeResult() {
  if (selectedItem.value && !isSpinning.value) {
    selectedItem.value = null;
  }
}
</script>

<style scoped>
.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.roulette-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f5f2ee;
}

.title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
}

.text {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.box-roulette {
  position: relative;
  width: 85vw;
  height: 85vw;
  max-width: 400px;
  max-height: 400px;
  /* 안 테두리 */
  border: 5px solid #ffffff;
  border-radius: 50%;
  background: #fff;
  z-index: 1000;
  /* 바깥 테두리*/
  outline: 15px solid #f3b806b0;
  /* outline: 15px solid #f3b706; */
  outline-offset: 2px; /* 테두리 간격 조정 */
}

.pin {
  position: absolute;
  top: -17px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 35px solid #955a1f;
  border-radius: 45%;
  z-index: 5;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
}

.pin::after {
  content: '';
  position: absolute;
  top: -54px;
  left: 0;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-radius: 50%;
  background: #955a1f;
  border-top: 36px solid #955a1f;
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  z-index: 3;
}

/* 흰색 점 추가 */
.pin::before {
  content: '';
  position: absolute;
  top: -36px; /* 상단 핀의 중앙에 위치하도록 조정 */
  left: 0px; /* 좌우 중앙 */
  width: 18px; /* 점 크기 */
  height: 18px; /* 점 크기 */
  background: white;
  border-radius: 50%; /* 원형으로 만들기 */
  transform: translate(-50%, -50%); /* 정확한 중앙 정렬 */
  z-index: 4;
}

.spin-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #ffffff;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.inner-circle {
  width: 45px;
  height: 45px;
  background: #955a1f;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 0.6rem;
}

.spin-button:hover .inner-circle {
  transform: scale(0.8);
  background: #754718;
}

.spin-button:active .inner-circle {
  transform: scale(0.8);
  background: #955a1f;
}

.spin-button:disabled .inner-circle {
  background: #955a1f;
  color: #955a1f;
}

.roulette {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99);
  overflow: hidden;
}

.roulette-item {
  position: absolute;
  width: 50%;
  height: 50%;
  transform-origin: 100% 100%;
  left: 0;
  top: 0;
}

.text-layer {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center;
  color: black;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 2;
  width: 80px;
  text-align: center;
  margin-left: -40px;
  margin-top: -20px;
  line-height: 1.2;
  white-space: normal;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 4px 6px;
  border-radius: 4px;
  height: auto;
  min-height: 2.4em;
}

.result-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(255, 255, 255);
  padding: 25px 15px;
  border-radius: 1rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 3;
  animation: popIn 0.5s ease forwards;
  width: 250px;
}

.result-content h2 {
  color: #333;
  margin-bottom: 1rem;
}

.result-content p {
  font-size: 2rem;
  font-weight: bold;
  color: #000000;
  margin: 0;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
