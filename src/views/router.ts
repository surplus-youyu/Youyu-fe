import Home from './Home.vue';
import Router from 'vue-router';
import Vue from 'vue';
import BasicLayout from '@/layouts/BasicLayout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./Login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./Signup.vue')

      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '',
          name: 'home',
          redirect: '/requestHall'
        },
        {
          path: 'requestHall',
          name: 'requestHall',
          component: () => import('./requestHall/requestHall.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('./about/about.vue')
        }
      ]
    }
  ]
});
