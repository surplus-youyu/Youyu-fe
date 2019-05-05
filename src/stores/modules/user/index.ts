import {
  CURRENT_NICKNAME,
  CURRENT_USER_INFO,
  LOAD_USER_PROFILE,
  MODIFY_USER_PROFILE
} from './constants';
import { IUserInfo, State } from './typing';

import {Module} from 'vuex';

export default {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    [MODIFY_USER_PROFILE](state, { user }: { user: IUserInfo | null }) {
      state.user = user;
    }
  },
  actions: {
    async [LOAD_USER_PROFILE]({ commit }) {
      // noop
    }
  },
  getters: {
    [CURRENT_NICKNAME](state): string {
      return state.user ? state.user.nick_name : '';
    },
    [CURRENT_USER_INFO](state): IUserInfo | null {
      return state.user;
    }
  }
} as Module<State, any>;
