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
    },
    {
      path: '/',
      component: BasicLayout,
      children: [
        {
          path: '',
          name: 'home',
          redirect: '/requests/public'
        },
        {
          path: 'requests/:requestType',
          name: 'requests',
          component: () => import('./requestHall/requestHall.vue')
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
          path: 'publish/questionare',
          name: 'questionare',
          component: () => import('./publish/PublishQuestionare.vue')
        },
        {
          path: 'questionare/:sid',
          name: 'answer-questionare',
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
