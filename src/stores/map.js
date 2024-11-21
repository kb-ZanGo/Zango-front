import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useMapStore = defineStore('map', {
  state: () => ({
    apiData: '',
    storeMarkers: ref([]),
    lat: 37.548138,
    lon: 127.073397,
    radius: 5,
    coalitionApiData: '',
    coalitionMarkers: ref([]),
  }),
  actions: {
    setLat(lat) {
      this.lat = lat;
    },
    setLon(lon) {
      this.lon = lon;
    },
    // store 정보 api 불러오기
    async getApi() {
      const url = `https://zango.site/api/v2/map?lat=${this.lat}&lon=${this.lon}&radius=${this.radius}`;
      try {
        const response = await axios.get(url);
        if (response.status === 200 && response.data.data.length > 0) {
          this.apiData = response.data.data; // 데이터를 상태에 저장
        } else {
          // console.log('else  ' + JSON.stringify(response.data.data));
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
        this.apiData = []; // aptData 초기화
      }
    },
    // 제휴정보
    async getCoalitionApi() {
      const url = `https://zango.site/api/coalition`;
      try {
        const response = await axios.get(url);
        if (response.status === 200 && response.data.length > 0) {
          this.coalitionApiData = response.data; // 데이터를 상태에 저장
        } else {
          // console.log('else  ' + JSON.stringify(response.data.data));
        }
      } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
        this.apiData = []; // aptData 초기화
      }
    },
    // 범위 밖 지점 마커 삭제
    removeOutOfBoundsMarkers(bounds) {
      this.storeMarkers.forEach((marker, index) => {
        const markerPosition = marker.getPosition();
        if (!bounds.hasLatLng(markerPosition)) {
          marker.setMap(null); // 범위 밖의 마커는 지도에서 제거
          this.storeMarkers.splice(index, 1); // 배열에서도 제거
        }
      });
    },
    // 범위 밖 제휴 마커 삭제
    removeOutOfBoundsMarkers2(bounds) {
      this.coalitionMarkers.forEach((marker, index) => {
        const markerPosition = marker.getPosition();
        if (!bounds.hasLatLng(markerPosition)) {
          marker.setMap(null); // 범위 밖의 마커는 지도에서 제거
          this.coalitionMarkers.splice(index, 1); // 배열에서도 제거
        }
      });
    },
    // 지점 마커 생성
    loadStoreMarkers(map, showLocationInfo) {
      const bounds = map.getBounds(); // 현재 지도 범위 가져오기

      // 범위 밖 마커 삭제 함수 호출
      this.removeOutOfBoundsMarkers(bounds);

      // 현재 범위에 없는 새로운 마커만 추가
      for (let i = 0; i < this.apiData.length; i++) {
        const location = this.apiData[i];
        const markerPosition = new naver.maps.LatLng(location.y, location.x);

        // 범위 내 마커만 추가
        if (bounds.hasLatLng(markerPosition)) {
          // 기존 마커가 이미 있으면 추가하지 않음
          const existingMarker = this.storeMarkers.find((marker) =>
            marker.getPosition().equals(markerPosition)
          );
          if (!existingMarker) {
            const markerOptions = {
              position: markerPosition,
              map: map,
              icon: {
                url: '/images/storeMarker1.png',
                scaledSize: new naver.maps.Size(65, 65),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(34, 70),
              },
            };
            const marker = new naver.maps.Marker(markerOptions);

            // 마커 클릭 이벤트
            new naver.maps.Event.addListener(marker, 'click', () => {
              showLocationInfo(location);
            });
            // 새로운 마커는 배열에 추가
            this.storeMarkers.push(marker);
          }
        }
      }
    },

    // 지점 마커 생성
    loadCoalitionMarkers(map, showLocationInfo) {
      const bounds = map.getBounds(); // 현재 지도 범위 가져오기

      // 범위 밖 마커 삭제 함수 호출
      this.removeOutOfBoundsMarkers2(bounds);

      // 현재 범위에 없는 새로운 마커만 추가
      for (let i = 0; i < this.coalitionApiData.length; i++) {
        const location = this.coalitionApiData[i];
        const markerPosition = new naver.maps.LatLng(
          location.lat,
          location.lon
        );
        const type = location.type;

        // 범위 내 마커만 추가
        if (bounds.hasLatLng(markerPosition)) {
          // 기존 마커가 이미 있으면 추가하지 않음
          const existingMarker = this.coalitionMarkers.find((marker) =>
            marker.getPosition().equals(markerPosition)
          );

          if (!existingMarker) {
            let iconUrl = '/images/gs.png'; // 기본 아이콘
            switch (type) {
              case 'gs':
                iconUrl = '/images/gs.png';
                break;
              case 'coffee':
                iconUrl = '/images/star.png';
                break;
              case 'olive':
                iconUrl = '/images/olive.png';
                break;
              case 'cgv':
                iconUrl = '/images/cgv.png';
                break;
              case 'cu':
                iconUrl = '/images/cu.png';
                break;
              default:
                console.error(`Unknown marker type: ${type}`);
            }
            const markerOptions = {
              position: markerPosition,
              map: map,
              icon: {
                url: iconUrl,
                scaledSize: new naver.maps.Size(50, 50),
                origin: new naver.maps.Point(0, 0),
                anchor: new naver.maps.Point(34, 70),
              },
            };
            const marker = new naver.maps.Marker(markerOptions);

            // 마커 클릭 이벤트
            new naver.maps.Event.addListener(marker, 'click', () => {
              showLocationInfo(location);
            });
            // 새로운 마커는 배열에 추가
            this.coalitionMarkers.push(marker);
          }
        }
      }
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
    // 거리 계산
    updateStoreMarkersIcon(currentLat, currentLng, map, checkInRange) {
      let isInRange = false;
      this.storeMarkers.forEach((marker, index) => {
        const markerPosition = marker.getPosition();
        const distance = this.getDistance(
          currentLat,
          currentLng,
          markerPosition.lat(),
          markerPosition.lng()
        );

        if (distance < 20) {
          // 반경 20m 내 일때 애니메이션 추가
          marker.setAnimation(naver.maps.Animation.BOUNCE);
          isInRange = true;
        } else {
          marker.setAnimation(null);
        }
      });
      checkInRange(isInRange);
    },
  },
});
