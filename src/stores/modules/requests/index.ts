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
import { IResponse, IGeneralResponse } from '@/typings/response';

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
    async [LOAD_REQUESTS]({ commit }, type: string) {
      try {
        const { data } = await httpRequestSilence.get<IResponse<RequsetMsg[]> >(`/requests/${type}`);
        if (data.status === 'OK') {
          commit(SET_REQUESTS, { data: data.data, type });
        }
      } catch (err) {
        return Promise.resolve('fail');
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
        selfSent: 'selfRequestsSent',
        selfReceived: 'selfRequestsReceived',
        selfDone: 'selfRequestsDone',
        selfDraft: 'selfRequestsDraft'
      };
      state[ReqMap[payload.type]] = payload.data;
    }
  }
} as Module<State, any>;