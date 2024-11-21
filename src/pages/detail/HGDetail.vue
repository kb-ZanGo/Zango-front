<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Comment from '@/pages/side/Comment.vue';

const route = useRoute();
const router = useRouter();
const boardId = route.params.boardId;
const board = ref({});
const formattedDate = ref('');
const regiDate = ref('');

const fetchData = async () => {
  try {
    const response = await axios.get(`https://zango.site/api/boards/honeytip/${boardId}`);
    board.value = response.data;
    regiDate.value = response.data.regiDate;
  } catch (error) {
    console.log('에러에러에러: ', error);
  }
};

const goBack = () => {
  router.push({ name: 'zzanda' });
};

onMounted(fetchData);
</script>

<template>
  <div class="head">
    <div class="close">
      <button @click="goBack">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    </div>
    <div class="head-container">짠내나는 다이어리</div>
  </div>

  <div class="container">
    <div class="profile">
      <div class="profile-info">
        <div class="profile-left">
          <img src="@/assets/icons/profile-image.png" class="profile-img" />
          <div class="user-info">
            <div class="username">{{ board.userName }}</div>
            <div class="post-time">
              {{ regiDate.slice(5, 7) }}/{{ regiDate.slice(8, 10) }} {{ regiDate.slice(11, 13) }}:{{
                regiDate.slice(14, 16)
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <h2 class="content-title">[{{ board.smallCategoryName }}] {{ board.title }}</h2>
      <div v-if="board.groupBuyItem !== null" class="groupBuy-container">
        <div class="GBItem-container">
          <div class="GBItem">
            {{ board.groupBuyItem }}
          </div>
          <div class="GBPeople">공구인원: {{ board.peopleLimit }}명</div>
        </div>
        <div class="refSite">
          <a :href="board.referenceSite" class="link"> 🔗 참고사이트 </a>
        </div>
        <div class="kakaoLink">
          <a :href="board.kakaoLink" class="link">
            <img src="@/assets/icons/kakao.png" class="link-image" />
            오픈채팅 링크
          </a>
        </div>
      </div>
      <p class="content-text">
        {{ board.content }}
      </p>
      <div class="interaction">
        <div class="like">👍{{ board.likeCnt }}</div>
        <div class="comment">💬{{ board.commentCnt }}</div>
      </div>
    </div>

    <div class="comments-section">
      <Comment :boardId="boardId" />
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 80vh;
  overflow-y: auto;
}

.head {
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close {
  position: absolute;
  left: 15px;
  top: 25px;
}

.close button {
  border: none;
  background-color: transparent;
}

.head-container {
  height: 70%;
  width: 40%;
  border: 2px solid #f5bb65;
  border-radius: 20px;
  text-align: center;
  font-weight: bold;
  padding-top: 13px;
}

.profile {
  padding: 10px 0px 0 0px;
}

.profile-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.groupBuy-container {
  background-color: #f1f1f1;
  border-radius: 10px;
  overflow-x: hidden;
  margin-bottom: 15px;
  padding: 10px 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  font-size: 16px;
}

.post-time {
  font-size: 12px;
  color: #666;
}

.content {
  padding: 20px 0px 0px 0px;
}

.content-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.content-text {
  height: 200px;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 0px;
  border: 1px solid #000000;
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
  overflow-wrap: break-word;
}

.interaction {
  display: flex;
  gap: 20px;
  padding: 15px 0;
}

.like,
.comment {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
}

.GBItem-container {
  display: flex;
  justify-content: space-between;
}

.GBItem,
.GBPeople {
  font-weight: 500;
  margin-bottom: 5px;
}

.refSite,
.kakaoLink {
  font-size: 0.9rem;
}

.comments-section {
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  margin-top: 20px;
}

.link {
  color: #564a4a;
  text-decoration: none;
}

.link-image {
  width: 17px;
  margin-right: 5px;
}
</style>
