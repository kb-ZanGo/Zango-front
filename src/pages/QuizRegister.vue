<template>
    <div>
        <h1>퀴즈 그룹 입력 폼</h1>

        <!-- 그룹 정보 입력 -->
        <h2>그룹 정보</h2>
        <form @submit.prevent="handleSubmit">
            <label>타이틀:</label>
            <input v-model="group.title" type="text" placeholder="그룹 타이틀" />

            <label>설명:</label>
            <input v-model="group.description" type="text" placeholder="설명" />

            <label>종료 날짜:</label>
            <input v-model="group.endDate" type="date" />

            <label>이미지 URL:</label>
            <input v-model="group.imageUrl" type="text" placeholder="이미지 URL" />

            <label>리워드:</label>
            <input v-model.number="group.reward" type="number" placeholder="리워드 점수" />

            <h2>퀴즈 목록</h2>

            <!-- 퀴즈 목록 반복 렌더링 -->
            <div v-for="(quiz, quizIndex) in quizzes" :key="quizIndex">
                <h3>퀴즈 {{ quizIndex + 1 }}</h3>

                <label>퀴즈 제목:</label>
                <input v-model="quiz.title" type="text" placeholder="퀴즈 제목" />

                <label>퀴즈 타입:</label>
                <select v-model="quiz.type">
                    <option value="OX">OX퀴즈</option>
                    <option value="MCQ">다지선다퀴즈</option>
                </select>

                <div v-if="quiz.type === 'OX'">
                    <label>정답:</label>
                    <select v-model.number="quiz.correctAnswer">
                        <option :value="0">O</option>
                        <option :value="1">X</option>
                    </select>
                </div>
                <!-- 객관식 문제일 때만 보이는 선택지 입력 -->
                <div v-if="quiz.type === 'MCQ'">
                    <label>정답 번호:</label>
                    <input v-model.number="quiz.correctAnswer" type="number" placeholder="정답 번호" />
                    <h4>선택지</h4>
                    <div v-for="(choice, choiceIndex) in quiz.choices" :key="choiceIndex">
                        <label>선택지 {{ choiceIndex + 1 }}:</label>
                        <input v-model="choice.number" type="number" placeholder="번호" />
                        <input v-model="choice.text" type="text" placeholder="선택지 텍스트" />
                    </div>
                    <!-- 선택지 추가 버튼 -->
                    <button type="button" @click="addChoice(quizIndex)">선택지 추가</button>
                </div>

            </div>

            <!-- 퀴즈 추가 버튼 -->
            <button type="button" @click="addQuiz">퀴즈 추가</button>

            <!-- 제출 버튼 -->
            <button type="submit">제출</button>
        </form>

        <!-- 제출된 데이터 확인 -->
        <pre>{{ output }}</pre>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
    setup() {
        const group = ref({
            title: '',
            description: '',
            endDate: '',
            imageUrl: '',
            reward: 0
        });

        const quizzes = ref([
            {
                title: '',
                correctAnswer: 1,
                type: 'OX',
                choices: []
            }
        ]);

        const output = ref({});

        // 퀴즈 추가 함수
        const addQuiz = () => {
            quizzes.value.push({
                title: '',
                correctAnswer: 1,
                type: 'OX',
                choices: []
            });
        };

        // 선택지 추가 함수
        const addChoice = (quizIndex) => {
            quizzes.value[quizIndex].choices.push({
                number: quizzes.value[quizIndex].choices.length + 1,
                text: ''
            });
        };

        // 폼 제출 함수
        const handleSubmit = async () => {
            output.value = {
                group: group.value,
                quizzes: quizzes.value
            };
            try {
                const response = await axios.post('/api/quiz', output.value);
                console.log(response.data);
                alert('데이터가 성공적으로 전송되었습니다!');
            } catch (error) {
                console.error('데이터 전송 중 오류가 발생했습니다:', error);
                alert('데이터 전송 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        };

        return {
            group,
            quizzes,
            addQuiz,
            addChoice,
            handleSubmit,
            output
        };
    }
};
</script>

<style scoped>
/* 기본 스타일 */
label {
    display: block;
    margin: 10px 0 5px;
}

input,
select {
    padding: 5px;
    margin-bottom: 10px;
    width: 100%;
    max-width: 300px;
}

button {
    margin-top: 10px;
}

form {
    max-width: 500px;
}

pre {
    background-color: #f4f4f4;
    padding: 10px;
}
</style>