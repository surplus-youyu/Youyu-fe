import Home from './Home.vue';
import Router from 'vue-router';
import Vue from 'vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./Login.vue')
    }
  ]
});
