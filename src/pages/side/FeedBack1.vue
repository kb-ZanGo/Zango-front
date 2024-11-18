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
      />
      <input
        v-model="password"
        class="input"
        id="password"
        type="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <input
        v-model="accountNumber"
        class="input"
        id="accountNumber"
        type="text"
        placeholder="계좌번호를 입력해주세요."
      />
    </div>
  </template>
  <template v-else>
    <div class="success-container">
      <img src="@/assets/icons/accCheck.png" alt="계좌 확인" class="success-icon" />
      <p class="success-text">거래내역 연동 완료</p>
    </div>
  </template>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const userId = ref('');
const password = ref('');
const accountNumber = ref('');
const isLoading = ref(false);
const isVerified = ref(false);

const isFormValid = computed(() => {
  return (
    userId.value.trim() !== '' && password.value.trim() !== '' && accountNumber.value.trim() !== ''
  );
});

const emit = defineEmits(['update:isVerified', 'update:isFormValid']);

watch([userId, password, accountNumber], () => {
  emit('update:isFormValid', isFormValid.value);
});

const verifyAccount = () => {
  isLoading.value = true;

  setTimeout(() => {
    isLoading.value = false;
    isVerified.value = true;
    emit('update:isVerified', true);
  }, 3000);
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
</style>
