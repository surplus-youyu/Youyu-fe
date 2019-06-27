import {
  CURRENT_NICKNAME,
  CURRENT_USER_INFO,
  LOAD_USER_PROFILE,
  MODIFY_USER_PROFILE,
  IS_LOGIN,
  UID,
  LOGIN,
  LOGINOUT,
  SIGNUP
} from './constants';
import { LoginFormFieldsEP, LoginFormFieldsPV } from '@/typings/login';
import { SignUpFormFields } from '@/typings/signup';
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
    async [LOGIN]({ dispatch }, payload: LoginFormFieldsEP | LoginFormFieldsPV) {
      try {
        const { data } = await httpRequestSilence.put<
          IResponse<{}> >(`/login`, payload);
        if (data.status) {
          await dispatch(LOAD_USER_PROFILE);
          return Promise.resolve('OK');
        } else {
          return Promise.resolve('fail');
        }
      } catch (error) {
        return Promise.resolve(error);
      }
    },
    async [LOGINOUT]({ commit }, payload) {
      try {
        const { data } = await httpRequestSilence.get<
          IResponse<{}> >(`/loginout`);
        if (data.status) {
          commit(MODIFY_USER_PROFILE, null);
          return Promise.resolve('OK');
        } else {
          return Promise.resolve('fail');
        }
      } catch (error) {
        return Promise.resolve(error);
      }
    },
    async [SIGNUP]({ dispatch }, payload: SignUpFormFields) {
      try {
        const { data } = await httpRequestSilence.post<
          IResponse<{}> >(`/register`, payload);
        if (data.status) {
          return Promise.resolve('OK');
        } else {
          return Promise.resolve('fail');
        }
      } catch (error) {
        return Promise.resolve(error);
      }
    },
    async [LOAD_USER_PROFILE]({ commit }): Promise<string> {
      // noop
      try {
        const { data } = await httpRequestSilence.get<
        IResponse<IUserInfo, {}>
        >(`/user`);
        if (data.status) {
          commit(MODIFY_USER_PROFILE, data.data);
          return Promise.resolve('OK');
        } else {
          return Promise.resolve(data.msg);
        }
      } catch (error) {
        return Promise.resolve(error);
      }
    },
    async [MODIFY_USER_PROFILE]({commit}, payload) {
      try {
        const { data } = await httpRequestSilence.put<
        IResponse<{}, {}>
        >(`/user`, payload);
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
      return state.user ? state.user.nickname : '';
    },
    [CURRENT_USER_INFO](state): IUserInfo | null {
      return state.user;
    },
    [IS_LOGIN](state): boolean {
      return state.user !== null;
    }
  }
} as Module<State, any>;
