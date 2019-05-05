import { ModuleState } from '../typings/vuex';
import User from './modules/user';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 模块放置于此对象中即可
const modules = {
  User
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
