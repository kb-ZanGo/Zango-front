import { ref } from 'vue';

// result 데이터를 중앙에서 관리
const resultData = ref(); // 초기 데이터는 빈 배열로 설정

// result 데이터를 가져오고 수정할 수 있는 Composable 함수
export function useResult() {
  
  // 결과 데이터 초기화 함수 (필요시 사용)
  const resetResult = () => {
    resultData.value = [];
  };

  // 결과 데이터를 설정하는 함수
  const setResultData = (newData) => {
    resultData.value = newData;
  };

  // 결과 데이터에 항목을 추가하는 함수
  const addResultItem = (item) => {
    resultData.value.push(item);
  };

  return {
    resultData, // 읽기 전용으로 사용할 수 있도록 노출
    setResultData,
    addResultItem,
    resetResult
  };
}
