<template>
  <Header :currentStep="currentStep" />
  <div class="feedback-container">
    <FeedBack1
      v-if="currentStep === 1"
      :currentStep="currentStep"
      v-model:isVerified="isVerified"
      v-model:isFormValid="isFormValid"
      ref="feedback1Ref"
    />
    <FeedBack2 v-if="currentStep === 2" :currentStep="currentStep" />
    <FeedBack3 v-if="currentStep === 3" :currentStep="currentStep" />
  </div>
  <Footer
    :currentStep="currentStep"
    :isVerified="isVerified"
    :isFormValid="isFormValid"
    :isFeedback="true"
    @prev="prev"
    @next="next"
    @complete="complete"
    @verify="verifyAccount"
  />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
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

const complete = () => {
  router.push({ name: 'zzanda' });
  currentStep.value = 1;
};

const verifyAccount = () => {
  if (currentStep.value === 1 && feedback1Ref.value) {
    feedback1Ref.value.verifyAccount();
  }
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
