import Vue from 'vue';
import Router from 'vue-router';
import InnerPagesTemplate from '@/views/templates/InnerPagesDefault.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   redirect: '/main',
    //   component: InnerPagesTemplate,
    //   children: [
    //     {
    //       path: 'main',
    //       name: 'Main',
    //       meta: {
    //         // meta
    //       },
    //       async component() {
    //         return await import('@/views/pages/Main.vue');
    //       },
    //     },
    //   ],
    // },
    {
      path: '/error',
      component: InnerPagesTemplate,
      children: [
        {
          path: '/',
          name: 'ErrorPage',
          meta: {
            // meta
          },
          async component() {
            return await import('@/views/pages/Error.vue');
          },
        },
      ],
    },
    {
      path: '/not-found',
      component: InnerPagesTemplate,
      children: [
        {
          path: '/',
          name: 'NotFoundErrorPage',
          meta: {
            isPageNotFound: true,
          },
          async component() {
            return await import('@/views/pages/NotFoundError.vue');
          },
        },
      ],
    },
    {
      path: '*',
      redirect: '/not-found',
    },
  ],
});
