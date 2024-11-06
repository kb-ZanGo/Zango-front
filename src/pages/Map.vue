<template>
  <div id="map"></div>
  <Menu />
</template>

<script setup>
import { onMounted } from 'vue';
import Menu from '@/components/Menu.vue';

onMounted(() => {
  // 네이버 지도 API 로드
  const script = document.createElement('script');
  script.src =
    'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=rethfjjakr';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = () => {
    // 네이버 지도 생성
    new window.naver.maps.Map('map', {
      center: new window.naver.maps.LatLng(37.5670135, 126.978374),
      zoom: 12,
    });
  };
});
</script>
<style>
#map {
  width: 618px;
  height: 720px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}
</style>
