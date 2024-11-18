<template>
  <Header :currentStep="currentStep" />
  <div class="honey-container">
    <HoneyTip1 v-if="currentStep === 1" :currentStep="currentStep" />
    <HoneyTip2 v-if="currentStep === 2" :currentStep="currentStep" />
    <HoneyTip3 v-if="currentStep === 3" :currentStep="currentStep" />
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Header from '@/components/zzanda/header.vue';
import Footer from '@/components/zzanda/footer.vue';
import HoneyTip1 from '@/pages/side/HoneyTip1.vue';
import HoneyTip2 from '@/pages/side/HoneyTip2.vue';
import HoneyTip3 from '@/pages/side/HoneyTip3.vue';

const router = useRouter();
const currentStep = ref(1);

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
</script>

<style scoped>
.honey-container {
  padding-top: 60px;
  padding-bottom: 80px;
  width: 90%;
  margin: 0 auto;
}
</style>
