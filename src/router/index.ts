import { createRouter, createWebHistory } from 'vue-router'
import HomeSide from '@/views/HomeSide.vue'
import LoginSide from '@/views/LoginSide.vue'
import KalenderSide from '@/components/KalenderComponent.vue'
import LagKalenderSide from '@/views/LagKalenderSide.vue'

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
      path: '/kalender/:kalenderId',
      name: 'kalender',
      component: KalenderSide,
    },
  ],
})

export default router
