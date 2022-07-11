import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

function generateRoutes(pages, access) {
  let routes = [];
  for (const page in pages) {
    const parts = /^(.*[\\/])?(.*?)(\.[^.]*?|)$/gi.exec(page);
    const data = {
      path: parts[0] || '',
      subpath: parts[1] || '',
      name: parts[2] || '',
      extension: parts[3] || '',
    };

    let pathName = '';

    if (data.name === 'index') {
      pathName = '/';
    } else {
      pathName = `/${data.name.toLowerCase().replace('page', '')}`;
    }

    routes.push({
      path: pathName,
      component: pages[page],
      meta: {
        auth: access === 'private',
      },
    });
  }

  return routes;
}

export const router = createRouter({
  history: createWebHistory(),
  routes: generateRoutes(
    import.meta.glob('../pages/public/*.vue'),
    'public'
  ).concat(
    generateRoutes(import.meta.glob('../pages/private/*.vue'), 'private')
  ),
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
