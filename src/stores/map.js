import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useMapStore = defineStore('map', {
  state: () => ({
    apiData: ref(''),
    storeMarkers: ref([]), // 고정 마커들을 저장
  }),
  actions: {
    // store 정보 api 불러오기
    async getApi() {
      const url = '/api/map';
      try {
        const response = await axios.get(url);
        if (response.status === 200 && response.data.data.length > 0) {
          this.apiData = response.data.data; // 데이터를 상태에 저장
        } else {
          console.log('else  ' + JSON.stringify(response.data.data));
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
        this.apiData = []; // aptData 초기화
      }
    },
    // 지점 마커 생성
    loadStoreMarkers(map, showLocationInfo) {
      this.storeMarkers = this.apiData.map((location) => {
        const markerOptions = {
          position: new naver.maps.LatLng(location.y, location.x),
          map: map,
          icon: {
            url: '/images/storeMarker1.png',
            scaledSize: new naver.maps.Size(65, 65),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(34, 70),
          },
        };
        const marker = new naver.maps.Marker(markerOptions);
        new window.naver.maps.Event.addListener(marker, 'click', () => {
          showLocationInfo(location);
        });
        return marker;
      });
    },
    // 두 좌표 간 거리 계산 (Haversine 공식)
    getDistance(lat1, lon1, lat2, lon2) {
      const R = 6371e3; // 지구 반경 (미터)
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c; // 거리 반환 (미터)
    },
    // 실시간 마커와 고정 마커의 거리 비교
    updateStoreMarkersIcon(currentLat, currentLng, map) {
      const currentBounds = map.getBounds(); // 현재 화면에 보이는 영역의 경계
      this.storeMarkers.forEach((marker, index) => {
        const markerPosition = marker.getPosition();
        if (currentBounds.hasLatLng(markerPosition)) {
          const distance = this.getDistance(
            currentLat,
            currentLng,
            markerPosition.lat(),
            markerPosition.lng()
          );

          if (distance < 100) {
            // 반경 m단위
            marker.setAnimation(naver.maps.Animation.BOUNCE);
          } else {
            marker.setAnimation(null);
          }
        }
      });
    },
  },
});
