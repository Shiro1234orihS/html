import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConnectionView from '@/views/ConnectionView.vue'
import CreationCompteView from '@/views/CreationCompteView.vue'
import AllServerView from '@/views/AllServerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'connection',
      component: ConnectionView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/creation',
      name: 'creation',
      component: CreationCompteView,
    },
    {
      path: '/allServer',
      name: 'allServer',
      component: AllServerView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
