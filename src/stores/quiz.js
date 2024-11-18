import { defineStore } from 'pinia';

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quizCount: 0, // 현재 지급된 퀴즈 횟수
    lastReset: null, // 마지막으로 리셋된 날짜
  }),
  actions: {
    // 로컬 스토리지에서 상태 불러오기
    loadState() {
      const storedQuizCount = localStorage.getItem('quizCount');
      const storedLastReset = localStorage.getItem('lastReset');

      if (storedQuizCount !== null) {
        this.quizCount = parseInt(storedQuizCount, 10);
      }

      if (storedLastReset !== null) {
        this.lastReset = storedLastReset;
      }
    },

    // 퀴즈 횟수 초기화 (하루에 1번 지급)
    resetQuizCount() {
      const today = new Date().toLocaleDateString();
      if (this.lastReset !== today) {
        this.quizCount = 1;
        this.lastReset = today;

        // 로컬 스토리지에 저장
        localStorage.setItem('quizCount', this.quizCount);
        localStorage.setItem('lastReset', this.lastReset);
      }
    },

    // 추가 횟수 지급 (버튼 클릭 시)
    addQuizCount() {
      if (this.quizCount < 2) {
        this.quizCount++;
        // 로컬 스토리지에 업데이트
        localStorage.setItem('quizCount', this.quizCount);
      } else {
        throw new Error('이미 퀴즈 +1을 받으셨습니다.');
      }
    },
  },
});
