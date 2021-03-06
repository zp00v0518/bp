import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Views from '../views';

const routes = [
  {
    props: true,
    path: '/matching/:type',
    name: 'CategoryMatching',
    component: defineAsyncComponent(() =>
      import(/* webpackChunkName: "about" */ '../views/CategoryMatching')
    )
  },
  {
    props: true,
    path: '/parse/:type',
    name: 'Parser',
    component: defineAsyncComponent(() =>
      import(/* webpackChunkName: "about" */ '../views/Parser')
    )
  },
  {
    path: '/',
    name: 'ForkView',
    component: Views.ForkView
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: defineAsyncComponent(() =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   )
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
