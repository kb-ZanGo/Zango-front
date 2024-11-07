<script setup>
import { ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // 날짜 클릭을 위해 필요

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: [
    // 출석 기록을 여기에 표시
    { title: '출석완료', date: '2024-03-20', color: '#4CAF50' },
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: '',
  },
  // 날짜 셀 렌더링 커스텀
  dayCellDidMount: function (arg) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 과거 날짜 비활성화
    if (arg.date < today) {
      arg.el.classList.add('past-date');
      return;
    }

    // 오늘 날짜에만 버튼 추가
    if (arg.date.getTime() === today.getTime()) {
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'button-container';

      const buttonEl = document.createElement('button');
      buttonEl.innerHTML = '출석체크';
      buttonEl.className = 'attendance-button';

      // 이미 출석했는지 확인
      const isAlreadyChecked = calendarOptions.value.events.some(
        (event) => event.date === arg.dateStr
      );

      if (isAlreadyChecked) {
        buttonEl.innerHTML = '출석완료';
        buttonEl.disabled = true;
        buttonEl.className = 'attendance-button checked';
      } else {
        buttonEl.onclick = () => handleAttendanceCheck(arg.dateStr);
      }

      buttonContainer.appendChild(buttonEl);
      arg.el.querySelector('.fc-daygrid-day-frame').appendChild(buttonContainer);
    }
  },
});

// 포인트 가중치 설정 함수
function getWeightedRandomPoint() {
  // 1~30 포인트에 대한 가중치 배열 생성
  const weights = Array.from({ length: 30 }, (_, i) => {
    // 지수 함수를 사용하여 높은 포인트일수록 가중치가 급격히 감소
    return Math.exp(-0.2 * i);
  });

  // 가중치의 총합 계산
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

  // 0~1 사이의 랜덤 값 생성
  let random = Math.random() * totalWeight;

  // 가중치에 따라 포인트 선택
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return i + 1; // 1~30 포인트 반환
    }
  }

  return 1; // 기본값
}

// 출석체크 처리 함수 수정
async function handleAttendanceCheck(dateStr) {
  const earnedPoints = getWeightedRandomPoint();

  calendarOptions.value.events = [
    ...calendarOptions.value.events,
    {
      title: `출석완료 (+${earnedPoints}P)`,
      date: dateStr,
      color: '#4CAF50',
    },
  ];

  const button = document.querySelector('.attendance-button');
  if (button) {
    button.disabled = true;
    button.className = 'attendance-button checked';
    button.innerHTML = `출석완료 (+${earnedPoints}P)`;
  }

  alert(`출석체크 완료! ${earnedPoints}포인트가 지급되었습니다!`);

  // 여기에 서버로 출석 데이터와 포인트를 전송하는 API 호출을 추가
  // try {
  //   await saveAttendanceAndPoints(dateStr, earnedPoints);
  // } catch (error) {
  //   console.error('포인트 지급 중 오류 발생:', error);
  //   alert('포인트 지급 중 오류가 발생했습니다. 관리자에게 문의해주세요.');
  // }
}
</script>

<template>
  <div class="calendar-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<style scoped>
.calendar-container {
  width: 50%;
  height: 70%;
  padding: 20px;
}

/* 달력 셀 크기 고정 */
:deep(.fc-daygrid-day) {
  height: 80px !important; /* 원하는 높이로 조절 가능 */
}

:deep(.fc-daygrid-day-frame) {
  height: 100%;
  min-height: unset !important;
}

:deep(.fc-daygrid-day-events) {
  min-height: unset !important;
}

:deep(.fc-daygrid-body) {
  width: 100% !important;
}

:deep(.fc-daygrid-body table) {
  width: 100% !important;
}

/* :deep(.fc-scrollgrid-sync-table) {
  width: 100% !important;
} */

/* 기존 스타일 유지 */
:deep(.disabled-date) {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

:deep(.button-container) {
  padding: 4px;
  margin-top: 4px;
}

:deep(.attendance-button) {
  width: 100%;
  padding: 4px 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8em;
}

:deep(.attendance-button:hover) {
  background-color: #45a049;
}

:deep(.attendance-button.checked) {
  background-color: #cccccc;
  cursor: not-allowed;
}

:deep(.past-date) {
  background-color: #f5f5f5;
  opacity: 0.7;
}

:deep(.past-date .fc-daygrid-day-number) {
  color: #999;
}
</style>
