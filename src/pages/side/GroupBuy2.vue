<template>
  <div class="title">공동구매 정보</div>
  <div class="subtitle">20자 이내로 작성해주세요</div>
  <div class="content">
    <input class="input" type="text" placeholder="공동구매 품목" />
    <input class="input" type="text" placeholder="모집 인원" />
    <input class="input" type="text" placeholder="참고 사이트" />
  </div>
  <div class="title2">카카오톡 오픈채팅</div>
  <div class="content">
    <input class="input" type="text" placeholder="오픈채팅 링크" />
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
