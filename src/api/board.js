import axios from 'axios';

const BASE_URL = '/api/boards/honeytip';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getHoneyTipList = (bigCategoryId) => {
  return api
    .get(`/all/${bigCategoryId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('api 호출 오류: ', error);
      throw error;
    });
};

// 게시글 상세 조회
export const getHoneyTipDetail = (boardId) => {
  return api
    .get(`/${boardId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error('게시글 조회 실패:', error);
      throw error;
    });
};
