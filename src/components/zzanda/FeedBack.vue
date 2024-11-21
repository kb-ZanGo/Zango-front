<template>
  <Header :currentStep="currentStep" />
  <div class="feedback-container">
    <FeedBack1
      v-if="currentStep === 1"
      :currentStep="currentStep"
      v-model:isVerified="isVerified"
      v-model:isFormValid="isFormValid"
      v-model:isLoading="isLoading"
      @update:transactions="updateTransactions"
      ref="feedback1Ref"
    />
    <FeedBack2 v-if="currentStep === 2" :currentStep="currentStep" @update:title="updateTitle" />
    <FeedBack3
      v-if="currentStep === 3"
      :currentStep="currentStep"
      @update:content="updateContent"
    />
  </div>
  <Footer
    :currentStep="currentStep"
    :isVerified="isVerified"
    :isFormValid="isFormValid"
    :isFeedback="true"
    :isLoading="isLoading"
    @prev="prev"
    @next="next"
    @complete="complete"
    @verify="verifyAccount"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Header from '@/components/zzanda/header.vue';
import Footer from '@/components/zzanda/footer.vue';
import FeedBack1 from '@/pages/side/FeedBack1.vue';
import FeedBack2 from '@/pages/side/FeedBack2.vue';
import FeedBack3 from '@/pages/side/FeedBack3.vue';

const router = useRouter();
const currentStep = ref(1);
const isVerified = ref(false);
const isFormValid = ref(false);
const feedback1Ref = ref(null);
const transactions = ref(null);
const title = ref('');
const content = ref('');
const isLoading = ref(false);

const prev = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  } else {
    router.push({ name: 'zzanda' });
  }
};

const next = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const complete = async () => {
  try {
    const requestData = {
      transactions: transactions.value,
      board: {
        user: {
          userId: 1, // 고정값
        },
        board_type: 2, // 고정값
        smallCategory: {
          scId: 26, // 고정값
        },
        title: title.value,
        content: content.value,
      },
    };

    await axios.post('https//zango.site/api/boards/feedback', requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    alert('게시물이 성공적으로 작성되었습니다.');
    router.push({ name: 'zzanda' });
    currentStep.value = 1;
  } catch (error) {
    console.error('게시물 작성 실패:', error);
    alert('게시물 작성에 실패했습니다.');
  }
};

const verifyAccount = () => {
  if (currentStep.value === 1 && feedback1Ref.value) {
    feedback1Ref.value.verifyAccount();
  }
};

const updateTransactions = (newTransactions) => {
  transactions.value = newTransactions;
};

const updateTitle = (newTitle) => {
  title.value = newTitle;
};

const updateContent = (newContent) => {
  content.value = newContent;
};
</script>

<style scoped>
.feedback-container {
  padding-top: 60px;
  padding-bottom: 80px;
  width: 90%;
  margin: 0 auto;
}
</style>
