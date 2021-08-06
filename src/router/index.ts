import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import NavBar from '@/components/NavBar.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    components: {
      NavBar: NavBar,
      Content: () => import('@/views/home/Home.vue'),
    },
  },
  {
    path: '/create',
    name: 'Create',
    components: {
      NavBar: NavBar,
      Content: () => import('@/views/create/Create.vue'),
    },
  },
  {
    path: '/events',
    name: 'Events',
    components: {
      NavBar: NavBar,
      Content: () => import('@/views/events/Events.vue'),
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    components: {
      NavBar: NavBar,
      Content: () => import('@/views/settings/Settings.vue'),
    },
  },
  {
    path: '/:pathMatch(.*)',
    components: {
      NavBar: NavBar,
      Content: () => import('@/views/404/404.vue'),
    },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
