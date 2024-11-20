<template>
    <div class="container">
        <div class="diary">짠내나는 다이어리</div>
        <div class="goal">
            설정한 목표
            <progress
                class="progress"
                id="progress"
                value="30"
                min="0"
                max="100"
            ></progress>
        </div>
        <div class="card-wrapper">
            <div class="cards" ref="cards">
                <div v-for="(card, index) in cards" :key="index" class="card">
                    {{ card }}
                </div>
            </div>
        </div>
        <div class="list">
            꿀팁 리스트
            <button class="write-button" @click="toggleButtons">
                {{ showButtons ? 'X' : '글쓰기' }}
            </button>
            <div v-if="showButtons" class="extra-buttons">
                <button class="extra-button" @click="goToHoneyTip">꿀팁</button>
                <button class="extra-button" @click="goToGroupBuy">
                    공동구매
                </button>
                <button
                    class="extra-button"
                    @click="goToFeedBack"
                    style="font-size: 9px"
                >
                    피드백
                </button>
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
                        <span class="feedback-likes"
                            >👍 {{ item.likeCnt }}</span
                        >
                    </div>
                </div>
            </div>
            <div class="pagination">
                <button
                    class="page-btn"
                    @click="changePage(currentPage - 1)"
                    :disabled="currentPage === 1"
                >
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
            <iframe
                scrolling="yes"
                src="https://app.giftistar.net/category"
                id="giftistar"
            ></iframe>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            cards: ['게시글 1', '게시글 2', '게시글 3', '게시글 4', '게시글 5'], // 수정
            showButtons: false,
            feedbackList: [],
            currentPage: 1,
            itemsPerPage: 4,
            maxDisplayPages: 5,
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
            let start = Math.max(
                1,
                this.currentPage - Math.floor(this.maxDisplayPages / 2)
            );
            let end = start + this.maxDisplayPages - 1;

            if (end > this.totalPages) {
                end = this.totalPages;
                start = Math.max(1, end - this.maxDisplayPages + 1);
            }

            return Array.from({ length: end - start + 1 }, (_, i) => start + i);
        },
    },
    methods: {
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
                const response = await axios.get('/api/boards/feedback/list');
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
    min-height: 250px;
    box-sizing: border-box;
    flex: 1 1 48%;
    margin-top: 10px;
    position: relative;
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
}

.extra-button {
    width: 40px;
    height: 40px;
    margin-top: 8px;
    border-radius: 50%;
    background-color: #f5bb65;
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

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
}
</style>
