import { createRouter, createWebHashHistory } from 'vue-router';

const Index = () => import('../pages/index.vue');

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/index",
      name: "index",
      component: Index
    }, {
      path: "/:pathMatch(.*)*",
      redirect: {
        name: "index"
      }
    }
  ]
});

export default router;