<template>
  <div id="map-container">
    <div id="map"></div>

    <!-- 지도 위에 버튼 -->
    <img
      src="/images/cardList.png"
      class="toggle-card-list-btn"
      @click="toggleCardList"
    />

    <!-- 카드 리스트 -->
    <div class="card-list" v-show="showCardList">
      <div
        class="card"
        v-for="(card, index) in cards"
        :key="index"
        @click="selectCard(card)"
      >
        <img :src="card.image" alt="card.name" class="card-image" />
      </div>
    </div>
  </div>
  <CoalitionInfo
    v-if="showModal && isCoalitionType"
    :location="selectedLocation"
    :isInRange="isInRange"
    @close="closeModal"
  />

  <!-- 그 외에는 StoreInfo 컴포넌트를 보여줌 -->
  <StoreInfo
    v-else-if="showModal"
    :location="selectedLocation"
    :isInRange="isInRange"
    @close="closeModal"
  />
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import { useMapStore } from '@/stores/map';
import { useGpsStore } from '@/stores/gps';
import Menu from '@/components/Menu.vue';
import StoreInfo from '@/components/StoreInfo.vue';
import CoalitionInfo from '@/components/CoalitionInfo.vue';

const mapStore = useMapStore();
const gpsStore = useGpsStore();
const showModal = ref(false);
const isInRange = ref(false);
const selectedLocation = ref(null); // 선택된 마커 정보
const map = ref();
const userMarker = ref();
const buttonState = ref(true);
let isLocationBtnOn = false;
const locationBtn =
  '<img src="/images/centerOn.png" alt="Location Button" style="width: 80px; height: 80px;">';
let isMapCentered = false;
let stopTracking;
const showCardList = ref(false);

const cards = [
  {
    id: 1,
    name: '첵첵 체크카드(마루는강쥐)',
    image: '/images/maruCard.png',
  },
  {
    id: 2,
    name: '노리 체크카드',
    image: '/images/noriCard.png',
  },
  {
    id: 3,
    name: '나라사랑체크카드',
    image: '/images/naraCard.png',
  },
];
// 카드 선택
const selectCard = async (card) => {
  mapStore.setCard(card.id);
  mapStore.clearCoalitionMarkers(map.value);
  await mapStore.getCoalitionApi();
  mapStore.loadCoalitionMarkers(map.value, showLocationInfo);
  showCardList.value = false;
  console.log(`Selected card: ${card.name}, id: ${card.id}`);
};
// 카드 리스트 토글
const toggleCardList = () => {
  showCardList.value = !showCardList.value;
};

onMounted(async () => {
  if (localStorage.getItem !== 1) {
    localStorage.setItem('username', 'j0');
  }

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
      // CustomControl 생성
      const customControl = new naver.maps.CustomControl(locationBtn, {
        position: naver.maps.Position.LEFT_BOTTOM,
      });
      customControl.setMap(map.value);

      // 클릭 이벤트 추가
      naver.maps.Event.addDOMListener(
        customControl.getElement(),
        'click',
        function () {
          isLocationBtnOn = !isLocationBtnOn; // 상태 토글

          const button = customControl.getElement(); // 버튼 DOM 엘리먼트
          button.innerHTML = isLocationBtnOn
            ? `<img src="/images/center.png" alt="Location Button" style="width: 80px; height: 80px;">`
            : `<img src="/images/centerOn.png" alt="Location Button" style="width: 80px; height: 80px;">`;
          buttonState.value = !buttonState.value;
          console.log(buttonState.value);
          map.value.setZoom(19);
          const userLatLng = new naver.maps.LatLng(
            gpsStore.latitude,
            gpsStore.longitude
          );
          map.value.setCenter(userLatLng);
        }
      );
    });

    // buttonState.value가 true일때만 gps가 업데이트될 때마다 지도와 마커 위치를 업데이트(포켓몬고 모드)
    watch(
      () => buttonState.value, // buttonState.value의 변화를 감지
      (newState) => {
        if (stopTracking) stopTracking();
        if (newState) {
          // 실시간 위치 추적 및 지도 중심 이동
          stopTracking = watch(
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
          console.log('실시간 추적이 비활성화되었습니다.');
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
      const center = map.value.getCenter();
      mapStore.setLat(center.lat());
      mapStore.setLon(center.lng());

      mapStore.getApi();
      mapStore.getCoalitionApi();
      mapStore.loadStoreMarkers(map.value, showLocationInfo); // 첫 화면 마커 로드
      mapStore.loadCoalitionMarkers(map.value, showLocationInfo);
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

const isCoalitionType = computed(() => {
  return ['gs', 'coffee', 'cgv', 'olive', 'cu', 'out'].includes(
    selectedLocation.value?.type
  );
});
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
.toggle-card-list-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  width: 70px;
  height: auto;
}
.card-list {
  position: absolute;
  top: 70px;
  right: 10px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
}

.card {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}

.card-image {
  width: 170px;
  height: 150px;
  margin-right: 10px;
}
</style>
