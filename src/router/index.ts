import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginSide from '@/views/LoginSide.vue'
import KalenderSide from '@/views/KalenderSide.vue'

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
      component: HomeView,
    },
    {
      path: '/kalender',
      name: 'kalender',
      component: KalenderSide,
    },
  ],
})

export default router
