<template>
  <div class="roulette-container" @click="closeResult">
    <h1 class="title">바람개비가 되지 못한 행운의 룰렛</h1>

    <div class="box-roulette">
      <div class="pin"></div>
      <button type="button" @click="spin" :disabled="isSpinning" class="spin-button">
        <div class="inner-circle"></div>
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
          <h3>🎉 당첨! 🎉</h3>
          <p>{{ selectedItem.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const items = ref([
  { text: '돈까스', color: '#FF4136' },
  { text: '얼큰이칼국수', color: '#FF851B' },
  { text: '짬뽕밥', color: '#FFDC00' },
  { text: '햄버거', color: '#2ECC40' },
  { text: '밥버거', color: '#0074D9' },
  { text: '김치제육', color: '#B212F3' },
  { text: '빨계떡', color: '#FFEE7C' },
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
.roulette-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.box-roulette {
  position: relative;
  width: 400px;
  height: 400px;
  border: 15px solid #ddd;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
  z-index: 1000;
}

.pin {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-top: 40px solid #333;
  z-index: 2;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3));
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
}

.inner-circle {
  width: 50px;
  height: 50px;
  background: #ff4136;
  border-radius: 50%;
  margin: 5px;
  transition: all 0.3s ease;
}

.spin-button:hover .inner-circle {
  transform: scale(0.9);
  background: #ff6b63;
}

.spin-button:active .inner-circle {
  transform: scale(0.8);
  background: #cc3329;
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
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
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

.spin-button:disabled .inner-circle {
  background: #ff0000;
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
