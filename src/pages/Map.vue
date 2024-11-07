<template>
  <div id="map"></div>
  <Menu />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useMapStore } from '@/stores/Map';
import Menu from '@/components/Menu.vue';
const mapStore = useMapStore();

onMounted(async () => {
  // 네이버 지도 API 로드
  const script = document.createElement('script');
  script.src =
    'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=rethfjjakr';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = async () => {
    // 네이버 지도 생성
    const map = new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(
        37.519307558425844,
        126.92728444212815
      ),
      zoom: 18,
    });
    // store정보 api 비동기처리
    await mapStore.getApi();
    mapStore.loadMarkers(map);
  };
});
</script>
<style>
#map {
  width: 100%;
  height: 90vh;
}
</style>
