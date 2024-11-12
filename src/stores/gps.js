import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useGpsStore = defineStore('gps', {
  state: () => ({
    latitude: ref(null),
    longitude: ref(null),
    error: ref(null),
    watchId: null, // watchPosition ID 저장
  }),
  actions: {
    // 실시간 위치 추적
    startWatchingLocation() {
      if (navigator.geolocation) {
        this.watchId = navigator.geolocation.watchPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
          },
          (error) => {
            this.error = error.message;
          },
          { enableHighAccuracy: true }
        );
      } else {
        this.error = 'Geolocation을 지원하지 않습니다.';
      }
    },
    // 위치 추적 중단
    stopWatchingLocation() {
      if (this.watchId !== null) {
        navigator.geolocation.clearWatch(this.watchId);
        this.watchId = null;
      }
    },
  },
});
