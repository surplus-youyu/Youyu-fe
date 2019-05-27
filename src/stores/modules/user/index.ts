import {
  CURRENT_NICKNAME,
  CURRENT_USER_INFO,
  LOAD_USER_PROFILE,
  MODIFY_USER_PROFILE,
  IS_LOGIN
} from './constants';
import { LoginFormFieldsUP, LoginFormFieldsPV } from '@/typings/login';
import { httpRequest, httpRequestSilence } from '@/utils/httpRequest';
import { OJData } from '@/typings/response';
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
    async [LOAD_USER_PROFILE]({ commit }, payload: LoginFormFieldsUP | LoginFormFieldsPV) {
      // noop
      /*
      try {
        const { data } = await httpRequestSilence.post<
          OJData<IUserInfo, {}>
        >(`/user`, payload);
        if (data.status === 'OK') {
          commit(MODIFY_USER_PROFILE, data.data);
          return data;
        }
      } catch (error) {
        return error.data;
      }
      */
      return {
        status: 'OK',
        msg: 'test'
      };
    }
  },
  getters: {
    [CURRENT_NICKNAME](state): string {
      return state.user ? state.user.nick_name : '';
    },
    [CURRENT_USER_INFO](state): IUserInfo | null {
      return state.user;
    },
    [IS_LOGIN](state): boolean {
      return state.user !== null;
    }
  }
} as Module<State, any>;
