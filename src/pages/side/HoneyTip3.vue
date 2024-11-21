<template>
  <div class="title">내용을 입력해주세요</div>
  <div class="subtitle">상세한 내용을 입력해주세요</div>
  <div class="content">
    <textarea
      v-model="content"
      class="input"
      placeholder="내용을 입력해주세요."
      @input="updateContent"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'HoneyTip3',
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      content: '',
      userId: localStorage.getItem('userId'),
    };
  },
  methods: {
    updateContent() {
      this.$emit('update-content', {
        content: this.content,
        userId: this.userId,
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
  height: 200px;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 10px;
  margin: 5px 0px;
  resize: none;
}
</style>
