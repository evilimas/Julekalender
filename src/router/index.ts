import { createRouter, createWebHistory } from 'vue-router'
import HomeSide from '@/views/HomeSide.vue'
import LoginSide from '@/views/LoginSide.vue'
import KalenderSide from '@/components/KalenderComponent.vue'
import LagKalenderSide from '@/views/LagKalenderSide.vue'
import StylingSide from '@/views/StylingSide.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginSide,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeSide,
    },
    {
      path: '/lagkalender',
      name: 'lagkalender',
      component: LagKalenderSide,
    },
    {
      path: '/styling',
      name: 'styling',
      component: StylingSide,
    },

    {
      path: '/kalender/:kalenderId',
      name: 'kalender',
      component: KalenderSide,
    },
  ],
})

export default router
