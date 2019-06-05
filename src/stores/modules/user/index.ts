import {
  CURRENT_NICKNAME,
  CURRENT_USER_INFO,
  LOAD_USER_PROFILE,
  MODIFY_USER_PROFILE,
  IS_LOGIN,
  LOGIN
} from './constants';
import { LoginFormFieldsUP, LoginFormFieldsPV } from '@/typings/login';
import { httpRequest, httpRequestSilence } from '@/utils/httpRequest';
import { IUserInfo, State } from './typing';

import {Module} from 'vuex';
import { IResponse } from '@/typings/response';

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
      try {
        const { data } = await httpRequestSilence.get<IResponse<IUserInfo> >(`/user`);
        if (data.status) {
          commit(MODIFY_USER_PROFILE, data.data);
        }
      } catch (error) {
        // noop
      }
    },
    async [LOGIN]({ commit }, payload: LoginFormFieldsUP): Promise<string> {
      try {
        const { data } = await httpRequestSilence.put<IResponse<{}> >(`user/login`);
        if (data.status) {
          return Promise.resolve('OK');
        } else {
          return Promise.resolve(data.msg);
        }
      } catch (error) {
        // noop
        return Promise.resolve(error);
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
    }
  }
} as Module<State, any>;
