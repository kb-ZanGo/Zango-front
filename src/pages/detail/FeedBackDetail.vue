<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interaction from '@fullcalendar/interaction';
import Comment from '../side/Comment.vue';

const events = ref([]);
const board = ref({});
const formattedDate = ref('');
const regiDate = ref('');
const transactions = ref([]); // 클릭한 날짜의 트랜잭션 데이터를 저장
const incomeMon = ref('');
const outcomeMon = ref('');
const incomeDay = ref('');
const outcomeDay = ref('');
const router = useRouter();
const route = useRoute();
const boardId = route.params.boardId;
const feedbackData = ref(null);
const isEditing = ref(false);
const editTitle = ref('');
const editContent = ref('');
const myName = localStorage.getItem('username');

// 데이터를 가져오는 함수
const fetchData = async () => {
  try {
    const response = await axios.get(`https://zango.site/api/boards/feedback/${boardId}`);

    incomeMon.value = response.data.incomeMonthSum.toLocaleString();
    outcomeMon.value = response.data.outcomeMonthSum.toLocaleString();

    const ioCnts = response.data.ioCnts;
    board.value = response.data.board;
    regiDate.value = board.value.regiDate;

    formattedDate.value = formatDate(regiDate.value);

    const currentDate = ref(new Date());
    const currentMonth = currentDate.value.getMonth() + 1; // 0부터 시작
    ioCnts.forEach((item) => {
      const formattedDate = `${item.date.slice(0, 4)}-${item.date.slice(4, 6)}-${item.date.slice(
        6
      )}`;

      // incomeCnt 이벤트 추가
      if (item.incomeCnt >= 0) {
        events.value.push({
          title: `+${item.incomeCnt}`,
          date: formattedDate,
          class: 'income',
          textColor: 'blue',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        });

        // outcomeCnt 이벤트 추가
        if (item.outcomeCnt >= 0) {
          events.value.push({
            title: `-${item.outcomeCnt}`,
            date: formattedDate,
            class: 'outcome',
            textColor: 'red',
            backgroundColor: 'transparent',
            borderColor: 'transparent',
          });
        }
      }
    });
  } catch (error) {
    console.error('데이터를 가져오는 중 오류 발생:', error);
  }
};

function formatDate(regiDate) {
  const date = new Date(regiDate);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
}

// 클릭한 날짜의 데이터를 가져오는 함수
const fetchTransactions = async (selectedDate) => {
  try {
    const response = await axios.get(`/api/boards/feedback/${boardId}/${selectedDate}`);
    console.log(response.data);
    incomeDay.value = response.data.incomeDateSum;
    outcomeDay.value = response.data.outcomeDateSum;

    transactions.value = response.data.transactions.map((item) => {
      const formattedDate = `${item.trDay.slice(0, 4)}.${item.trDay.slice(4, 6)}.${item.trDay.slice(
        6
      )}
        ${item.trTime.slice(0, 2)}:${item.trTime.slice(2, 4)}:${item.trTime.slice(4)}`;
      const transactionType = item.trType === 1 ? '입금' : '출금';
      const formattedAmount = `${transactionType} ${item.amount.toLocaleString()}원`;

      return {
        date: formattedDate,
        name: item.trName,
        amount: formattedAmount,
        typeClass: item.trType === 1 ? 'income' : 'outcome',
      };
    });
  } catch (error) {
    console.error(error);
  }
};

// FullCalendar 옵션
const calendarOptions = ref({
  plugins: [dayGridPlugin, interaction],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev',
    center: 'title',
    right: 'next',
  },
  height: 600,
  locale: 'ko',
  dayHeaderContent: (arg) => {
    // 요일별 색상 설정
    const colors = {
      Sun: 'red', // 일요일
      Mon: 'black', // 월요일
      Tue: 'black', // 화요일
      Wed: 'black', // 수요일
      Thu: 'black', // 목요일
      Fri: 'black', // 금요일
      Sat: 'blue', // 토요일
    };

    return {
      html: `<span style="color: ${colors[arg.text] || 'black'};">${arg.text}</span>`,
    };
  },
  dayCellContent: (arg) => {
    return {
      html: `<span style="color: black; text-decoration: none;">${arg.date.getDate()}</span>`, // 날짜 텍스트에 검정색 적용
    };
  },
  events,
  dateClick: async (info) => {
    const selectedDate = info.dateStr.replace(/-/g, '');
    await fetchTransactions(selectedDate); // 클릭한 날짜의 데이터 가져오기
  },
});

const goBack = () => {
  router.push({ name: 'zzanda' });
};

// 게시물 삭제 함수 추가
const deletePost = async () => {
  if (confirm('정말 이 게시물을 삭제하시겠습니까?')) {
    try {
      await axios.delete(`https://zango.site/api/boards/feedback/${boardId}`);
      alert('게시물이 삭제되었습니다.');
      router.push({ name: 'zzanda' });
    } catch (error) {
      console.error('게시물 삭제 실패:', error);
      alert('게시물 삭제에 실패했습니다.');
    }
  }
};

const startEdit = () => {
  editTitle.value = board.value.title;
  editContent.value = board.value.content;
  isEditing.value = true;
};

const saveEdit = async () => {
  if (!editTitle.value.trim() || !editContent.value.trim()) {
    alert('제목과 내용을 모두 입력해주세요.');
    return;
  }

  try {
    const response = await axios.put(`https://zango.site/api/boards/feedback/${boardId}`, {
      title: editTitle.value,
      content: editContent.value,
    });

    // 수정된 데이터로 화면 업데이트
    board.value.title = editTitle.value;
    board.value.content = editContent.value;
    isEditing.value = false;
    alert('게시물이 수정되었습니다.');
  } catch (error) {
    console.error('게시물 수정 실패:', error);
    alert('게시물 수정에 실패했습니다.');
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="head">
    <div class="close">
      <button @click="goBack">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    </div>
    <div class="head-container">짠내나는 다이어리</div>
  </div>

  <div class="container">
    <div class="profile">
      <div class="profile-info">
        <div class="profile-left">
          <img src="@/assets/icons/profile.png" alt="프로필 이미지" class="profile-img" />
          <div class="user-info">
            <span class="username">{{ board.username }}</span>
            <span class="post-time">{{ formattedDate }}</span>
          </div>
        </div>
        <div class="action-buttons">
          <button class="edit" @click="startEdit" v-if="!isEditing && board.username === myName">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="edit" @click="saveEdit" v-if="isEditing">
            <i class="fa-solid fa-check"></i>
          </button>
          <button class="delete" @click="deletePost" v-if="board.username === myName">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="content">
      <div v-if="isEditing">
        <input v-model="editTitle" class="edit-title" placeholder="제목을 입력하세요" />
        <textarea
          v-model="editContent"
          class="edit-content"
          placeholder="내용을 입력하세요"
        ></textarea>
      </div>
      <div v-else>
        <div class="content-title">{{ board.title }}</div>
        <div class="content-text">{{ board.content }}</div>
      </div>
    </div>

    <div class="month-sum">
      <div class="in">
        <span class="inSumTitle">최근 입금 총액</span>
        <span class="inSum"> {{ incomeMon }} 원 </span>
      </div>
      <div class="out">
        <span class="outSumTitle">최근 출금 총액</span>
        <span class="outSum"> {{ outcomeMon }} 원 </span>
      </div>
    </div>

    <div class="calendar-container">
      <FullCalendar :options="calendarOptions" />
    </div>

    <!-- 클릭한 날짜의 트랜잭션 데이터 표시 -->
    <div v-if="incomeDay != 0 || outcomeDay != 0" class="whenClick">
      <div class="day-sum">
        <div class="today">
          {{ formattedDate.slice(0, 2) }}월 {{ formattedDate.slice(3, 5) }}일 거래내역
        </div>
        <div class="in">
          <span class="inSumTitle">입금 총액</span>
          <span class="inSum">{{ incomeDay.toLocaleString() }} 원</span>
        </div>
        <div class="out">
          <span class="outSumTitle">출금 총액</span>
          <span class="outSum">{{ outcomeDay.toLocaleString() }} 원</span>
        </div>
      </div>

      <div v-for="(transaction, index) in transactions" :key="index" class="transaction">
        <div class="date">{{ transaction.date }}</div>
        <div class="name">{{ transaction.name }}</div>
        <div class="amount" :class="transaction.typeClass">
          {{ transaction.amount }}
        </div>
      </div>
    </div>

    <div class="interaction">
      <div class="like">
        <span>👍</span>
        <span>좋아요</span>
      </div>
      <div class="comment">
        <span>💭</span>
        <span>댓글</span>
      </div>
    </div>

    <div class="comment-section">
      <Comment :boardId="boardId" />
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 80vh;
  overflow-y: auto;
}

.calendar-container {
  width: 100%;
  height: auto;
  padding: 20px 0px 0px 0px;
  margin-bottom: 15px;
}

.head {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close {
  position: absolute;
  left: 15px;
  top: 25px;
}

.close button {
  border: none;
  background-color: transparent;
}

.head-container {
  height: 70%;
  width: 40%;
  border: 2px solid #f5bb65;
  border-radius: 20px;
  text-align: center;
  font-weight: bold;
  padding-top: 18px;
}

.transaction {
  padding: 10px 0px;
  border-top: 1px solid #000000;
  border-bottom: 1px solid #000000;
}

.date {
  font-size: 0.8rem;
  margin: 10px 0px;
}

.name {
  font-weight: bold;
  font-size: 1.1rem;
}

.amount {
  text-align: right;
}

.whenClick .income {
  color: blue;
}

.whenClick .outcome {
  color: red;
}

.profile {
  padding: 10px 0px 0 0px;
}

.profile-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  font-size: 16px;
}

.post-time {
  font-size: 12px;
  color: #666;
}

.content {
  padding: 20px 0px 0px 0px;
}

.content-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.content-text {
  height: 200px;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 0px;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
  overflow-wrap: break-word;
}

.month-sum {
  background: #f9f0f0;
  margin-top: 20px;
  padding: 0px 6px;
  padding-top: 6px;
  width: 100%;
  height: 90px;
  border-radius: 10px;
}

.day-sum {
  background: #f9f0f0;
  margin-top: 35px;
  margin-bottom: 20px;
  padding: 0px 6px;
  padding-top: 13px;
  width: 100%;
  height: 130px;
  border-radius: 10px;
}

.today {
  padding: 0px 5px;
  font-size: 1.3rem;
}

.out,
.in {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  padding: 6px 5px;
}

.inSum {
  color: blue;
}

.outSum {
  color: red;
}

.interaction {
  display: flex;
  gap: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.like,
.comment {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
}

.comment-section {
  margin-top: 20px;
  padding: 0 10px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  align-items: center;
}

.edit,
.delete {
  border: none;
  background-color: transparent;
  color: #666;
  cursor: pointer;
  padding: 5px;
}

.edit:hover {
  color: #f5bb65;
}

.edit-title {
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.edit-content {
  width: 100%;
  height: 200px;
  font-size: 14px;
  line-height: 1.5;
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 10px;
  resize: none;
}
</style>
