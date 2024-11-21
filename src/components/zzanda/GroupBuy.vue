<template>
  <Header :currentStep="currentStep" />
  <div class="groupbuy-container">
    <GroupBuy1 v-if="currentStep === 1" :currentStep="currentStep" @update-title="updateStep1" />
    <GroupBuy2
      v-if="currentStep === 2"
      :currentStep="currentStep"
      @update-group-content="updateStep2"
    />
    <GroupBuy3 v-if="currentStep === 3" :currentStep="currentStep" @update-content="updateStep3" />
  </div>
  <Footer
    :currentStep="currentStep"
    :isFeedback="false"
    :isVerified="true"
    :isFormValid="true"
    @prev="prev"
    @next="next"
    @complete="complete"
  />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { createHoneyTip } from '@/api/board';
import Header from '@/components/zzanda/header.vue';
import Footer from '@/components/zzanda/footer.vue';
import GroupBuy1 from '@/pages/side/GroupBuy1.vue';
import GroupBuy2 from '@/pages/side/GroupBuy2.vue';
import GroupBuy3 from '@/pages/side/GroupBuy3.vue';

const router = useRouter();
const currentStep = ref(1);

const formData = reactive({
  title: '',
  content: '',
  smallCategoryId: null,
  isGroupBuy: true,
  groupBuyItem: '',
  referenceSite: '',
  peopleLimit: 0,
  kakaoLink: '',
  userId: localStorage.getItem('userId') || 1,
});

const updateStep1 = (data) => {
  formData.title = data.title;
};

const updateStep2 = (data) => {
  formData.smallCategoryId = data.smallCategoryId;
  formData.groupBuyItem = data.groupBuyItem;
  formData.referenceSite = data.referenceSite;
  formData.peopleLimit = data.peopleLimit;
  formData.kakaoLink = data.kakaoLink;
};

const updateStep3 = (data) => {
  formData.content = data.content;
};

const complete = async () => {
  try {
    console.log('전송할 데이터:', formData);
    await createHoneyTip(formData);
    router.push({ name: 'zzanda' });
  } catch (error) {
    console.error('게시글 등록 실패:', error);
  }
};

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
</script>

<style scoped>
.groupbuy-container {
  padding-top: 60px;
  padding-bottom: 80px;
  width: 90%;
  margin: 0 auto;
}
</style>
