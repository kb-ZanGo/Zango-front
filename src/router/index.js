import { createRouter, createWebHistory } from 'vue-router';
import Map from '../pages/Map.vue';
import Zzanda from '../pages/Zzanda.vue';
import ChoolCheck from '../pages/ChoolCheck.vue';
import Roulette from '../pages/Roulette.vue';
import QuizRegister from '@/pages/QuizRegister.vue';
import QuizGroup from '@/pages/QuizGroup.vue';
import FeedBack from '@/pages/side/FeedBack.vue';
import GroupBuy from '@/pages/side/GroupBuy.vue';
import HoneyTip from '@/pages/side/HoneyTip.vue';

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
      path: '/quiz/regi',
      name: 'quizRegi',
      component: QuizRegister,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizGroup,
    },
    {
      path: '/honeytip',
      name: 'HoneyTip',
      component: HoneyTip,
    },
    {
      path: '/groupbuy',
      name: 'GroupBuy',
      component: GroupBuy,
    },
    {
      path: '/feedback',
      name: 'FeedBack',
      component: FeedBack,
    },
  ],
});

export default router;
