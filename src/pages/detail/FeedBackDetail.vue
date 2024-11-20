<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const boardId = route.params.boardId;

// boardId를 사용하여 상세 데이터를 가져오는 로직 구현
</script>
