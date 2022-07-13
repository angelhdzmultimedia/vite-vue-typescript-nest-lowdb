import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

function _generateRoutes(root: RouteRootRecord): RouteRecordRaw[] {
  let routes = [];
  for (const page in root.path) {
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
      component: root.path[page],
      props: root.props,
      meta: root.meta,
    });
  }

  return routes;
}

type RouteRootRecord = {
  name: string;
  meta?: any;
  path: any;
  props?: boolean;
};

function generateRoutes(roots: RouteRootRecord[]): RouteRecordRaw[] {
  let routes = [];
  for (const root of roots) {
    const _routes = _generateRoutes(root);

    routes = routes.concat(_routes);
  }
  return routes;
}

export const router = createRouter({
  history: createWebHistory(),
  routes: generateRoutes([
    {
      path: import.meta.glob('../pages/private/*.vue'),
      name: 'private',
      props: true,
      meta: {
        auth: true,
      },
    },
    {
      path: import.meta.glob('../pages/test/*.vue'),
      name: 'test',
      props: true,
      meta: {
        auth: true,
      },
    },
    {
      path: import.meta.glob('../pages/*.vue'),
      name: '',
      props: true,
      meta: {
        auth: false,
      },
    },
  ]),
});

router.beforeEach(async (to) => {
  if (to.meta.auth) {
    const authStore = useAuthStore();
    if (!authStore.currentUser.isLoggedIn && to.path !== '/login') {
      authStore.setRedirect(to.path !== '/' ? to.path : null);

      console.log(`Requires auth ${to.path}`);
      return {
        path: '/login',
      };
    }
    if (authStore.redirectUrl) {
      const path = authStore.redirectUrl;
      authStore.removeRedirect();
      return {
        path,
      };
    }
  }
  console.log(`NOT requires auth. ${to.path}`);
  return true;
});
