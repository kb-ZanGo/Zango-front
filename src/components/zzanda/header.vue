<template>
  <div class="header">
    <progress class="progress" id="progress" :value="progressValue" min="0" max="100"></progress>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
    default: 1,
  },
});

const progressValue = computed(() => {
  return props.currentStep * 33.33;
});
</script>

<style scoped>
.header {
  padding: 20px;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
}

#progress {
  width: 100%;
  height: 15px;
  appearance: none;
}

#progress::-webkit-progress-bar {
  background: #f0f0f0;
  border-radius: 15px;
  border: 1px solid #eeeeee;
  height: 15px;
  width: 100%;
}

#progress::-webkit-progress-value {
  background: #f5bb65;
  height: 15px;
  transition: width 0.5s ease-in-out;
}
</style>
