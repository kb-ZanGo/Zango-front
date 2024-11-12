<script setup>
import { ref, computed } from 'vue';

// 현재 달의 날짜를 계산하는 함수
const getDaysInMonth = (year, month) => {
  const days = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  return days;
};

// 현재 날짜를 기준으로 날짜 배열 생성
const currentDate = ref(new Date());
const attendancePoints = ref({}); // 출석 포인트 저장용 객체

// 날짜별 상태 계산
const calendarDays = computed(() => {
  const days = getDaysInMonth(currentDate.value.getFullYear(), currentDate.value.getMonth());
  return days.map((day) => ({
    date: day,
    isPast: day < new Date(new Date().setHours(0, 0, 0, 0)),
    isToday: day.toDateString() === new Date().toDateString(),
    points: attendancePoints.value[day.toDateString()] || 0,
  }));
});

// 출석체크 함수
const checkAttendance = (day) => {
  if (day.isToday && !attendancePoints.value[day.date.toDateString()]) {
    const points = Math.floor(Math.random() * 30) + 1; // 1-30 포인트 랜덤 지급
    attendancePoints.value[day.date.toDateString()] = points;
    alert(`${points}포인트가 지급되었습니다!`);
  }
};
</script>

<template>
  <div class="top">
    <div class="top-container">
      <div class="text">
        <div class="sub-title">매일 매일 랜덤 스타포인트!</div>
        <div class="title">10/20/30번째엔 최대 5,000P</div>
        <div class="sub-title">2024.11.01 ~ 2024.11.30</div>
      </div>
      <div class="image">
        <img src="@/assets/icons/pigpig.png" class="pig" />
      </div>
      <div class="points">
        <div class="count">
          <span class="mini-title">용돈 받은 횟수</span>
          <span class="mini-content">1/30</span>
        </div>
        <div class="got-points">
          <span class="mini-title">내가 받은 스타포인트</span>
          <span class="mini-content">10P</span>
        </div>
        <hr />
        <div class="my-points">
          <span class="mini-title">보유중인 스타포인트</span>
          <span class="mini-content">10P</span>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="container">
      <div class="calendar">
        <div v-for="day in calendarDays" :key="day.date" class="cell-wrapper">
          <span :class="['date-number', { 'today-label': day.isToday }]">
            {{ day.isToday ? 'TODAY' : day.date.getDate() + '일' }}
          </span>
          <div
            :class="[
              'cell',
              {
                past: day.isPast,
                today: day.isToday,
                checked: day.points > 0,
              },
            ]"
          >
            <img
              v-if="day.isToday && !day.points"
              src="@/assets/icons/point.png"
              @click="checkAttendance(day)"
              class="check-img"
              alt="출석체크"
            />
            <div v-if="day.points" class="stamp-container">
              <img src="@/assets/icons/stamp.png" class="stamp-img" alt="출석완료" />
              <span class="stamp-points"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top {
  position: relative;
  display: flex;
  align-items: center;
}

.top-container {
  width: 100%;
  max-width: 400px;
  height: 500px;
  padding: 50px 10px 10px 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  background-color: #f5f2ee;
}

.container {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pig {
  width: 65%;
  display: block;
  margin: 0 auto;
}

.points {
  width: 80%;
  border-radius: 10px;
  background-color: #ffffff;
  margin: 0 auto;
  padding-top: 15px;
  padding-bottom: 10px;
}

.text {
  width: 80%;
  text-align: center;
  margin-bottom: 15px;
}

.image {
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.count,
.got-points,
.my-points {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px 5px 20px;
}

.mini-title {
  text-align: left;
}

.mini-content {
  text-align: right;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 15px 10px;
  width: 100%;
}

.cell-wrapper {
  position: relative;
  padding-top: 20px; /* 날짜 숫자를 위한 공간 */
}

.date-number {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9em;
  color: #333;
  padding: 2px;
  border-radius: 12px;
}

.today-label {
  background-color: #f5bb65;
  color: white;
  font-weight: bold;
  font-size: 0.8em;
  padding: 3px 8px 1px 8px;
}

.cell {
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid #ddd;
  border-radius: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.past {
  background-color: #e0e0e0;
  color: #666;
}

/* .today {
  border-color: #4caf50;
  background-color: #f0f7f0;
} */

.checked {
  background-color: #e8f5e9;
  border: none;
}

.check-img {
  width: 50%; /* 이미지 크기는 cell의 40%로 설정 */
  height: auto;
  cursor: pointer;
  transition: transform 0.2s;
}

.check-img:hover {
  transform: scale(1.1); /* 호버 시 약간 확대 효과 */
}

.stamp-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stamp-img {
  width: 99%;
  height: 99%;
}

.stamp-points {
  position: absolute;
  bottom: -2px;
  font-size: 0.8em;
  color: #4caf50;
  font-weight: bold;
}

.sub-title {
  text-align: center;
}

.title {
  text-align: center;
  font-size: 1.15em;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
