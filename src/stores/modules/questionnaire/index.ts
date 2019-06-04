import { Module } from 'vuex';
import { State } from './typing';
import { LOAD_QUESTIONARE, GET_CURRENT_QUESTIONARE, MODIFY_CURRENT_QUESTIONNAIRE, POST_QUESTIONARE } from './constants';
import { IQuestionnaire, IQuestionnaireContent } from '@/typings/publish';
import { httpRequestSilence } from '@/utils/httpRequest';
import { IResponse, IQueryQuestionnaireResponse } from '@/typings/response';

export default {
  namespaced: true,
  state: () => ({
    currentQuestionnaire: null
  }),
  actions: {
    async [LOAD_QUESTIONARE]({ commit }, qid: number) {
      try {
        const { data } = await httpRequestSilence.get<IResponse<IQueryQuestionnaireResponse> >
          (`/questionnaires/${qid}`);
        if (data.data) {
          const newQuestionnaire: IQuestionnaire = {
            id: data.data.tid,
            publisher_id: data.data.owner,
            content: JSON.parse(data.data.extra) as IQuestionnaireContent[],
            ...data.data
          };
          commit(`${MODIFY_CURRENT_QUESTIONNAIRE}`, newQuestionnaire);
        }
      } catch (error) {
        // noop
      }
    },
    async [POST_QUESTIONARE]({ commit }, payload: IQuestionnaire): Promise<string> {
      try {
        const { data } = await httpRequestSilence.post<IResponse<{}>>(`/surveys`, {
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
    [GET_CURRENT_QUESTIONARE](state): IQuestionnaire | null {
      return state.currentQuestionnaire;
    }
  },
  mutations: {
    [MODIFY_CURRENT_QUESTIONNAIRE](state, payload: IQuestionnaire) {
      state.currentQuestionnaire = payload;
    }
  }
} as Module<State, any>;
