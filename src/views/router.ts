import Home from './Home.vue';
import Router from 'vue-router';
import Vue from 'vue';
import store from '@/stores';
import BasicLayout from '@/layouts/BasicLayout.vue';
import { LOAD_USER_PROFILE, CURRENT_USER_INFO } from '@/stores/modules/user/constants';

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
    },
    {
      path: '/',
      component: BasicLayout,
      async beforeEnter(to, from, next) {
        await store.dispatch(`user/${LOAD_USER_PROFILE}`);
        if (store.getters[`user/${CURRENT_USER_INFO}`] !== null) {
          next();
        } else {
          next('/login');
        }
      },
      children: [
        {
          path: '',
          name: 'home',
          redirect: '/requests/public'
        },
        {
          path: 'requests/:requestType',
          name: 'requests',
          component: () => import('./request/requestHall.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('./about/about.vue')
        },
        {
          path: 'personalCenter',
          name: 'personalCenter',
          component: () => import('./personalCenter/personalCenter.vue')
        },
        {
          path: 'ordersCenter',
          name: 'ordersCenter',
          component: () => import('./ordersCenter/ordersCenter.vue')
        },
        {
          path: 'publish/questionnaire',
          name: 'questionnaire',
          component: () => import('./publish/PublishQuestionnaire.vue')
        },
        {
          path: 'questionnaire/:sid',
          name: 'answer-questionnaire',
          component: () => import('./answer/Survey.vue')
        },
        {
          path: 'publish/customtask',
          name: 'customtask',
          component: () => import('./publish/PublishCustomTask.vue')
        }
      ]
    }
  ]
});
