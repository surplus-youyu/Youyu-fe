import { Module } from 'vuex';
import { State } from './typing';
import { LOAD_QUESTIONARE, GET_CURRENT_QUESTIONARE, MODIFY_CURRENT_QUESTIONARE, POST_QUESTIONARE } from './constants';
import { IQuestionare } from '@/typings/publish';

export default {
  state: () => ({
    currentQuestionare: null
  }),
  actions: {
    [LOAD_QUESTIONARE]({ commit }, qid: number) {
      // noop
    },
    [POST_QUESTIONARE]({commit}, payload: IQuestionare) {
      // noop
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
