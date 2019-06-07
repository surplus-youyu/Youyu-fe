import { Module } from 'vuex';
import { State, KeyToValueMap } from './typing';
import {
    GET_PUBLIC_REQUESTS,
    GET_SELF_REQUESTS_SENT,
    GET_SELF_REQUESTS_RECEIVED,
    GET_SELF_REQUESTS_DONE,
    GET_SELF_REQUESTS_DRAFT,
    LOAD_REQUESTS,
    POST_REQUESTS,
    SET_REQUESTS
 } from './constants';
import { RequsetMsg } from '@/typings/requestHall';
import { httpRequestSilence } from '@/utils/httpRequest';
import { IResponse } from '@/typings/response';

export default {
  namespaced: true,
  state: () => ({
    publicRequests: null,
    selfRequestsSent: null,
    selfRequestsReceived: null,
    selfRequestsDone: null,
    selfRequestsDraft: null
  }),
  actions: {
    async [LOAD_REQUESTS]({ commit }, type: string, uid: number = 0) {
      try {
        const { data } = await httpRequestSilence.get<IResponse<RequsetMsg[]> >(`/requests/${type}?uid=${uid}`);
        if (data.status) {
          commit(SET_REQUESTS, { data: data.data, type});
          return true;
        } else {
          return false;
        }
      } catch (err) {
        return err.data;
      }
    }
  },
  getters: {
    [GET_PUBLIC_REQUESTS](state): RequsetMsg[] | null {
      return state.publicRequests;
    },
    [GET_SELF_REQUESTS_SENT](state): RequsetMsg[] | null {
      return state.selfRequestsSent;
    },
    [GET_SELF_REQUESTS_RECEIVED](state): RequsetMsg[] | null {
        return state.selfRequestsReceived;
    },
    [GET_SELF_REQUESTS_DONE](state): RequsetMsg[] | null {
        return state.selfRequestsDone;
    },
    [GET_SELF_REQUESTS_DRAFT](state): RequsetMsg[] | null {
        return state.selfRequestsDraft;
    }
  },
  mutations: {
    [SET_REQUESTS](state, payload) {
      const ReqMap: KeyToValueMap = {
        public: 'publicRequests',
        sent: 'selfRequestsSent',
        received: 'selfRequestsReceived',
        done: 'selfRequestsDone',
        draft: 'selfRequestsDraft'
      };
      state[ReqMap[payload.type]] = payload.data;
    }
  }
} as Module<State, any>;
