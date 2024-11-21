<template>
    <div class="title">정보를 입력해주세요</div>
    <template v-if="!isVerified">
        <div class="subtitle">정보를 입력해주세요</div>
        <div class="content">
            <input
                v-model="userId"
                class="input"
                id="userId"
                type="text"
                placeholder="id를 입력해주세요."
                :disabled="isLoading"
            />
            <input
                v-model="password"
                class="input"
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                :disabled="isLoading"
            />
            <input
                v-model="accountNumber"
                class="input"
                id="accountNumber"
                type="text"
                placeholder="계좌번호를 입력해주세요."
                :disabled="isLoading"
            />
        </div>
        <div v-if="isLoading" class="loading-overlay">
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <p class="loading-text">거래내역 연동중입니다...</p>
                <p class="loading-subtext">잠시만 기다려주세요</p>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="success-container">
            <img
                src="@/assets/icons/accCheck.png"
                alt="계좌 확인"
                class="success-icon"
            />
            <p class="success-text">거래내역 연동 완료</p>
        </div>
    </template>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import axios from 'axios';

const userId = ref('');
const password = ref('');
const accountNumber = ref('');
const isLoading = ref(false);
const isVerified = ref(false);

const isFormValid = computed(() => {
    return (
        userId.value.trim() !== '' &&
        password.value.trim() !== '' &&
        accountNumber.value.trim() !== ''
    );
});

const emit = defineEmits([
    'update:isVerified',
    'update:isFormValid',
    'update:isLoading',
]);

watch([userId, password, accountNumber], () => {
    emit('update:isFormValid', isFormValid.value);
});

const verifyAccount = async () => {
    emit('update:isLoading', true);
    try {
        const jsonData = {
            userId: userId.value,
            userPassword: password.value,
            userAccountNum: accountNumber.value,
        };

        const response = await axios.post(
            '/api/boards/feedback/login',
            jsonData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const transactions = response.data;
        if (transactions) {
            // transactions 데이터가 있을 때만 성공 처리
            emit('update:transactions', transactions);
            isVerified.value = true;
            emit('update:isVerified', true);
        }
    } catch (error) {
        console.error('거래내역 연동 실패:', error);
        alert('거래내역 연동에 실패했습니다. 다시 시도해주세요.');
    } finally {
        emit('update:isLoading', false);
    }
};

defineExpose({ verifyAccount });
</script>

<style scoped>
.title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 15px;
    margin-bottom: 25px;
}

.subtitle {
    font-size: 1rem;
    color: #888888d0;
    margin: 10px 0px;
}

.content {
    width: 100%;
    margin-bottom: 40px;
}

.input {
    width: 100%;
    height: 50px;
    border: 1px solid #000;
    border-radius: 10px;
    padding: 2px 10px 0px 10px;
    margin: 5px 0px;
}

.verify-button-container {
    margin-top: 20px;
    text-align: center;
}

.verify-button {
    padding: 14px 20px 10px 20px;
    background-color: #f5bb65;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
}

.verify-button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}

.success-container {
    margin-top: 100px;
    text-align: center;
}

.success-icon {
    width: 50%;
    height: 50%;
}

.success-text {
    color: #000000;
    margin-top: 30px;
    font-size: 1.4rem;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
}

.loading-content {
    background-color: white;
    padding: 30px 50px;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 100000;
}

.loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #f5bb65;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

.loading-text {
    color: #333;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 8px;
}

.loading-subtext {
    color: #666;
    font-size: 0.9rem;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
}
</style>
