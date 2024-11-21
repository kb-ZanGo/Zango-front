<template>
  <Header :currentStep="currentStep" />
  <div class="honey-container">
    <HoneyTip1
      v-if="currentStep === 1"
      :currentStep="currentStep"
      @update-category="updateCategory"
    />
    <HoneyTip2 v-if="currentStep === 2" :currentStep="currentStep" @update-title="updateTitle" />
    <HoneyTip3
      v-if="currentStep === 3"
      :currentStep="currentStep"
      @update-content="updateContent"
    />
  </div>
  <Footer
    :currentStep="currentStep"
    :isFeedback="false"
    :isVerified="true"
    :isFormValid="isFormValid"
    @prev="prev"
    @next="next"
    @complete="complete"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { createHoneyTip } from '@/api/board';
import Header from '@/components/zzanda/header.vue';
import Footer from '@/components/zzanda/footer.vue';
import HoneyTip1 from '@/pages/side/HoneyTip1.vue';
import HoneyTip2 from '@/pages/side/HoneyTip2.vue';
import HoneyTip3 from '@/pages/side/HoneyTip3.vue';

const router = useRouter();
const currentStep = ref(1);
const bigCategoryId = ref(null);
const smallCategoryId = ref(null);
const title = ref('');
const content = ref('');
const userId = ref(1);

// 폼 유효성 검사
const isFormValid = computed(() => {
  if (currentStep.value === 1) {
    return bigCategoryId.value && smallCategoryId.value;
  } else if (currentStep.value === 2) {
    return title.value.trim().length > 0;
  } else if (currentStep.value === 3) {
    return content.value.trim().length > 0;
  }
  return true;
});

const updateCategory = (data) => {
  smallCategoryId.value = data.smallCategoryId;
  bigCategoryId.value = data.bigCategoryId;
};

const updateTitle = (data) => {
  title.value = data.title;
};

const updateContent = (data) => {
  content.value = data.content;
};

const prev = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  } else {
    router.push({ name: 'zzanda' });
  }
};

const next = () => {
  if (!isFormValid.value) {
    alert('필수 항목을 입력해주세요.');
    return;
  }
  if (currentStep.value < 3) {
    currentStep.value++;
  }
};

const complete = async () => {
  if (!isFormValid.value) {
    alert('필수 항목을 입력해주세요.');
    return;
  }

  try {
    const honeyTipData = {
      title: title.value,
      content: content.value,
      bigCategoryId: bigCategoryId.value,
      smallCategoryId: smallCategoryId.value,
      userId: 1,
    };

    console.log('전송할 데이터:', honeyTipData);
    await createHoneyTip(honeyTipData);

    alert('꿀팁이 성공적으로 등록되었습니다!');
    router.push({ name: 'zzanda' });
    currentStep.value = 1;
  } catch (error) {
    console.error('Error:', error);
    alert('게시글 등록에 실패했습니다.');
  }
};
</script>

<style scoped>
.honey-container {
  padding-top: 60px;
  padding-bottom: 80px;
  width: 90%;
  margin: 0 auto;
}
</style>
