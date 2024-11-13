<template>
    <div class="quiz-container">
        <img v-if="currentQuiz.imageUrl" :src="currentQuiz.imageUrl" class="responsive-img">
        <div class="quiz-header">
            <button class="quiz-tag">정답/오답</button>
            <h2>{{ currentQuiz.title }}</h2>
            <p>{{ currentQuiz.subtitle }}</p>
        </div>

        <div class="quiz-reward">
            <div class="reward-item">
                <i class="icon">📬</i>
                <span>퀴즈 보상</span>
                <div class="reward-points">
                    KB포인트
                    <span class="points">{{ currentQuiz.reward }} P</span>
                </div>
            </div>

            <div class="reward-item">
                <i class="icon">📅</i>
                <span>기간</span>
                <span class="date">{{ currentQuiz.endDate }}</span>
            </div>

            <div class="reward-item">
                <i class="icon">👤</i>
                <span>참여자</span>
                <span class="participants">{{ currentQuiz.participants }}명</span>
            </div>
        </div>

        <button v-if="currentIndex > 0" class="participate-button" @click="prevQuiz">이전 퀴즈</button>
        <button v-if="currentIndex < data.length - 1" class="participate-button" @click="nextQuiz">다음 퀴즈</button>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

const data = ref([]); // API 응답 데이터를 저장할 변수
const currentIndex = ref(0); // 현재 퀴즈의 인덱스를 추적하는 변수

const prevQuiz = () => {
    if (currentIndex.value > 0) {
        currentIndex.value--;
    } else {
        alert("모든 퀴즈를 다 보셨습니다!");
    }
};

const nextQuiz = () => {
    if (currentIndex.value < data.value.length - 1) {
        currentIndex.value++;
    } else {
        alert("모든 퀴즈를 다 보셨습니다!");
    }
};

onMounted(async () => {
    try {
        const response = await axios.get('/api/dailyQuiz');
        data.value = response.data; // API 응답을 data 변수에 저장
        console.log(data.value);
    } catch (error) {
        console.error('데이터 로드 에러:', error);
    }
});

// 현재 퀴즈 데이터
const currentQuiz = computed(() => {
    return data.value[currentIndex.value] || {};
});
</script>

<style scoped>
.quiz-container {
    padding: 0;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: auto;
    text-align: center;
}

.responsive-img {
    width: 100%;
    height: auto;
}

.quiz-header {
    margin-bottom: 20px;
}

.quiz-tag {
    background-color: #F5BB65;
    color: #fff;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8em;
    border: none;
}

.quiz-reward {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin: 20px 0;
}

.reward-item {
    display: flex;
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
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 1em;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
}

.participate-button:hover {
    background-color: #e67e22;
}
</style>