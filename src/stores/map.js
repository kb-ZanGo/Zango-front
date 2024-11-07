import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useMapStore = defineStore('map', {
  state: () => ({
    apiData: ref(''),
  }),
  actions: {
    // store 정보 api 불러오기
    async getApi() {
      const url = '/api/map';
      try {
        const response = await axios.get(url);
        if (response.status === 200 && response.data.length > 0) {
          this.apiData = response.data; // 데이터를 상태에 저장
        } else {
          console.log('else  ' + JSON.stringify(response.data));
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
        this.apiData = []; // aptData 초기화
      }
    },
    // 마커 생성
    loadMarkers(map) {
      for (let i = 0; i < this.apiData.length; i++) {
        const markerOptions = {
          position: new naver.maps.LatLng(this.apiData[i].y, this.apiData[i].x),
          map: map,
          icon: {
            url: '/images/storeMarker1.png',
            scaledSize: new naver.maps.Size(65, 65),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(34, 70),
          },
        };
        new window.naver.maps.Marker(markerOptions);
      }
    },
  },
});
