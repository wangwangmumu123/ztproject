import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('./views/layout/index.vue'),
      redirect: '/dashboard', // 将dashboard设为首页home
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          // lazy loading
          component: () => import('./views/dashboard/index.vue')
        },
        {
          path: 'dashboard/update',
          name: 'dashboard_update',
          // lazy loading
          component: () => import('./views/dashboard/components/add.vue')
        },
        {
          path: 'statistics',
          name: 'statistics',
          component: () => import('./views/statistics/index.vue')
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('./views/order/index.vue')
        },
        {
          path: 'product',
          name: 'product',
          component: () => import('./views/dish/index.vue')
        },
        {
          path: 'product/add',
          name: 'product_add',
          component: () => import('./views/dish/add.vue')
        },
        {
          path: 'employee',
          name: 'employee',
          component: () => import('./views/employee/index.vue')
        },
        {
          path: 'employee/add',
          name: 'employee_add',
          component: () => import('./views/employee/add.vue')
        },
        {
          path: 'employee/update',
          name: 'employee_update',
          component: () => import('./views/employee/update.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // lazy loading
      component: () => import('./views/login/index.vue')
    },
    {
      path: '/reg',
      name: 'reg',
      // lazy loading
      component: () => import('./views/reg/index.vue')
    }
  ]
})

export default router
