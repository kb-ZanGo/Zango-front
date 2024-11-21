<template>
  <div class="title">장르는?</div>
  <div class="content">
    <button
      v-for="category in categories"
      :key="category.smallCategoryId"
      class="category"
      :class="{ selected: selectedCategory === category.smallCategoryId }"
      @click="selectCategory(category.smallCategoryId, category.bigCategoryId)"
    >
      {{ category.emoji + category.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'HoneyTip1',
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selectedCategory: null,
      userId: localStorage.getItem('userId'),
      categories: [
        { smallCategoryId: 1, bigCategoryId: 1, name: '한끼해결', emoji: '🍲' },
        { smallCategoryId: 2, bigCategoryId: 1, name: '보험료', emoji: '🚶' },
        { smallCategoryId: 3, bigCategoryId: 1, name: '공과금', emoji: '🤑' },
        { smallCategoryId: 4, bigCategoryId: 1, name: '통신비', emoji: '📞' },
        { smallCategoryId: 5, bigCategoryId: 1, name: '자취꿀팁', emoji: '💁‍♂️' },
        { smallCategoryId: 6, bigCategoryId: 2, name: '앱테크', emoji: '＄' },
        { smallCategoryId: 7, bigCategoryId: 2, name: '리셀링', emoji: '👟' },
        { smallCategoryId: 8, bigCategoryId: 2, name: '단기알바', emoji: '👷‍♀️' },
        { smallCategoryId: 9, bigCategoryId: 2, name: '블로그체험단', emoji: '👨‍💻' },
        { smallCategoryId: 10, bigCategoryId: 3, name: '신규가입', emoji: '💳' },
        { smallCategoryId: 11, bigCategoryId: 3, name: '멤버쉽', emoji: '👫' },
        { smallCategoryId: 12, bigCategoryId: 3, name: '제휴할인', emoji: '📢' },
        { smallCategoryId: 13, bigCategoryId: 3, name: '외식', emoji: '🍚' },
        { smallCategoryId: 14, bigCategoryId: 4, name: '공항', emoji: '💳' },
        { smallCategoryId: 15, bigCategoryId: 4, name: '체험단', emoji: '🕺' },
        { smallCategoryId: 16, bigCategoryId: 4, name: '여행지원금', emoji: '👋' },
        { smallCategoryId: 17, bigCategoryId: 4, name: '항공 및 숙소', emoji: '✈' },
        { smallCategoryId: 18, bigCategoryId: 5, name: '저축', emoji: '💰' },
        { smallCategoryId: 19, bigCategoryId: 5, name: '투자', emoji: '💵' },
        { smallCategoryId: 20, bigCategoryId: 6, name: '목표금액달성', emoji: '✨' },
        { smallCategoryId: 21, bigCategoryId: 6, name: '부업성공', emoji: '🎉' },
        { smallCategoryId: 22, bigCategoryId: 7, name: '의류공구', emoji: '🎉' },
        { smallCategoryId: 23, bigCategoryId: 7, name: '식품공구', emoji: '🎉' },
        { smallCategoryId: 24, bigCategoryId: 7, name: '생필품공구', emoji: '🎉' },
        { smallCategoryId: 25, bigCategoryId: 7, name: '기타공구', emoji: '🎉' },
        { smallCategoryId: 26, bigCategoryId: 8, name: '피드백', emoji: '🎉' },
      ],
    };
  },
  methods: {
    selectCategory(smallCategoryId, bigCategoryId) {
      this.selectedCategory = smallCategoryId;
      this.$emit('update-category', {
        smallCategoryId,
        bigCategoryId,
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

.category {
  width: auto;
  height: 50px;
  border: none;
  border-radius: 30px;
  padding: 5px 15px;
  margin: 5px 5px;
  background-color: #f5f5f5;
  font-size: 0.9rem;
}

.category:hover {
  background-color: #f5bb65;
  color: white;
}

.category.selected {
  background-color: #f5bb65;
  color: white;
}

.subtitle {
  font-size: 1rem;
  color: #888888d0;
  margin: 10px 0px;
}

.content {
  width: 100%;
  margin-bottom: 40px;
  text-align: center;
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
