<template>
  <div class="comment-container">
    <!-- 댓글 입력 영역 -->
    <div class="comment-input">
      <textarea
        v-model="newComment"
        placeholder="댓글을 입력하세요"
        @keyup.enter="submitComment"
      ></textarea>
      <button @click="submitComment">등록</button>
    </div>

    <!-- 댓글 목록 -->
    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.commentId" class="comment">
        <div class="comment-header">
          <span class="username"> {{ comment.userName }}</span>
          <div class="comment-actions">
            <span class="date">{{ formatDate(comment.regiDate) }}</span>
            <button
              class="edit-btn"
              @click="startEdit(comment)"
              v-if="!comment.isEditing && comment.userName === myName"
            >
              수정
            </button>
            <button
              class="delete-btn"
              @click="deleteComment(comment.commentId)"
              v-if="comment.userName === myName"
            >
              ✕
            </button>
          </div>
        </div>
        <div v-if="!comment.isEditing" class="comment-content">
          {{ comment.content }}
        </div>
        <div v-else class="comment-edit">
          <textarea v-model="comment.editContent" class="edit-textarea"></textarea>
          <div class="edit-buttons">
            <button class="save-btn" @click="updateComment(comment)">저장</button>
            <button class="cancel-btn" @click="cancelEdit(comment)">취소</button>
          </div>
        </div>
        <div class="comment-footer">
          <button class="reply-button" @click="toggleReplies(comment)">
            답글 {{ comment.replies?.length || 0 }}개
          </button>
          <button
            class="like-button"
            @click="toggleLike(comment)"
            :class="{ liked: comment.isLiked }"
          >
            👍 {{ comment.likeCnt }}
          </button>
        </div>
        <div v-if="comment.showReplies" class="replies-section">
          <!-- 대댓글 목록 -->
          <div class="replies-list">
            <div v-for="reply in comment.replies" :key="reply.commentId" class="reply">
              <div class="reply-header">
                <span class="username">{{ reply.userName }}</span>
                <div class="reply-actions">
                  <span class="date">{{ formatDate(reply.regiDate) }}</span>
                  <button
                    class="edit-btn"
                    @click="startEdit(reply)"
                    v-if="!reply.isEditing && reply.userName === myName"
                  >
                    수정
                  </button>
                  <button
                    class="delete-btn"
                    @click="deleteComment(reply.commentId)"
                    v-if="reply.userName === myName"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div v-if="!reply.isEditing" class="reply-content">
                {{ reply.content }}
              </div>
              <div v-else class="reply-edit">
                <textarea v-model="reply.editContent" class="edit-textarea"></textarea>
                <div class="edit-buttons">
                  <button class="save-btn" @click="updateComment(reply)">저장</button>
                  <button class="cancel-btn" @click="cancelEdit(reply)">취소</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 대댓글 입력창 -->
          <div class="reply-input">
            <textarea v-model="comment.newReply" placeholder="답글을 입력하세요"></textarea>
            <button @click="submitReply(comment)">등록</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps({
  boardId: {
    type: [String, Number],
    required: true,
  },
});

const comments = ref([]);
const newComment = ref('');
const myName = localStorage.getItem('username');

// 댓글 목록 조회 함수 수정
const fetchComments = async () => {
  try {
    const response = await axios.get(`https://zango.site/api/comments/${props.boardId}`);
    const sortedComments = response.data.sort(
      (a, b) => new Date(b.regiDate) - new Date(a.regiDate)
    );

    // 각 댓글의 대댓글 수 조회 및 좋아요 상태 초기화
    for (const comment of sortedComments) {
      comment.isLiked = false; // 좋아요 상태 초기화
      try {
        const repliesResponse = await axios.get(
          `https://zango.site/api/comments/${comment.commentId}/replies`
        );
        comment.replies = repliesResponse.data;
      } catch (error) {
        console.error(`댓글 ${comment.commentId}의 대댓글 조회 실패:`, error);
        comment.replies = [];
      }
    }
    comments.value = sortedComments;
  } catch (error) {
    console.error('댓글 조회 실패:', error);
  }
};

// 댓글 작성
const submitComment = async () => {
  if (!newComment.value.trim()) return;

  try {
    await axios.post('https://zango.site/api/comments', {
      boardId: props.boardId,
      userId: 1, // userId 1로 고정
      parentCommentId: null,
      content: newComment.value,
    });

    newComment.value = ''; // 입력창 초기화
    await fetchComments(); // 댓글 목록 새로고침
  } catch (error) {
    console.error('댓글 작성 실패:', error);
  }
};

// 날짜 포맷팅
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${month}/${day} ${hours}:${minutes}`;
};

// 댓글 삭제 함수 추가
const deleteComment = async (commentId) => {
  try {
    await axios.delete(`https://zango.site/api/comments/${commentId}`);
    await fetchComments(); // 댓글 목록 새로고침
  } catch (error) {
    console.error('댓글 삭제 실패:', error);
  }
};

// 수정 관련 함수들 추가
const startEdit = (comment) => {
  comment.isEditing = true;
  comment.editContent = comment.content;
};

const cancelEdit = (comment) => {
  comment.isEditing = false;
  comment.editContent = comment.content;
};

const updateComment = async (comment) => {
  try {
    await axios.put(`https://zango.site/api/comments/${comment.commentId}`, {
      content: comment.editContent,
    });
    comment.isEditing = false;
    await fetchComments();
  } catch (error) {
    console.error('댓글 수정 실패:', error);
  }
};

// 대댓글 토글 함수 수정 (이미 replies가 있으므로 조회 불필요)
const toggleReplies = (comment) => {
  comment.showReplies = !comment.showReplies;
};

// 대댓글 작성 후 해당 댓글의 대댓글만 새로 조회
const submitReply = async (comment) => {
  if (!comment.newReply?.trim()) return;

  try {
    await axios.post('https://zango.site/api/comments', {
      boardId: props.boardId,
      userId: 1,
      parentCommentId: comment.commentId,
      content: comment.newReply,
    });

    // 해당 댓글의 대댓글만 새로 조회
    const repliesResponse = await axios.get(
      `https://zango.site/api/comments/${comment.commentId}/replies`
    );
    comment.replies = repliesResponse.data;
    comment.newReply = '';
  } catch (error) {
    console.error('대댓글 작성 실패:', error);
  }
};

// 좋아요 토글 함수 추가
const toggleLike = async (comment) => {
  try {
    if (!comment.isLiked) {
      await axios.post(`https://zango.site/api/comments/${comment.commentId}/like`);
      comment.likeCnt++;
    } else {
      await axios.post(`https://zango.site/api/comments/${comment.commentId}/unlike`);
      comment.likeCnt--;
    }
    comment.isLiked = !comment.isLiked;
  } catch (error) {
    console.error('좋아요 처리 실패:', error);
  }
};

onMounted(() => {
  fetchComments();
});
</script>

<style scoped>
.comment-container {
  margin-top: 20px;
}

.comment-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.comment-input textarea {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
  min-height: 60px;
}

.comment-input button {
  padding: 0 20px;
  background-color: #f5bb65;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.comment {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.username {
  font-weight: bold;
  font-size: 14px;
}

.date {
  color: #888;
  font-size: 12px;
}

.comment-content {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 8px;
}

.comment-footer {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.likes {
  font-size: 13px;
  color: #666;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 8px;
}

.reply-button {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 4px 12px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
}

.reply-button:hover {
  background-color: #f0f0f0;
}

.comment-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.delete-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 16px;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.delete-btn:hover {
  color: #666;
}

.edit-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 12px;
  padding: 0 5px;
}

.edit-btn:hover {
  color: #666;
}

.comment-edit {
  margin: 10px 0;
}

.edit-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 60px;
  margin-bottom: 8px;
}

.edit-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.save-btn,
.cancel-btn {
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.save-btn {
  background-color: #f5bb65;
  color: white;
}

.cancel-btn {
  background-color: #eee;
  color: #666;
}

.save-btn:hover {
  background-color: #f4a940;
}

.cancel-btn:hover {
  background-color: #ddd;
}

.reply-btn {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 12px;
  padding: 0 5px;
}

.reply-btn:hover {
  color: #666;
}

.replies-section {
  margin-top: 10px;
  margin-left: 20px;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 8px;
}

.reply {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.reply:last-child {
  border-bottom: none;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.reply-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.reply-content {
  font-size: 14px;
  color: #333;
  margin: 5px 0;
}

.reply-input {
  margin-top: 15px;
  display: flex;
  gap: 8px;
}

.reply-input textarea {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 40px;
}

.reply-input button {
  padding: 0 15px;
  background-color: #f5bb65;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  height: 40px;
}

.reply-input button:hover {
  background-color: #f4a940;
}

.reply-edit {
  margin: 10px 0;
}

.reply-edit .edit-textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 40px;
  margin-bottom: 8px;
}

.reply-edit .edit-buttons {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.reply .edit-btn {
  font-size: 12px;
  color: #999;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 5px;
}

.reply .edit-btn:hover {
  color: #666;
}

.like-button {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 13px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
}

.like-button:hover {
  color: #f5bb65;
}

.like-button.liked {
  color: #f5bb65;
}
</style>
