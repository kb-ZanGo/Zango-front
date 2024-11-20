<template>
  <div class="top-bar">
    <button @click="goBack" class="back-button">
      <i class="fa-solid fa-angle-left"></i>
    </button>
    <span class="top-bar-text"> 퀴즈</span>
  </div>
  <div v-if="quizzes?.length" class="middle">
    <div class="quiz-item">
      <div class="quiz-explain">
        <h3 style="margin: auto">{{ currentQuiz.title }}</h3>
      </div>
      <div v-if="currentQuiz.type === 'OX'" class="choices">
        <button @click="selectChoice(0)" class="answer-button">O</button>
        <button @click="selectChoice(1)" class="answer-button">X</button>
      </div>
      <div v-else-if="currentQuiz.type === 'MCQ'" class="choices">
        <button
          class="answer-button"
          v-for="choice in currentQuiz.choices"
          :key="choice.number"
          @click="selectChoice(choice.number)"
        >
          {{ choice.text }}
        </button>
      </div>
    </div>
  </div>
  <div>
    <div class="bottom-bar">
      <button v-if="!isLastQuiz" @click="goToNextQuiz" class="next-button">
        다음 질문으로
      </button>

      <button
        v-else-if="selectedAnswers[currentIndex] !== undefined"
        @click="showResults"
        class="results-button"
      >
        결과 보기
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useResult } from '@/stores/quizResult';
const { resetResult, addResultItem } = useResult();

const route = useRoute();
const router = useRouter();
const quizGroupId = route.params.quizGroupId;

const quizzes = ref(null); // 전체 퀴즈 그룹 데이터
const currentIndex = ref(0); // 현재 퀴즈의 인덱스
const selectedAnswers = ref([]); // 선택된 답변을 저장하는 배열

const goBack = () => {
  if (currentIndex.value === 0) {
    router.back(); // 첫 번째 퀴즈일 경우 이전 페이지로 이동
  } else {
    currentIndex.value--; // 첫 번째 퀴즈가 아니면 이전 퀴즈로 이동
  }
};
const fetchQuizzes = async () => {
  try {
    const response = await axios.get(`/api/quiz/quizGroup/${quizGroupId}`);
    quizzes.value = response.data.data;
  } catch (error) {
    console.error('데이터 로드 에러:', error);
  }
};

// 현재 퀴즈를 계산하는 컴포저블
const currentQuiz = computed(() => quizzes.value?.[currentIndex.value]);

// 마지막 퀴즈 여부 확인
const isLastQuiz = computed(
  () => currentIndex.value === quizzes.value?.length - 1
);

// 선택된 답을 저장하는 함수
const selectChoice = (choice) => {
  selectedAnswers.value[currentIndex.value] = choice;
  // console.log(`퀴즈 ${currentQuiz.value.id} 선택된 답: ${choice}`);
};

// 다음 퀴즈로 이동하는 함수
const goToNextQuiz = () => {
  if (!isLastQuiz.value) {
    currentIndex.value++;
  }
};

// 결과 보기 함수
const showResults = async () => {
  const result = await axios.post('https://zango.site/api/dailyQuiz/result', {
    groupId: quizGroupId,
    answer: selectedAnswers.value,
  });
  resetResult();
  addResultItem(result);
  router.push({
    name: 'QuizResult',
  }); // 홈 화면으로 이동
};

onMounted(fetchQuizzes);
</script>

<style scoped>
.top-bar {
  display: flex;
  width: 100%;
  height: 50px;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
}
.bottom-bar {
  display: flex;
  width: 100%;
  height: 90px;
}
.middle {
  display: flex;
  width: 100%;
  height: 60%;
}
.quiz-item {
  width: 95%;
  margin: auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}
.quiz-explain {
  display: flex;
  width: 100%;
  height: 200px;
}
.back-button {
  width: 30px;
  border: none;
  background-color: white;
  font-size: 30px;
  padding: 0.4rem;
}
.top-bar-text {
  width: 100px;
  border: none;
  font-size: 25px;
  padding: 0.5rem;
  margin: auto;
  text-align: center;
}
.choices button {
  width: 100%;
  padding: 20px 20px 20px 30px;
  font-size: 24px;
  text-align: left;
  border-radius: 40px;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
  display: block;
  background-color: #f5bb65;
  color: white;
}

.choices button:hover {
  background-color: #f2d382;
}
.next-button,
.results-button {
  margin: auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #955a20;
  color: white;
  text-align: right;
}

.next-button:hover,
.results-button:hover {
  background-color: #955a20;
}
</style>
