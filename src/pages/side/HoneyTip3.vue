<template>
  <div class="title">내용을 입력해주세요</div>
  <div class="menus">
    <button type="button" class="btn btn-custom">
      <i class="fa-regular fa-image"></i>
    </button>
    <button type="button" class="btn btn-custom">
      <i class="fa-solid fa-video"></i>
    </button>
    <button type="button" class="btn btn-custom">
      <i class="fa-solid fa-t"></i>
    </button>
    <button type="button" class="btn btn-custom">
      <i class="fa-regular fa-face-smile"></i>
    </button>
    <button type="button" class="btn btn-custom">
      <i class="fa-solid fa-quote-left"></i>
    </button>
    <button type="button" class="btn btn-custom">
      <i class="fa-solid fa-minus"></i>
    </button>
    <button type="button" class="btn btn-custom">
      <i class="fa-solid fa-link"></i>
    </button>
    <button type="button" class="btn btn-custom">
      <i class="fa-solid fa-paperclip"></i>
    </button>
  </div>
  <div class="content">
    <textarea class="input" />
  </div>
</template>

<script setup></script>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 5px;
}

.menus {
  width: 100%;
  height: 5vh;
  margin-bottom: 20px;
}

.btn-custom {
  width: 14%;
  height: 10vh;
  background-color: white;
  border: none;
  font-size: 120%;
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
  height: 55vh;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 12px 10px 12px 10px;
  margin: 5px 0px;
  overflow-y: auto;
}
</style>
