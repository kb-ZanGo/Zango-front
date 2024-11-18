<template>
  <div class="title">장르는?</div>
  <div class="content">
    <button class="category">🍲한끼해결</button>
    <button class="category">🚶보험료</button>
    <button class="category">🤑공과금</button>
    <button class="category">💁‍♂️자취꿀팁</button>
    <button class="category">📞통신비</button>
    <button class="category">＄앱테크</button>
    <button class="category">👟리셀링</button>
    <button class="category">👨‍💻블로그체험단</button>
    <button class="category">👷‍♀️단기알바</button>
    <button class="category">👫멤버쉽</button>
    <button class="category">📢제휴할인</button>
    <button class="category">🍚외식</button>
    <button class="category">💳신규가입</button>
    <button class="category">🕺체험단</button>
    <button class="category">👋여행지원금</button>
    <button class="category">✈항공 및 숙소</button>
    <button class="category">💰투자</button>
    <button class="category">💵저축</button>
    <button class="category">✨목표금액달성</button>
    <button class="category">🎉부업성공</button>
  </div>
</template>

<script setup></script>

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
