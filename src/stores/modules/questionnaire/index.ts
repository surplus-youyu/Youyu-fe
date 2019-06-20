import { Module } from 'vuex';
import { State } from './typing';
import {
  LOAD_QUESTIONARE,
  LOAD_QUESTIONARE_SUBMITS,
  GET_CURRENT_QUESTIONARE,
  GET_QUESTIONARE_SUBMITS,
  MODIFY_CURRENT_QUESTIONNAIRE,
  MODIFY_QUESTIONARE_SUBMITS,
  POST_QUESTIONARE,
  RECEIVE_QUESTIONARE,
  QUESTIONARE_SUBMITS_EXIST
} from './constants';
import { IQuestionnaire, IQuestionnaireContent } from '@/typings/publish';
import { httpRequestSilence } from '@/utils/httpRequest';
import { IResponse, IQueryQuestionnaireResponse } from '@/typings/response';

export default {
  namespaced: true,
  state: () => ({
    currentQuestionnaire: null,
    questionnaireSumitList: []
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
            bounty: data.data.reward,
            type: 'TASK_TYPE_SURVEY'
          };
          commit(`${MODIFY_CURRENT_QUESTIONNAIRE}`, newQuestionnaire);
        }
      } catch (error) {
        // noop
      }
    },
    async [LOAD_QUESTIONARE_SUBMITS]({ commit }, tid: number) {
      try {
        const { data } = await httpRequestSilence.get<IResponse<IQueryQuestionnaireResponse[]> >
          (`/tasks/${tid}/assignments`);
        if (data.data) {
          const lists: IQuestionnaire[] = [];
          data.data.forEach((QNaire: any) => {
            const item: IQuestionnaire = {
              id: QNaire.id,
              title: QNaire.title,
              summary: QNaire.description,
              publisher_id: QNaire.creator,
              content: (JSON.parse(QNaire.content) as IQuestionnaireContent[]),
              bounty: QNaire.reward,
              type: 'TASK_TYPE_SURVEY'
            };
            lists.push(item);
          });
          commit(`${MODIFY_QUESTIONARE_SUBMITS}`, lists);
        }
      } catch (error) {
        // noop
      }
    },
    async [POST_QUESTIONARE]({ commit }, payload): Promise<string> {
      try {
        const { data } = await httpRequestSilence.post<IResponse<{}>>(`/tasks`, {
          title: payload.title,
          description: payload.summary,
          type: (payload.type === '' ? 'TASK_TYPE_SURVEY' : payload.type),
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
    async [RECEIVE_QUESTIONARE]({}, payload): Promise<string> {
      try {
         const { data } = await httpRequestSilence.post<IResponse<
          {
           id: number
          }> >(
           `/assignments`, { task_id: Number(payload.task_id) }
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
    },
    [GET_QUESTIONARE_SUBMITS](state): IQuestionnaire[] | null {
      return state.questionnaireSumitList;
    },
    [QUESTIONARE_SUBMITS_EXIST](state): boolean {
      return state.questionnaireSumitList.length !== 0;
    }
  },
  mutations: {
    [MODIFY_CURRENT_QUESTIONNAIRE](state, payload: IQuestionnaire) {
      state.currentQuestionnaire = payload;
    },
    [MODIFY_QUESTIONARE_SUBMITS](state, payload: IQuestionnaire[]) {
      state.questionnaireSumitList = payload;
    }
  }
} as Module<State, any>;
