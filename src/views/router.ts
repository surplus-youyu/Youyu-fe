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
          redirect: '/tasks'
        },
        // {
        //   path: 'requests/:requestType',
        //   name: 'requests',
        //   component: () => import('./requestHall/requestHall.vue')
        // },
        {
          path: '/tasks',
          name: 'tasks',
          component: () => import('./requestHall/requestHall.vue')
        },
        {
          path: 'assignments/published',
          name: 'a-published',
          component: () => import('./assignments/assignments.vue')
        },
        {
          path: 'assignments/accepted',
          name: 'a-accepted',
          component: () => import('./assignments/assignments.vue')
        },
        {
          path: 'assignments/published/:aid/questionnaire',
          name: 'published-questionnaire-detail',
          component: () => import('./publish/PublishQuestionnaire.vue')
        },
        {
          path: 'assignments/published/:aid/task',
          name: 'published-custom-task-detail',
          component: () => import('./publish/PublishCustomTask.vue')
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
          name: 'view-questionnaire',
          component: () => import('./answer/Survey.vue')
        },
        {
          path: 'custom/:tid',
          name: 'view-custom-task',
          component: () => import('./answer/CustomTask.vue')
        },
        {
          path: 'publish/customtask',
          name: 'customtask',
          component: () => import('./publish/PublishCustomTask.vue')
        },
        {
          name: 'answer-questionnaire',
          path: 'assignments/:aid/questionnaire',
          component: () => import('./answer/Survey.vue')
        },
        {
          name: 'answer-custom-task',
          path: 'assignments/:aid/task',
          component: () => import('./answer/CustomTask.vue')
        },
        {
          path: 'publish/questionnaire/:aid/statistics',
          name: 'questionnaire-statistics',
          component: () => import('./statistics/TaskStatistics.vue')
        },
        {
          path: 'publish/custom/:aid/statistics',
          name: 'custom-task-statistics',
          component: () => import('./statistics/TaskStatistics.vue')
        },
        {
          path: 'publish/questionnaire/:aid/statistic/overview',
          name: 'overview-of-statistic',
          component: () => import('./statistics/QuestionnaireStatistics.vue')
        }
      ]
    }
  ]
});
