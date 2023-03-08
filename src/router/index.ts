// Composables
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'input/:name',
        name: 'Input',
        component: () => import('@/views/CloudInput.vue'),
      },
      {
        path: 'results',
        name: 'Results',
        component: () => import('@/views/Admin.vue'),
        children: [
          {
            path: ':letter',
            name: 'Result',
            component: () => import('@/views/Admin.vue'),
          }
        ]
      }
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
