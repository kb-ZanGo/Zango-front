<template>
  <div class="title">제목을 입력해주세요</div>
  <div class="subtitle">20자 이내로 작성해주세요</div>
  <div class="content">
    <input
      class="input"
      type="text"
      v-model="title"
      placeholder="내용을 입력해주세요."
      @input="updateTitle"
    />
  </div>
</template>

<script>
export default {
  name: 'GroupBuy1',
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      title: '',
    };
  },
  methods: {
    updateTitle() {
      this.$emit('update-title', {
        title: this.title,
      });
    },
  },
};
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
</style>
