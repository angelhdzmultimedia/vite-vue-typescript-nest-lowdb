import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: async () => await import('../pages/DashboardPage.vue'),
      meta: {
        auth: true,
      },
    },
    {
      path: '/login',
      component: async () => await import('../pages/LoginPage.vue'),
      meta: {
        auth: false,
      },
    },
    {
      path: '/register',
      component: async () => await import('../pages/RegisterPage.vue'),
      meta: {
        auth: false,
      },
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.meta.auth) {
    const authStore = useAuthStore();
    if (!authStore.currentUser.isLoggedIn && to.path !== '/login') {
      return '/login';
    } else {
      return true;
    }
  } else {
    return true;
  }
});
