<template>
    <div v-if="data.length == 0">퀴즈가 없는데용?</div>
    <div v-else class="quiz-container">
        <div class="image-container">
            <img v-if="currentQuiz.imageUrl" :src="currentQuiz.imageUrl">
        </div>

        <div class="quiz-header">
            <button class="quiz-tag">정답/오답</button>
            <h2>{{ currentQuiz.title }}</h2>
            <p class="quiz-description">{{ currentQuiz.description }}</p>
        </div>

        <div class="quiz-header-divider"></div> <!-- 회색 선 추가 -->

        <div class="center">
            <div class="move-button" @click="prevQuiz">
                <i v-if="currentIndex > 0" class="fa-solid fa-angle-left"></i>
            </div>
            <div class="quiz-reward">

                <div class="reward-item">
                    <div>
                        <i class="fa-solid fa-gift icon"></i>
                        <span class="title">퀴즈 보상</span>
                    </div>
                </div>
                <div class="reward-box">
                    <span class="title">KB포인트</span>
                    <span class="points"> <img style="width:30px;" src="@/assets/icons/point.png"> {{ currentQuiz.reward
                        }}</span>
                </div>
                <div class="reward-item">
                    <i class="fa-regular fa-calendar icon"></i>
                    <span class="title">기간</span>
                    <span class="date">{{ currentQuiz.endDate }} 까지</span>
                </div>

                <div class="reward-item">
                    <i class="fa-solid fa-user-group icon"></i>
                    <span class="title">참여자</span>
                    <span class="participants">{{ currentQuiz.count }} 명</span>
                </div>
            </div>
            <div class="move-button" @click="nextQuiz">
                <i v-if="currentIndex < data.length - 1" class="fa-solid fa-angle-right"></i>
            </div>
        </div>

        <!-- indicator -->
        <div class="indicator-container">
            <div v-for="(item, index) in data.length" :key="index"
                :class="['indicator', { active: currentIndex === index }]"></div>
        </div>

        <button class="participate-button" @click="goToQuiz">참여하기</button>

    </div>

    <div class="quiz-header">
      <button class="quiz-tag">정답/오답</button>
      <h2>{{ currentQuiz.title }}</h2>
      <p class="quiz-description">{{ currentQuiz.description }}</p>
    </div>

    <div class="quiz-header-divider"></div>
    <!-- 회색 선 추가 -->

    <div class="center">
      <div class="move-button" @click="prevQuiz">
        <i v-if="currentIndex > 0" class="fa-solid fa-angle-left"></i>
      </div>
      <div class="quiz-reward">
        <div class="reward-item">
          <div>
            <i class="fa-solid fa-gift icon"></i>
            <span class="title">퀴즈 보상</span>
          </div>
        </div>
        <div class="reward-box">
          <span class="title">KB포인트</span>
          <span class="points">
            <img style="width: 30px" src="@/assets/icons/point.png" />
            {{ currentQuiz.reward }}</span
          >
        </div>
        <div class="reward-item">
          <i class="fa-regular fa-calendar icon"></i>
          <span class="title">기간</span>
          <span class="date">{{ currentQuiz.endDate }} 까지</span>
        </div>

        <div class="reward-item">
          <i class="fa-solid fa-user-group icon"></i>
          <span class="title">참여자</span>
          <span class="participants">{{ currentQuiz.count }} 명</span>
        </div>
      </div>
      <div class="move-button" @click="nextQuiz">
        <i
          v-if="currentIndex < data.length - 1"
          class="fa-solid fa-angle-right"
        ></i>
      </div>
    </div>

    <!-- indicator -->
    <div class="indicator-container">
      <div
        v-for="(item, index) in data.length"
        :key="index"
        :class="['indicator', { active: currentIndex === index }]"
      ></div>
    </div>

    <button class="participate-button">참여하기</button>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const data = ref([]);
const currentIndex = ref(0);

const prevQuiz = () => {
  currentIndex.value--;
};

const nextQuiz = () => {
  currentIndex.value++;
};

onMounted(async () => {
  try {
    const response = await axios.get('/api/dailyQuiz');
    data.value = response.data;
    console.log(data.value);
  } catch (error) {
    console.error('데이터 로드 에러:', error);
  }
});

const currentQuiz = computed(() => {
  return data.value[currentIndex.value] || {};
});

const goToQuiz = () => {
    // 원하는 경로로 이동
    router.push(`/quiz/${currentQuiz.value.id}`);
};
</script>

<style scoped>
.quiz-container {
  padding: 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  height: 100vh;
  margin: auto;
}

.quiz-header {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 20px;
  height: 20%;
}

.reward {
  display: flex;
  flex-direction: column;
}

.quiz-tag {
  background-color: #f5bb65;
  color: #fff;
  padding: 5px 10px;
  border-radius: 15px;
  margin-bottom: 10px;
  font-size: 0.8em;
  border: none;
  width: 85px;
  height: 35px;
}

.quiz-description {
  font-size: 0.8em;
  /* 폰트 크기 조정 */
  color: #b0b8c1;
  /* 회색 글씨 */
  margin-top: 5px;
}

.quiz-header-divider {
  border-top: 1px solid #b0b8c1;
  /* 회색 선 */
  margin: 0 20px;
  /* 좌우 여백 */
}

.quiz-reward {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: start;
  margin: 20px 0;
  width: 90%;
  height: 100%;
  padding: 10px;
}

.reward-item {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
}

.icon {
  font-size: 1.5em;
  margin-right: 10px;
}

.reward-points,
.date,
.participants {
  font-weight: bold;
  margin-left: auto;
}

.participate-button {
  background-color: #f8c471;
  color: #fff;
  padding: 15px 0;
  font-size: 1em;
  max-width: 400px;
  width: 100%;
  border: none;
  cursor: pointer;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: auto;
  right: auto;
  border-radius: 12px;
  transition: background-color 0.3s;
}

.participate-button:hover {
  background-color: #e67e22;
}

.center {
  display: flex;
  height: 40%;
  justify-content: space-evenly;
  align-items: center;
}

.title {
  color: #777d84;
}

.icon {
  color: #f5bb65;
}

.move-button:hover {
  cursor: pointer;
}

.reward-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 20%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  font-family: Arial, sans-serif;
  font-size: 14px;
  margin-top: -30px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  /* 좌우 하단에 그림자 */
}

.move-button {
  width: 5%;
  text-align: center;
  color: #9f9d9d;
}

/* 인디케이터 스타일 */
.indicator-container {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 10px;
}

.indicator {
  width: 10px;
  height: 10px;
  margin-top: 30px;
  background-color: #e0e0e0;
  border-radius: 50%;
}

.indicator.active {
  background-color: #f8c471;
  /* 활성화된 인디케이터 색상 */
}

.image-container {
  width: 100%;
  height: 25%;
  /* 원하는 높이 지정 */
  position: relative;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 비율 유지하며 div에 꽉 차게 */
}
</style>
