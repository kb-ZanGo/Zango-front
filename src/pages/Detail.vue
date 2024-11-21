<template>
  <div class="head">
    <div class="close">
      <button>
        <i class="fa-solid fa-chevron-left"></i>
      </button>
    </div>
    <div class="head-container">짠내나는 다이어리</div>
  </div>

  <div class="container">
    <div class="profile">
      <div class="profile-info">
        <div class="profile-left">
          <img src="@/assets/icons/stamp.png" class="profile-img" />
          <div class="user-info">
            <div class="username">오늘점심미정</div>
            <div class="post-time">12/25 14:30</div>
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <h2 class="content-title">[성공후기] 부자 된 비법 공개한다</h2>
      <p class="content-text">
        이 책은 부자가 되고 싶어하는 조카의 모습을 보며 진지하게 부자 되는 비법이 무엇인지
        고민하다가 성장하는 아들에게 언젠가 전해주기 위해 정리한 도서이다. 오랜 기간 모은 다양한
        부자가 되는 비법에 대해 알아보자. 이 글은 소정의 광고료를 받아 제작된 글입니다
        https://www.yes24.com/Product/Goods/90405696
      </p>
      <div class="interaction">
        <div class="like">
          👍
          <span>25</span>
        </div>
        <div class="comment">
          💬
          <span>12</span>
        </div>
      </div>
    </div>

    <div class="comments">
      <div class="comment-item">
        <div class="comment-profile">
          <img src="@/assets/icons/stamp.png" class="comment-profile-img" />
          <div class="comment-info">
            <div class="comment-username">j0</div>
            <div class="comment-text">미정아 넌 나가라 그냥</div>
            <div class="like-reply">
              <div class="comment-time">12/25 15:30</div>
              <div class="reply-btn">답글달기</div>
            </div>
          </div>
        </div>
        <div class="reply-container">
          <div class="comment-item reply">
            <div class="comment-profile">
              <img src="@/assets/icons/stamp.png" class="comment-profile-img" />
              <div class="comment-info">
                <div class="comment-username">0j</div>
                <div class="comment-text">넌 남아라</div>
                <div class="like-reply">
                  <div class="comment-time">12/25 15:35</div>
                  <div class="reply-btn">답글달기</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="comment-item">
        <div class="comment-profile">
          <img src="@/assets/icons/stamp.png" class="comment-profile-img" />
          <div class="comment-info">
            <div class="comment-username">jj0</div>
            <div class="comment-text">퍼가요~</div>
            <div class="like-reply">
              <div class="comment-time">12/25 15:30</div>
              <div class="reply-btn">답글달기</div>
            </div>
          </div>
        </div>
        <div class="reply-container">
          <div class="comment-item reply">
            <div class="comment-profile">
              <img src="@/assets/icons/stamp.png" class="comment-profile-img" />
              <div class="comment-info">
                <div class="comment-username">j0</div>
                <div class="comment-text">너도 나가라 그냥</div>
                <div class="like-reply">
                  <div class="comment-time">12/25 15:35</div>
                  <div class="reply-btn">답글달기</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

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
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
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

.comments {
  padding: 5px 20px 20px 20px;
  border-radius: 10px;
  background-color: #f8f8f8;
}

.comment-item {
  padding: 15px 0px 15px 0px;
  border-bottom: 1px solid #eee;
}

.comment-profile {
  display: flex;
  gap: 10px;
}

.comment-profile-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.comment-info {
  flex: 1;
}

.comment-username {
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
}

.comment-text {
  font-size: 14px;
  margin-bottom: 5px;
}

.like-reply {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.comment-time {
  font-size: 12px;
  color: #666;
}

.reply-btn {
  font-size: 12px;
  color: #666;
  cursor: pointer;
}

.reply-container {
  margin-left: 40px;
  margin-top: 10px;
  padding-left: 15px;
}

.reply {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
}
</style>
