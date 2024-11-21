import axios from 'axios';

const BASE_URL = '/api/boards/honeytip';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createHoneyTip = async (honeyTipData) => {
  try {
    const requestData = {
      title: honeyTipData.title,
      content: honeyTipData.content,
      sc_id: honeyTipData.smallCategoryId,
      user_id: honeyTipData.userId,
      isGroupBuy: true,
      board_type: 1,
      groupBuyItem: honeyTipData.groupBuyItem,
      referenceSite: honeyTipData.referenceSite,
      peopleLimit: parseInt(honeyTipData.peopleLimit),
      kakaoLink: honeyTipData.kakaoLink,
    };

    console.log('전송할 데이터:', requestData);
    const response = await api.post('', requestData);
    return response.data;
  } catch (error) {
    console.error('API 에러:', error);
    throw error;
  }
};

export const getHoneyTipList = async (bigCategoryId) => {
  try {
    const response = await api.get(`/all/${bigCategoryId}`);
    return response.data;
  } catch (error) {
    console.error('API 호출 오류:', error);
    throw error;
  }
};

export const getHoneyTipDetail = async (boardId) => {
  try {
    const response = await api.get(`/${boardId}`);
    return response.data;
  } catch (error) {
    console.error('게시글 조회 실패:', error);
    throw error;
  }
};

export const updateHoneyTip = async (boardId, honeyTipData) => {
  try {
    const response = await api.put(`/${boardId}`, {
      ...honeyTipData,
      userId: 1,
    });
    return response.data;
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    throw error;
  }
};

export const deleteHoneyTip = async (boardId) => {
  try {
    const response = await api.delete(`/${boardId}`);
    return response.data;
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    throw error;
  }
};

export const getPopularHoneyTips = async () => {
  try {
    const response = await api.get('/popular');
    return response.data;
  } catch (error) {
    console.error('인기 게시글 조회 실패:', error);
    throw error;
  }
};
