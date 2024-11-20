<template>
  <div id="map"></div>
  <!-- <Menu /> -->
  <StoreInfo
    v-if="showModal"
    :location="selectedLocation"
    :isInRange="isInRange"
    @close="closeModal"
  />
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useMapStore } from '@/stores/map';
import { useGpsStore } from '@/stores/gps';
import Menu from '@/components/Menu.vue';
import StoreInfo from '@/components/StoreInfo.vue';

const mapStore = useMapStore();
const gpsStore = useGpsStore();
const showModal = ref(false);
const isInRange = ref(false);
const selectedLocation = ref(null); // 선택된 마커 정보
const map = ref();
const userMarker = ref();
const buttonState = ref(true);
const locationBtn =
  '<img src="/images/center.png" alt="Location Button" style="width: 70px; height: 70px;">';
let isMapCentered = false;

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
      center: new naver.maps.LatLng(gpsStore.latitude, gpsStore.longitude),
      zoom: 19,
      minZoom: 15, // 최소 줌 레벨
      mapTypeControl: true,
    });
    // 마커 첫 위치
    const userLatLng = new naver.maps.LatLng(
      gpsStore.latitude,
      gpsStore.longitude
    );
    userMarker.value = new naver.maps.Marker({
      position: userLatLng,
      map: map.value,
    });
    // 중심위치로 이동하는 컨트롤 버튼
    naver.maps.Event.once(map.value, 'init', function () {
      //customControl 객체 이용하기
      const customControl = new naver.maps.CustomControl(locationBtn, {
        position: naver.maps.Position.LEFT_BOTTOM,
      });
      customControl.setMap(map.value);

      naver.maps.Event.addDOMListener(
        customControl.getElement(),
        'click',
        function () {
          map.value.setZoom(18);
          const userLatLng = new naver.maps.LatLng(
            gpsStore.latitude,
            gpsStore.longitude
          );
          map.value.setCenter(userLatLng);
          buttonState.value = true;
          console.log('true');
        }
      );
    });

    // buttonState가 true일때만 gps가 업데이트될 때마다 지도와 마커 위치를 업데이트(포켓몬고 모드)
    watch(
      () => buttonState.value, // buttonState의 변화를 감지
      (newState) => {
        if (buttonState.value) {
          // 실시간 위치 추적 및 지도 중심 이동
          watch(
            [() => gpsStore.latitude, () => gpsStore.longitude],
            ([lat, lng]) => {
              if (lat && lng) {
                const userLatLng = new naver.maps.LatLng(lat, lng);
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

                // 고정 마커와 실시간 마커 거리 비교 및 아이콘 변경
                mapStore.updateStoreMarkersIcon(
                  lat,
                  lng,
                  map.value,
                  checkInRange
                );
              }
            }
          );
        } else {
          // 실시간 추적이 꺼졌을 때
          watch(
            [() => gpsStore.latitude, () => gpsStore.longitude],
            ([lat, lng]) => {
              if (lat && lng) {
                const userLatLng = new naver.maps.LatLng(lat, lng);
                // 사용자 위치 마커가 없으면 새로 생성, 있으면 위치 업데이트
                if (!userMarker.value) {
                  userMarker.value = new naver.maps.Marker({
                    position: userLatLng,
                    map: map.value,
                  });
                } else {
                  userMarker.value.setPosition(userLatLng);
                }

                // 고정 마커와 실시간 마커 거리 비교 및 아이콘 변경
                mapStore.updateStoreMarkersIcon(
                  lat,
                  lng,
                  map.value,
                  checkInRange
                );
              }
            }
          );
        }
      }
    );
    //===================================================================
    //테스트용 클릭 이벤트
    new naver.maps.Event.addListener(map.value, 'click', function (e) {
      userMarker.value.setPosition(e.coord);
      gpsStore.latitude = e.coord.lat();
      gpsStore.longitude = e.coord.lng();
    });
    //===================================================================

    naver.maps.Event.addListener(map.value, 'idle', () => {
      if (buttonState.value) {
        buttonState.value = false; // 버튼 상태를 false로 변경
        console.log('buttonState가 false로 변경되었습니다.');
      }
      const center = map.value.getCenter();
      mapStore.setLat(center.lat());
      mapStore.setLon(center.lng());
      mapStore.getApi();
      mapStore.loadStoreMarkers(map.value, showLocationInfo); // 첫 화면 마커 로드
      if (buttonState.value == false) console.log('false');
    });
  };
});

// 컴포넌트 언마운트 시 위치 추적 중지
onBeforeUnmount(() => {
  gpsStore.stopWatchingLocation();
});
// 반경 내에 있는지 체크
const checkInRange = (isIn) => {
  isInRange.value = isIn; // 반경 내에 있으면 true, 아니면 false
};
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
