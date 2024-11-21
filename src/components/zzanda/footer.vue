<template>
    <div class="footer">
        <button class="prev-button" @click="$emit('prev')">이전</button>
        <button
            class="nav-button"
            :class="{ complete: currentStep === 3 }"
            @click="handleClick"
            :disabled="shouldDisableButton"
        >
            <template v-if="isFeedback && currentStep === 1">
                <template v-if="!isVerified">
                    <template v-if="isLoading">거래내역 확인중</template>
                    <template v-else>거래내역 연동</template>
                </template>
                <template v-else>다음</template>
            </template>
            <template v-else>
                {{ currentStep === 3 ? '게시물 작성' : '다음' }}
            </template>
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    currentStep: {
        type: Number,
        required: true,
        default: 1,
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    isFormValid: {
        type: Boolean,
        required: true,
        default: false,
    },
    isFeedback: {
        type: Boolean,
        required: false,
        default: false,
    },
});

const emit = defineEmits(['prev', 'next', 'complete', 'verify']);

// 버튼 비활성화 조건
const shouldDisableButton = computed(() => {
    if (!props.isFeedback) return false;
    return !props.isVerified && !props.isFormValid;
});

// 클릭 핸들러
const handleClick = () => {
    if (props.isFeedback && !props.isVerified) {
        emit('verify');
        return;
    }

    if (props.currentStep === 3) {
        emit('complete');
    } else {
        emit('next');
    }
};
</script>

<style scoped>
.footer {
    position: fixed;
    bottom: 9%;
    width: 100%;
    padding: 15px 20px 15px 20px;
    display: flex;
    justify-content: space-between;
    background-color: white;
}

.nav-button {
    padding: 12px 20px 8px 20px;
    border-radius: 5px;
    border: none;
    background-color: #f5bb65;
    color: white;
    cursor: pointer;
    font-size: 16px;
    width: 47%;
}

.nav-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.prev-button {
    padding: 12px 20px 8px 20px;
    border-radius: 5px;
    border: none;
    background-color: #ededed;
    color: #f5bb65;
    cursor: pointer;
    font-size: 16px;
    width: 47%;
}
</style>
