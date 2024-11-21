<template>
  <div class="container">
    <div class="diary">짠내나는 다이어리</div>
    <div class="goal">
      천원의 행복 ( {{ progressValue }}% )
      <progress class="progress" id="progress" :value="progressValue" min="0" max="100"></progress>
    </div>
    <div class="card-wrapper">
      <div class="cards" ref="cards">
        <div
          v-for="(card, index) in popularPosts"
          :key="`original-${card.honeyBoardId}`"
          class="card"
          @click="goToHoneyTipDetail(card.honeyBoardId)"
        >
          <div class="card-rank">{{ index + 1 }}위</div>
          <div class="card-title">{{ card.title }}</div>
          <div class="card-info">
            <span class="card-author">{{ card.username }}</span>
            <div class="card-stats">
              <span>👀 {{ card.viewCnt }}</span>
            </div>
          </div>
        </div>
        <div
          v-for="(card, index) in popularPosts"
          :key="`clone-${card.honeyBoardId}`"
          class="card"
          @click="goToHoneyTipDetail(card.honeyBoardId)"
        >
          <div class="card-rank">{{ index + 1 }}위</div>
          <div class="card-title">{{ card.title }}</div>
          <div class="card-info">
            <span class="card-author">{{ card.username }}</span>
            <div class="card-stats">
              <span>👀 {{ card.viewCnt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="category-group-wrapper">
        <div class="category-group">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="big_category"
            @click="handleCategoryClick(category.id)"
            :class="{ active: currentCategory === category.id }"
          >
            {{ category.name }}
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
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(tip, index) in currentPageHoneyTips"
              :key="tip.boardId"
              @click="viewDetail(tip.boardId)"
              :class="{ clicked: clickedRow === index }"
              @mousedown="handleRowClick(index)"
            >
              <td>{{ tip.smallCategoryName }}</td>
              <td>{{ tip.title }}</td>
              <td>{{ tip.userName }}</td>
              <td>
                {{ tip.regiDate.slice(0, 4) }}.{{ tip.regiDate.slice(5, 7) }}.{{
                  tip.regiDate.slice(8, 10)
                }}
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="no-data">게시글이 없습니다.</div>

        <div class="pagination honey-pagination">
          <button
            class="page-btn"
            @click="changeHoneyTipPage(honeyTipCurrentPage - 1)"
            :disabled="honeyTipCurrentPage === 1"
          >
            &lt;
          </button>
          <button
            v-for="pageNum in honeyTipDisplayedPages"
            :key="pageNum"
            class="page-btn"
            :class="{ active: honeyTipCurrentPage === pageNum }"
            @click="changeHoneyTipPage(pageNum)"
          >
            {{ pageNum }}
          </button>
          <button
            class="page-btn"
            @click="changeHoneyTipPage(honeyTipCurrentPage + 1)"
            :disabled="honeyTipCurrentPage === honeyTipTotalPages"
          >
            &gt;
          </button>
        </div>
      </div>
      <button class="write-button" @click="toggleButtons">
        {{ showButtons ? 'X' : '글쓰기' }}
      </button>
      <div class="extra-buttons" :class="{ show: showButtons }">
        <button class="extra-button" @click="goToHoneyTip">꿀팁</button>
        <button class="extra-button multi-line" @click="goToGroupBuy">공동<br />구매</button>
        <button class="extra-button" @click="goToFeedBack">피드백</button>
      </div>
    </div>
    <div class="feedback">
      <h4>소비습관 피드백</h4>
      <div class="feedback-list">
        <div
          v-for="item in currentPageItems"
          :key="item.feedBackId"
          class="feedback-item"
          @click="goToFeedBackDetail(item.feedBackId)"
        >
          <div class="feedback-title">{{ item.username }}</div>
          <div class="feedback-likes"></div>
          <div class="feedback-username">{{ item.title }}</div>
          <div class="feedback-date">{{ item.regiDate }}</div>
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
      cards: ['게시글 1', '게시글 2', '게시글 3', '게시글 4', '게시글 5'],
      showButtons: false,
      feedbackList: [],
      currentPage: 1,
      itemsPerPage: 5,
      maxDisplayPages: 5,
      clickedRow: null,
      popularPosts: [],
      progressValue: 0,
      categories: [
        { id: 1, name: '생활꿀팁' },
        { id: 2, name: '부업추천' },
        { id: 3, name: '할인 및 이벤트' },
        { id: 4, name: '여행꿀팁' },
        { id: 5, name: '재테크 팁' },
        { id: 6, name: '성공후기' },
        { id: 7, name: '공동구매' },
        { id: 8, name: '기타' },
      ],
      honeyTipCurrentPage: 1,
      honeyTipItemsPerPage: 5,
      maxHoneyTipDisplayPages: 5,
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
    honeyTipTotalPages() {
      return Math.ceil(this.honeyTips.length / this.honeyTipItemsPerPage);
    },
    currentPageHoneyTips() {
      const start = (this.honeyTipCurrentPage - 1) * this.honeyTipItemsPerPage;
      const end = start + this.honeyTipItemsPerPage;
      return this.honeyTips.slice(start, end);
    },
    honeyTipDisplayedPages() {
      let start = Math.max(
        1,
        this.honeyTipCurrentPage - Math.floor(this.maxHoneyTipDisplayPages / 2)
      );
      let end = start + this.maxHoneyTipDisplayPages - 1;

      if (end > this.honeyTipTotalPages) {
        end = this.honeyTipTotalPages;
        start = Math.max(1, end - this.maxHoneyTipDisplayPages + 1);
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
    async fetchPopularPosts() {
      try {
        const response = await axios.get('https://zango.site/api/boards/honeytip/popular');
        this.popularPosts = response.data; // 데이터 복제 제거
      } catch (error) {
        console.error('인기 게시글 조회 실패:', error);
      }
    },
    goToHoneyTipDetail(boardId) {
      this.$router.push(`/api/boards/honeytip/${boardId}`);
    },
    viewDetail(boardId) {
      this.$router.push(`/api/boards/honeytip/${boardId}`);
    },
    changeHoneyTipPage(page) {
      if (page >= 1 && page <= this.honeyTipTotalPages) {
        this.honeyTipCurrentPage = page;
      }
    },
  },
  mounted() {
    this.fetchHoneyTips(this.currentCategory);
    this.fetchFeedbackList();
    this.fetchPopularPosts();
    const storedPoint = localStorage.getItem('point');
    this.progressValue = storedPoint ? parseInt(storedPoint, 10) / 10 : 0;
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
  padding: 10px 0;
}

.cards {
  display: flex;
  gap: 15px;
  animation: slideCards 20s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
}

.card {
  flex: 0 0 auto;
  width: 200px;
  height: 150px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-rank {
  font-size: 1.1rem;
  font-weight: bold;
  color: #f5bb65;
}

.card-title {
  font-size: 0.95rem;
  font-weight: 500;
  margin: 8px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
}

.card-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
}

.card-author {
  color: #666;
  font-size: 0.8rem;
}

.card-stats {
  display: flex;
  gap: 8px;
  color: #666;
}

.feedback {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 350px;
  display: flex;
  flex-direction: column;
}

.feedback h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 16px;
}

.feedback-list {
  height: 250px;
  overflow-y: auto;
  margin-bottom: 2px;
  flex-grow: 1;
}

.feedback-item {
  display: grid;
  grid-template-columns: 2.5fr 0.5fr 0.8fr 1fr;
  gap: 10px;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
  height: 40px;
}

.feedback-item:hover {
  background-color: #f8f8f8;
}

.feedback-title {
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.feedback-likes,
.feedback-username {
  font-size: 13px;
  text-align: center;
  color: #666;
}

.feedback-date {
  font-size: 13px;
  text-align: right;
  color: #888;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 2px;
  padding-bottom: 0;
  height: 30px;
}

.page-btn {
  padding: 4px 8px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 3px;
  min-width: 30px;
  font-size: 13px;
}

.page-btn.active {
  background: #f5bb65;
  color: white;
  border-color: #f5bb65;
}

.page-btn:hover:not(:disabled) {
  background: #fff5e6;
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
  height: auto;
  min-height: 300px;
}

.category-group-wrapper {
  margin-bottom: 10px;
}

.category-group {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 0 8px;
  max-width: 800px;
  margin: 0 auto;
}

.category-group div:nth-child(1) {
  grid-area: 1 / 1;
}
.category-group div:nth-child(2) {
  grid-area: 1 / 2;
}
.category-group div:nth-child(3) {
  grid-area: 1 / 3;
}
.category-group div:nth-child(4) {
  grid-area: 1 / 4;
}

.category-group div:nth-child(5) {
  grid-area: 2 / 1;
}
.category-group div:nth-child(6) {
  grid-area: 2 / 2;
}
.category-group div:nth-child(7) {
  grid-area: 2 / 3;
}
.category-group div:nth-child(8) {
  grid-area: 2 / 4;
}

.big_category {
  padding: 10px 16px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #ddd;
  cursor: pointer;
  font-size: 14px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  white-space: nowrap;
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
  height: auto;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: visible;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  font-size: 15px;
  margin-bottom: 15px;
  background-color: #ffffff;
  border-radius: 5px;
}

thead {
  background-color: #ffffff;
  color: #333;
  border-bottom: 2px solid #f5bb65;
}

th {
  padding: 14px 12px;
  text-align: left;
  font-weight: 600;
  color: #333;
  font-size: 16px;
}

th:first-child {
  border-top-left-radius: 0;
}

th:last-child {
  border-top-right-radius: 0;
}

/* 컬럼 너비 조정 */
th:nth-child(1),
td:nth-child(1) {
  width: 22%;
}
th:nth-child(2),
td:nth-child(2) {
  width: 43%;
}
th:nth-child(3),
td:nth-child(3) {
  width: 20%;
}
th:nth-child(4),
td:nth-child(4) {
  width: 15%;
  text-align: center;
}

td {
  padding: 14px 12px;
  border-bottom: 1px solid #f0f0f0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
}

tbody tr {
  cursor: pointer;
  transition: all 0.2s ease;
  height: 45px;
}

tbody tr:hover {
  background-color: #fff5e6;
}

.honey-pagination {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 5px;
}

@media (max-width: 768px) {
  .board-list {
    padding: 12px;
  }

  table {
    font-size: 14px;
  }

  th,
  td {
    padding: 12px 8px;
    font-size: 14px;
  }

  tbody tr {
    height: 40px;
  }
}

@media (max-width: 480px) {
  .board-list {
    padding: 10px;
  }

  table {
    font-size: 13px;
  }

  th,
  td {
    padding: 10px 6px;
    font-size: 13px;
  }

  tbody tr {
    height: 35px;
  }
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #666;
}
.write-button {
  position: fixed;
  bottom: 85px;
  right: calc((100% - 1200px) / 2 + 30px);
  z-index: 100;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffd277;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 12px;
  color: #333;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
}

.write-button:hover {
  background-color: #ffdb94;
  transform: translateY(-2px);
}

.extra-buttons {
  position: fixed;
  bottom: 85px;
  right: calc((100% - 1200px) / 2 + 30px);
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s ease;
}

.extra-buttons.show {
  bottom: 135px;
  opacity: 1;
  pointer-events: auto;
}

.extra-button {
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  background-color: #f5bb65;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 13px;
  color: #333;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.3s ease;
}

.extra-buttons.show .extra-button {
  transform: translateY(0);
  opacity: 1;
}

.extra-buttons.show .extra-button:nth-child(1) {
  transition-delay: 0.1s;
}
.extra-buttons.show .extra-button:nth-child(2) {
  transition-delay: 0.2s;
}
.extra-buttons.show .extra-button:nth-child(3) {
  transition-delay: 0.3s;
}

.write-button:hover,
.extra-button:hover {
  background-color: #e09b46;
  transform: translateY(-2px);
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

@keyframes slideCards {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
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
  .card {
    width: 35vw;
    height: 45vw;
  }

  .card-rank {
    font-size: 1rem;
  }

  .card-title {
    font-size: 0.9rem;
  }

  .card-info {
    font-size: 0.7rem;
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
    font-size: 13.5px;
    padding: 8px 12px;
    height: 36px;
    border-radius: 7px;
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

  .feedback {
    max-height: 300px;
  }

  .feedback-list {
    height: 200px;
    margin-bottom: 2px;
  }

  .pagination {
    margin-top: 2px;
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
    font-size: 13px;
    padding: 6px 10px;
    height: 32px;
    border-radius: 6px;
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

.feedback-info {
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #666;
}

/* 스크롤바 스타일링 */
.feedback-list::-webkit-scrollbar {
  width: 6px;
}

.feedback-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.feedback-list::-webkit-scrollbar-thumb {
  background: #f5bb65;
  border-radius: 3px;
}

/* 모바일 반응형 */
@media (max-width: 768px) {
  .feedback {
    max-height: 300px;
  }

  .feedback-list {
    height: 200px;
  }

  .feedback-item {
    padding: 6px 8px;
    gap: 8px;
    height: 35px;
  }

  .page-btn {
    padding: 3px 6px;
    min-width: 25px;
    font-size: 12px;
  }
}

.honey-pagination {
  margin-top: 10px;
  padding-bottom: 5px;
}

@media (max-width: 768px) {
  .list {
    min-height: 180px;
  }
}

@media (max-width: 480px) {
  .list {
    min-height: 160px;
  }
}

/* 반응형 처리 추가 */
@media (max-width: 1200px) {
  .write-button {
    right: 30px; /* 화면이 작아질 때는 우측에서 30px 고정 */
    bottom: 85px; /* 하단 여백 유지 */
  }

  .extra-buttons {
    right: 30px; /* 화면이 작아질 때는 우측에서 30px 고정 */
    bottom: 135px; /* 하단 여백 유지 */
  }
}

@media (max-width: 768px) {
  .write-button {
    bottom: 85px; /* 모바일에서는 약간 더 위로 */
    right: 20px;
  }

  .extra-buttons {
    bottom: 135px; /* 모바일에서는 약간 더 위로 */
    right: 20px;
  }
}
</style>
