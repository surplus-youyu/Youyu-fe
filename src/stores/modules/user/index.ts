import {
  CURRENT_NICKNAME,
  CURRENT_USER_INFO,
  LOAD_USER_PROFILE,
  MODIFY_USER_PROFILE,
  IS_LOGIN,
  UID
} from './constants';
import { LoginFormFieldsUP, LoginFormFieldsPV } from '@/typings/login';
import { httpRequest, httpRequestSilence } from '@/utils/httpRequest';
import { IResponse } from '@/typings/response';
import { IUserInfo, State } from './typing';

import {Module} from 'vuex';

export default {
  namespaced: true,
  state: () => ({
    user: null
  }),
  mutations: {
    [MODIFY_USER_PROFILE](state,  user: IUserInfo | null ) {
      state.user = user;

    }
  },
  actions: {
    async [LOAD_USER_PROFILE]({ commit }, payload: LoginFormFieldsUP | LoginFormFieldsPV) {
      // noop
      try {
        const { data } = await httpRequestSilence.put<
        IResponse<IUserInfo, {}>
        >(`/user/login`, payload);
        if (data.status) {
          commit(MODIFY_USER_PROFILE, data.data);
          return data;
        }
      } catch (error) {
        return error.data;
      }
    },
    async [MODIFY_USER_PROFILE]({commit}, payload) {
      try {
        const { data } = await httpRequestSilence.put<
        IResponse<{}, {}>
        >(`/user/modifyInfo`, payload);
        if (data.status) {
          commit(MODIFY_USER_PROFILE, payload);
          return data;
        }
      } catch (error) {
        return error.data;
      }
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
    },
    [UID](state): number | null {
      return state.user && state.user.uid;
    }
  }
} as Module<State, any>;
