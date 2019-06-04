import { ModuleState } from '../typings/vuex';
import user from './modules/user';
import questionnaire from './modules/questionnaire';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 模块放置于此对象中即可
const modules = {
  user,
  questionnaire
};
const rootStore = new Vuex.Store<RootState>({
  modules,
  // plugins: [enhanceWithLoadingModule],
  strict: process.env.NODE_ENV !== 'production'
});

export type RootStore = typeof rootStore;

export type RootState = {
  [P in keyof typeof modules]: ModuleState<(typeof modules)[P]>
};

export default rootStore;
