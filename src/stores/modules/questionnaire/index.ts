import { Module } from 'vuex';
import { State } from './typing';
import {
  LOAD_QUESTIONARE,
  GET_CURRENT_QUESTIONARE,
  MODIFY_CURRENT_QUESTIONNAIRE,
  POST_QUESTIONARE,
  RECEIVE_QUESTIONARE
} from './constants';
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
          (`/tasks/${qid}`);
        if (data.data) {
          const newQuestionnaire: IQuestionnaire = {
            id: data.data.id,
            title: data.data.title,
            summary: data.data.description,
            publisher_id: data.data.creator,
            content: (JSON.parse(data.data.content) as IQuestionnaireContent[]),
            bounty: data.data.reward
          };
          commit(`${MODIFY_CURRENT_QUESTIONNAIRE}`, newQuestionnaire);
        }
      } catch (error) {
        // noop
      }
    },
    async [POST_QUESTIONARE]({ commit }, payload: IQuestionnaire): Promise<string> {
      try {
        const { data } = await httpRequestSilence.post<IResponse<{}>>(`/tasks`, {
          title: payload.title,
          description: payload.summary,
          type: 'TASK_TYPE_SURVEY',
          content: JSON.stringify(payload.content),
          reward: 0,
          limit: 100
        });
        if (data.status) {
          return Promise.resolve('OK');
        } else {
          return Promise.resolve(data.msg);
        }
      } catch (err) {
        return Promise.resolve('fail');
      }
    },
    async [RECEIVE_QUESTIONARE](payload): Promise<string> {
      try {
         const { data } = await httpRequestSilence.post<IResponse<
          {
           id: number
          }> >(
           `/assignments`, payload
         );
         if (data.status || data.msg === 'OK') {
           if (data.data) {
             return Promise.resolve(String(data.data.id));
           }
         }
         return Promise.resolve(data.msg);
      } catch (error) {
        return Promise.resolve(error);
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
