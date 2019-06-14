import { Module } from 'vuex';
import { State } from './typing';
import { LOAD_ALL_TASKS, MODIFY_ALL_TASKS, GET_ALL_TASKS } from './constants';
import { httpRequestSilence } from '@/utils/httpRequest';
import { IResponse } from '@/typings/response';
import { ITask } from '@/typings/task';

export default {
  namespaced: true,
  state: () => ({
    tasks: []
  }),
  actions: {
    async [LOAD_ALL_TASKS]({ commit }): Promise<string> {
      try {
        const { data } = await httpRequestSilence.get<IResponse<ITask[]> >(
          `/tasks`
        );
        if (data.status || data.msg === 'OK') {
          commit(MODIFY_ALL_TASKS, data.data);
          return Promise.resolve('OK');
        } else {
          return Promise.resolve(data.msg);
        }
      } catch (error) {
        return Promise.resolve(error);
      }
    }
  },
  mutations: {
    [MODIFY_ALL_TASKS](state, payload: ITask[]) {
      state.tasks = payload;
    }
  },
  getters: {
    [GET_ALL_TASKS](state): ITask[] {
      return state.tasks;
    }
  }
} as Module<State, any>;
