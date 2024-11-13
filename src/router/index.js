import { createRouter, createWebHistory } from 'vue-router';
import Map from '../pages/Map.vue';
import Zzanda from '../pages/Zzanda.vue';
import ChoolCheck from '../pages/ChoolCheck.vue';
import Roulette from '../pages/Roulette.vue';

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
    {
      path: '/choolCheck',
      name: 'choolCheck',
      component: ChoolCheck,
    },
    {
      path: '/roulette',
      name: 'roulette',
      component: Roulette,
    },
  ],
});

export default router;
