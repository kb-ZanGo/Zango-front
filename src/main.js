import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const options = {
  // 옵션 설정 (예: 위치, 시간)
  position: 'top-center',
  transition: 'Vue-Toastification__fade',
  timeout: 2000,
};

const app = createApp(App);

app.use(createPinia());
app.use(Toast, options);
app.use(router);

app.mount('#app');
