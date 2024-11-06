import { createRouter, createWebHistory } from 'vue-router';
import Map from '../pages/Map.vue';
import Zzanda from '../pages/Zzanda.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'map',
      component: Map,
    },
    {
      path: '/zzanda',
      name: 'zzanda',
      component: Zzanda,
    },
  ],
});

export default router;
