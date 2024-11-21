<template>
  <div class="container">
    <!-- 상단 결과 메시지 -->
    <div class="result-message">
      <p class="result-text">
        {{ quizzes.data.results.length }}문제 중 {{ correctCount }}개를
        맞췄어요.<br />
        <span v-if="pass" class="pass-message">보상을 받을 수 있어요!</span>
        <span v-else class="fail-message">보상을 받을 수 없어요.</span>
      </p>
    </div>
    <!-- 퀴즈 항목 리스트 -->
    <div class="quiz-list">
      <div v-for="(quiz, index) in quizzes.data.results" :key="quiz.id" class="quiz-item">
        <h4>{{ index + 1 }}. {{ quiz.quizTitle }}</h4>
        <p class="answer">답: {{ quiz.answer }}</p>
      </div>
      <div style="display: flex; margin-top: 5%">
        <button class="close-button" @click="close">확인</button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useResult } from '../stores/quizResult';
import { useRouter } from 'vue-router';
const { resultData } = useResult();
const router = useRouter();
// 퀴즈 리스트 예제 데이터
const quizzes = resultData.value[0];
console.log(quizzes.data);
const correctCount = ref(quizzes.data.correctCount); // 맞춘 문제 수
const pass = ref(quizzes.data.pass);
// 닫기 버튼 클릭 시 동작
const close = () => {
  if (pass.value) {
    let currentReward = localStorage.getItem('point');
    currentReward = currentReward ? parseInt(currentReward) : 0;
    localStorage.setItem('point', currentReward + quizzes.data.reward);
    alert(quizzes.data.reward + '포인트를 받았습니다.');
  }
  router.push('/');
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 110vh;
  max-width: 500px;
  margin: auto;
  font-family: Arial, sans-serif;
}

.result-message {
  position: relative;
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.close-button {
  margin: auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #955a20;
  color: white;
  text-align: center;
}

.result-text {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
}

.pass-message {
  color: green;
}

.fail-message {
  color: red;
}

.info-text {
  font-size: 0.9em;
  color: #888;
}

.quiz-list {
  padding: 20px;
}

.quiz-item {
  border: 1px solid #f6c27a;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.answer {
  font-size: 0.9em;
  color: #666;
}

.progress-bar-container {
  background: #eee;
  height: 8px;
  border-radius: 4px;
  margin: 10px 0;
}

.progress-bar {
  height: 8px;
  background-color: #4caf50;
  border-radius: 4px;
}

.stats {
  font-size: 0.85em;
  color: #555;
}

.more-button {
  font-size: 0.9em;
  color: #007bff;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  padding: 0;
}
</style>
