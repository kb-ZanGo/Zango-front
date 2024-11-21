<template>
  <div class="container">
    <div class="diary">짠내나는 다이어리</div>
    <div class="goal">
      설정한 목표
      <progress class="progress" id="progress" value="30" min="0" max="100"></progress>
    </div>
    <div class="card-wrapper">
      <div class="cards" ref="cards">
        <div v-for="(card, index) in cards" :key="index" class="card">
          {{ card }}
        </div>
      </div>
    </div>
    <div class="list">
      <div class="category-group-wrapper">
        <div class="category-group">
          <div
            class="big_category"
            @click="handleCategoryClick(1)"
            :class="{ active: currentCategory === 1 }"
          >
            생활꿀팁
          </div>
          <div
            class="big_category"
            @click="handleCategoryClick(2)"
            :class="{ active: currentCategory === 2 }"
          >
            부업추천
          </div>
          <div
            class="big_category"
            @click="handleCategoryClick(3)"
            :class="{ active: currentCategory === 3 }"
          >
            할인 및 이벤트
          </div>
          <div
            class="big_category"
            @click="handleCategoryClick(4)"
            :class="{ active: currentCategory === 4 }"
          >
            여행꿀팁
          </div>
          <div
            class="big_category"
            @click="handleCategoryClick(5)"
            :class="{ active: currentCategory === 5 }"
          >
            재테크 팁
          </div>
          <div
            class="big_category"
            @click="handleCategoryClick(6)"
            :class="{ active: currentCategory === 6 }"
          >
            성공후기
          </div>
          <div
            class="big_category"
            @click="handleCategoryClick(7)"
            :class="{ active: currentCategory === 7 }"
          >
            공동구매
          </div>
          <div
            class="big_category"
            @click="handleCategoryClick(8)"
            :class="{ active: currentCategory === 8 }"
          >
            피드백
          </div>
        </div>
      </div>
      <div class="board-list">
        <table v-if="honeyTips.length">
          <thead>
            <tr>
              <th>세부카테고리</th>
              <th>제목</th>
              <th>작성자</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(tip, index) in honeyTips"
              :key="index"
              @click="viewDetail(tip.boardId)"
              :class="{ clicked: clickedRow === index }"
              @mousedown="handleRowClick(index)"
            >
              <td>{{ tip.smallCategoryName }}</td>
              <td>{{ tip.title }}</td>
              <td>{{ tip.userName }}</td>
              <td>{{ tip.likeCnt }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="no-data">게시글이 없습니다.</div>
      </div>
      <button class="write-button" @click="toggleButtons">
        {{ showButtons ? 'X' : '글쓰기' }}
      </button>
      <div v-if="showButtons" class="extra-buttons">
        <button class="extra-button" @click="goToHoneyTip">꿀팁</button>
        <button class="extra-button" @click="goToGroupBuy">공동<br />구매</button>
        <button class="extra-button" @click="goToFeedBack" style="font-size: 9px">피드백</button>
      </div>
    </div>
    <div class="feedback">
      <h3>피드백 목록</h3>
      <div class="feedback-list">
        <div
          v-for="item in currentPageItems"
          :key="item.feedBackId"
          class="feedback-item"
          @click="goToFeedBackDetail(item.feedBackId)"
        >
          <div class="feedback-title">{{ item.title }}</div>
          <div class="feedback-info">
            <span class="feedback-date">{{ item.regiDate }}</span>
            <span class="feedback-likes">👍 {{ item.likeCnt }}</span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button class="page-btn" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
          &lt;
        </button>
        <button
          v-for="pageNum in displayedPages"
          :key="pageNum"
          class="page-btn"
          :class="{ active: currentPage === pageNum }"
          @click="changePage(pageNum)"
        >
          {{ pageNum }}
        </button>
        <button
          class="page-btn"
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          &gt;
        </button>
      </div>
    </div>
    <div class="gift">기프티스타</div>
    <div class="iframe-container">
      <iframe scrolling="yes" src="https://app.giftistar.net/category" id="giftistar"></iframe>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getHoneyTipList } from '@/api/board';

export default {
  data() {
    return {
      honeyTips: [],
      currentCategory: 1,
      cards: ['게시글 1', '게시글 2', '게시글 3', '게시글 4', '게시글 5'], // 수정
      showButtons: false,
      feedbackList: [],
      currentPage: 1,
      itemsPerPage: 4,
      maxDisplayPages: 5,
      clickedRow: null,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.feedbackList.length / this.itemsPerPage);
    },
    currentPageItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.feedbackList.slice(start, end);
    },
    displayedPages() {
      let start = Math.max(1, this.currentPage - Math.floor(this.maxDisplayPages / 2));
      let end = start + this.maxDisplayPages - 1;

      if (end > this.totalPages) {
        end = this.totalPages;
        start = Math.max(1, end - this.maxDisplayPages + 1);
      }

      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  },
  methods: {
    fetchHoneyTips(bigCategoryId) {
      getHoneyTipList(bigCategoryId)
        .then((data) => {
          console.log(data);
          this.honeyTips = data;
          console.log(this.honeyTips);
        })
        .catch((error) => {
          console.error('데이터 가져오기 실패: ', error);
        });
    },
    handleRowClick(index) {
      this.clickedRow = index;
      // 클릭 효과를 300ms 후에 제거
      setTimeout(() => {
        this.clickedRow = null;
      }, 300);
    },
    handleCategoryClick(categoryId) {
      this.currentCategory = categoryId;
      this.fetchHoneyTips(categoryId);
    },
    toggleButtons() {
      this.showButtons = !this.showButtons;
    },
    goToHoneyTip() {
      this.$router.push({ name: 'HoneyTip' });
    },
    goToGroupBuy() {
      this.$router.push({ name: 'GroupBuy' });
    },
    goToFeedBack() {
      this.$router.push({ name: 'FeedBack' });
    },
    goToFeedBackDetail(boardId) {
      this.$router.push({
        name: 'FeedBackDetail',
        params: { boardId: boardId },
      });
    },
    async fetchFeedbackList() {
      try {
        const response = await axios.get('https://zango.site/api/boards/feedback/list');
        this.feedbackList = response.data;
      } catch (error) {
        console.error('피드백 목록 조회 실패:', error);
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  mounted() {
    this.fetchHoneyTips(this.currentCategory);

    const cardsWrapper = this.$refs.cards;
    const cardsClone = cardsWrapper.cloneNode(true);
    cardsWrapper.parentElement.appendChild(cardsClone);
    this.fetchFeedbackList();
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 90vh;
  max-width: 1200px;
  margin: 0 auto;
  overflow: auto;
}

.diary {
  background-color: #f5bb65;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  margin-top: 8vw;
  margin-bottom: 5px;
  box-sizing: border-box;
  display: inline-block;
  font-size: 30px;
  white-space: nowrap;
  width: auto;
  overflow: hidden;
}

.goal {
  border-radius: 10px;
  padding-bottom: 20px;
  margin: 10px;
  display: flex;
  flex-direction: column;
}

#progress {
  width: 100%;
  height: 15px;
  margin-top: 5px;
  appearance: none;
}

#progress::-webkit-progress-bar {
  background: #f0f0f0;
  border-radius: 15px;
  border: 1px solid #eeeeee;
  height: 15px;
  width: 100%;
}

#progress::-webkit-progress-value {
  background: #f5bb65;
  height: 15px;
}

.card-wrapper {
  display: flex;
  position: relative;
  overflow: hidden;
  margin: 0 10px;
}

.cards {
  display: flex;
  animation: scrollCards 20s linear infinite;
}

.card {
  flex: 0 0 auto;
  width: 18vw;
  height: 15vw;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-right: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vw;
  border: none;
  box-sizing: border-box;
}

.feedback {
  padding: 15px;
}

.feedback-list {
  margin-top: 10px;
}

.feedback-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.feedback-title {
  font-size: 14px;
  font-weight: 500;
}

.feedback-info {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #666;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 15px;
}

.page-btn {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 3px;
}

.page-btn.active {
  background: #f5bb65;
  color: white;
  border-color: #f5bb65;
}

.page-btn:disabled {
  background: #f0f0f0;
  cursor: not-allowed;
}

.list {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 300px; /* list 크기 고정 (예: 300px) */
}

.category-group-wrapper {
  margin-bottom: 10px;
}

.category-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 0 4px;
}

.big_category {
  background-color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  height: 36px;
}
.big_category:hover {
  background-color: #fff5e6;
}

.big_category.active {
  background-color: #f5bb65;
  color: white;
}
.big_category:nth-child(6) {
  white-space: normal; /* "할인 및 이벤트" 두 줄로 설정 */
  word-break: break-word;
}

.board-list {
  height: 80%;
  overflow-y: auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 14px;
}

thead {
  background-color: #f5bb65;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
}

th {
  padding: 12px 8px;
  text-align: left;
  font-weight: bold;
}

/* 기본 컬럼 너비 설정 */
th:nth-child(1),
td:nth-child(1) {
  width: 25%; /* 세부카테고리 너비 증가 */
}
th:nth-child(2),
td:nth-child(2) {
  width: 40%;
}
th:nth-child(3),
td:nth-child(3) {
  width: 20%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 15%;
}

td {
  padding: 12px 8px;
  border-bottom: 1px solid #f0f0f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0; /* 추가: 텍스트가 넘치지 않도록 */
}

/* 세부카테고리 셀 특별 처리 */
td:first-child {
  font-size: 0.95em; /* 글자 크기 약간 축소 */
  letter-spacing: -0.3px; /* 자간 축소 */
}

tbody tr {
  cursor: pointer;
  transition: background-color 0.2s ease;
  position: relative;
}

tbody tr:hover {
  background-color: #fff5e6;
}

/* 클릭 효과 */
tbody tr.clicked {
  background-color: #fff5e6;
  transform: scale(0.995);
  transition: all 0.1s ease;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}
.write-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f5bb65;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 9px;
}

.write-button.active {
  background-color: #d3d3d3;
  color: black;
}

.extra-buttons {
  position: absolute;
  bottom: 60px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  z-index: 2;
}

.extra-button {
  width: 50px; /* write-button과 동일하게 설정 */
  height: 50px; /* write-button과 동일하게 설정 */
  padding: 0;
  border-radius: 50%;
  background-color: #f5bb65;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.2; /* 줄간격 조정 */
}
.write-button:hover,
.extra-button:hover {
  background-color: #e09b46;
}

.gift {
  padding: 10px;
  margin: 5px;
  margin-bottom: -27px;
  font-size: 19px;
}

.iframe-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  margin: 20px 0;
}

iframe {
  position: relative;
  top: -40px;
  width: 100%;
  height: 180%;
  border: none;
  overflow: auto;
}
.multi-line {
  font-size: 12px; /* 공동구매 글자 크기 약간 축소 */
  text-align: center;
  padding: 5px 0;
}

@keyframes scrollCards {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@media (max-width: 768px) {
  .diary {
    font-size: 20px;
  }

  .card {
    width: 35vw;
    height: 45vw;
    font-size: 7vw;
    margin-right: 5vw;
  }

  .list {
    min-height: 200px;
  }

  .iframe-container {
    height: 220px;
  }
  .category-group {
    gap: 6px;
  }

  .big_category {
    font-size: 13px;
    padding: 6px 10px;
    height: 32px;
  }
  table {
    font-size: 12px;
  }

  th,
  td {
    padding: 8px 4px;
  }

  /* 모바일에서의 컬럼 너비 조정 */
  th:nth-child(1),
  td:nth-child(1) {
    width: 28%;
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 37%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 20%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 15%;
  }

  .write-button,
  .extra-button {
    width: 45px;
    height: 45px;
    font-size: 12px;
  }

  .multi-line {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .diary {
    font-size: 18px;
  }

  .card {
    width: 45vw;
    height: 40vw;
    font-size: 5vw;
    margin-right: 5vw;
  }

  .list {
    min-height: 220px;
  }

  .iframe-container {
    height: 200px;
  }

  .category-group {
    gap: 4px;
  }

  .big_category {
    font-size: 12px;
    padding: 4px 8px;
    height: 28px;
  }
  table {
    font-size: 11px;
  }

  th,
  td {
    padding: 6px 3px;
  }

  th:nth-child(1),
  td:nth-child(1) {
    width: 30%; /* 세부카테고리 너비 최대로 증가 */
  }
  th:nth-child(2),
  td:nth-child(2) {
    width: 35%;
  }
  th:nth-child(3),
  td:nth-child(3) {
    width: 20%;
  }
  th:nth-child(4),
  td:nth-child(4) {
    width: 15%;
  }

  .write-button,
  .extra-button {
    width: 40px;
    height: 40px;
    font-size: 10px;
  }
}
</style>
