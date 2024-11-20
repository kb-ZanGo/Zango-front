<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const boardId = route.params.boardId;
const feedbackData = ref(null);

const fetchFeedbackDetail = async () => {
    try {
        const response = await axios.get(`/api/boards/feedback/${boardId}`);
        feedbackData.value = response.data;
    } catch (error) {
        console.error('피드백 상세 정보 조회 실패:', error);
    }
};

onMounted(() => {
    fetchFeedbackDetail();
});
</script>
