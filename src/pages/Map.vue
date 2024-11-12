<template>
  <div id="map"></div>
  <Menu />
  <StoreInfo
    v-if="showModal"
    :location="selectedLocation"
    @close="closeModal"
  />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useMapStore } from '@/stores/Map';
import { useGpsStore } from '@/stores/Gps';
import Menu from '@/components/Menu.vue';
import StoreInfo from '@/components/StoreInfo.vue';
const mapStore = useMapStore();
const gpsStore = useGpsStore();
const showModal = ref(false);
const selectedLocation = ref(null); // 선택된 마커 정보
let map = ref();
let userMarker = ref();

onMounted(async () => {
  gpsStore.startWatchingLocation();
  // 네이버 지도 API 로드
  const script = document.createElement('script');
  script.src =
    'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=rethfjjakr';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = async () => {
    // 네이버 지도 생성
    map.value = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.5665, 126.978),
      zoom: 18,
    });
    // gps가 업데이트될 때마다 지도와 마커 위치를 업데이트
    watch([() => gpsStore.latitude, () => gpsStore.longitude], ([lat, lng]) => {
      if (lat && lng) {
        const userLatLng = new naver.maps.LatLng(lat, lng);
        // 사용자의 위치가 바뀔 때마다 지도 중심 이동
        map.value.setCenter(userLatLng);

        // 사용자 위치 마커가 없으면 새로 생성, 있으면 위치 업데이트
        if (!userMarker.value) {
          userMarker.value = new naver.maps.Marker({
            position: userLatLng,
            map: map.value,
          });
        } else {
          userMarker.value.setPosition(userLatLng);
        }
      }
    });
    // store정보 api 비동기처리
    await mapStore.getApi();
    mapStore.loadStoreMarkers(map.value, showLocationInfo);
  };
});

// 컴포넌트 언마운트 시 위치 추적 중지
onBeforeUnmount(() => {
  gpsStore.stopWatchingLocation();
});

// 마커 클릭 시 모달에 정보 표시
const showLocationInfo = (location) => {
  selectedLocation.value = location;
  showModal.value = true;
};

// 모달 닫기
const closeModal = () => {
  showModal.value = false;
};
</script>
<style>
#map {
  width: 100%;
  height: 90vh;
}
</style>
