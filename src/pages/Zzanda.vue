<template>
  <div class="container">
    <div class="diary">짠내나는 다이어리</div>
    <div class="goal">설정한 목표</div>
    <div class="card-wrapper">
      <div class="cards" ref="cards">
        <div v-for="(card, index) in cards" :key="index" class="card">
          {{ card }}
        </div>
      </div>
    </div>
    <div class="list">피드백 목록</div>
    <div class="list">꿀팁 리스트</div>
    <div class="iframe-container">
      <iframe scrolling="yes" src="https://app.giftistar.net/category" id="giftistar"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: ['게시글 1', '게시글 2', '게시글 3', '게시글 4', '게시글 5'], // 수정
    };
  },
  mounted() {
    const cardsWrapper = this.$refs.cards;
    const cardsClone = cardsWrapper.cloneNode(true);
    cardsWrapper.parentElement.appendChild(cardsClone);
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.diary {
  background-color: #f5bb65;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  margin-top: 8vw;
  margin-bottom: 5px;
  box-sizing: border-box;
  display: inline-block;
  font-size: 30px;
  white-space: nowrap;
  width: auto;
  overflow: hidden;
}

.goal {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
}

.card-wrapper {
  display: flex;
  position: relative;
  overflow: hidden;
  margin: 0 10px;
}

.cards {
  display: flex;
  animation: scrollCards 15s linear infinite;
}

.card {
  flex: 0 0 auto;
  width: 18vw;
  height: 15vw;
  background-color: #f0f0f0;
  border-radius: 10px;
  margin-right: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vw;
  border: none;
  box-sizing: border-box;
}

.list {
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  height: 180px;
  box-sizing: border-box;
  flex: 1 1 48%;
  margin-top: 10px;
}

.iframe-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
  margin: 10px 0;
}

iframe {
  position: relative;
  top: -30px;
  width: 100%;
  height: 180%;
  border: none;
  overflow: auto;
}

@keyframes scrollCards {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

@media (max-width: 768px) {
  .diary {
    font-size: 20px;
  }

  .card {
    width: 35vw;
    height: 45vw;
    font-size: 7vw;
    margin-right: 5vw;
  }

  .list {
    height: 120px;
  }

  .iframe-container {
    height: 220px;
  }
}

@media (max-width: 480px) {
  .diary {
    font-size: 18px;
  }

  .card {
    width: 45vw;
    height: 40vw;
    font-size: 5vw;
    margin-right: 5vw;
  }

  .list {
    height: 40vw;
  }

  .iframe-container {
    height: 200px;
  }
}
</style>
