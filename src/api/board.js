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
