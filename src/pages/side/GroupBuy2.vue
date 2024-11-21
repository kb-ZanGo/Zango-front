<template>
  <div class="title">공동구매 정보</div>
  <div class="content">
    <select v-model="selectedCategory" class="input" @change="submitData" required>
      <option value="">카테고리 선택</option>
      <option value="22">👕 의류공구</option>
      <option value="23">🍱 식품공구</option>
      <option value="24">🧴 생필품공구</option>
      <option value="25">📦 기타공구</option>
    </select>
    <input
      class="input"
      type="text"
      v-model="peopleLimit"
      placeholder="모집 인원"
      @input="submitData"
    />
    <input
      class="input"
      type="text"
      v-model="referenceSite"
      placeholder="참고 사이트"
      @input="submitData"
    />
  </div>
  <div class="title2">카카오톡 오픈채팅</div>
  <div class="content">
    <input
      class="input"
      type="text"
      v-model="kakaoLink"
      placeholder="오픈채팅 링크"
      @input="submitData"
    />
  </div>
</template>

<script>
const CATEGORY_NAMES = {
  22: '의류공구',
  23: '식품공구',
  24: '생필품공구',
  25: '기타공구',
};
export default {
  name: 'GroupBuy2',
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedCategory: '',
      peopleLimit: '',
      referenceSite: '',
      kakaoLink: '',
      userId: localStorage.getItem('userId'),
    };
  },
  methods: {
    submitData() {
      this.$emit('update-group-content', {
        groupBuyItem: CATEGORY_NAMES[this.selectedCategory],
        smallCategoryId: parseInt(this.selectedCategory),
        peopleLimit: parseInt(this.peopleLimit) || 0,
        referenceSite: this.referenceSite,
        kakaoLink: this.kakaoLink,
      });
    },
  },
  watch: {
    selectedCategory: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.submitData();
        }
      },
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

.title2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 25px;
}

.subtitle {
  font-size: 1rem;
  color: #888888d0;
  margin: 10px 0px;
  visibility: hidden;
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
