import { Module } from 'vuex';
import { State } from './typing';
import { LOAD_QUESTIONARE, GET_CURRENT_QUESTIONARE, MODIFY_CURRENT_QUESTIONARE, POST_QUESTIONARE } from './constants';
import { IQuestionare } from '@/typings/publish';
import { httpRequestSilence } from '@/utils/httpRequest';
import { IResponse, IGeneralResponse } from '@/typings/response';

export default {
  namespaced: true,
  state: () => ({
    currentQuestionare: null
  }),
  actions: {
    [LOAD_QUESTIONARE]({ commit }, qid: number) {
      // noop
    },
    async [POST_QUESTIONARE]({ commit }, payload: IQuestionare): Promise<string> {
      try {
        const { data } = await httpRequestSilence.post<IResponse<IGeneralResponse> >(`/surveys`, {
          title: payload.title,
          content: JSON.stringify(payload.content),
          bounty: 0
        });
        if (data.status) {
          return Promise.resolve('OK');
        } else {
          return Promise.resolve(data.msg);
        }
      } catch (err) {
        return Promise.resolve('fail');
      }
    }
  },
  getters: {
    [GET_CURRENT_QUESTIONARE](state): IQuestionare | null {
      return state.currentQuestionare;
    }
  },
  mutations: {
    [MODIFY_CURRENT_QUESTIONARE](state, payload: IQuestionare) {
      state.currentQuestionare = payload;
    }
  }
} as Module<State, any>;
