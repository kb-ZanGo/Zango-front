<template>
    <div class="detail-container">
        <h2>꿀팁 상세보기</h2>
        <div v-if="honeyTipData" class="detail-content">
            <h3>{{ honeyTipData.title }}</h3>
            <div class="meta-info">
                <span>작성자: {{ honeyTipData.username }}</span>
                <span>👍 {{ honeyTipData.likeCnt }}</span>
                <span>👀 {{ honeyTipData.viewCnt }}</span>
            </div>
            <div class="content">
                {{ honeyTipData.content }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const boardId = route.params.boardId;
const honeyTipData = ref(null);

const fetchHoneyTipDetail = async () => {
    try {
        const response = await axios.get(`/api/boards/honeytip/${boardId}`);
        honeyTipData.value = response.data;
    } catch (error) {
        console.error('꿀팁 상세 정보 조회 실패:', error);
    }
};

onMounted(() => {
    fetchHoneyTipDetail();
});
</script>

<style scoped>
.detail-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.detail-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.meta-info {
    display: flex;
    gap: 15px;
    color: #666;
    margin: 10px 0;
    font-size: 0.9rem;
}

.content {
    margin-top: 20px;
    line-height: 1.6;
}
</style>
