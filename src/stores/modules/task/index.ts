import { Module } from 'vuex';
import { State } from './typing';
import {
  LOAD_ALL_TASKS,
  LOAD_ALL_TASKS_OWN,
  MODIFY_ALL_TASKS,
  MODIFY_ALL_TASKS_OWN,
  GET_ALL_TASKS,
  GET_ALL_TASKS_OWN,
  FINISH_TASK,
  LOAD_FILE
} from './constants';
import { httpRequestSilence } from '@/utils/httpRequest';
import { IResponse } from '@/typings/response';
import { ITask } from '@/typings/task';

export default {
  namespaced: true,
  state: () => ({
    publicTasks: [],
    ownTasks: []
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
    },
    async [LOAD_FILE]({}, payload): Promise<any> {
      try {
        const { data } = await httpRequestSilence.get<IResponse<Blob> >(
          `/tasks/${payload.id}/files/${payload.filename}`, {responseType: 'blob'}
        );
        if (data) {
          return Promise.resolve(data);
        } else {
          return Promise.resolve('no file');
        }
      } catch (error) {
        return Promise.resolve(error);
      }
    },
    async [LOAD_ALL_TASKS_OWN]({ commit }): Promise<string> {
      try {
        const { data } = await httpRequestSilence.get<IResponse<ITask[]> >(
          `/tasks?scope=owned`
        );
        if (data.status || data.msg === 'OK') {
          commit(MODIFY_ALL_TASKS_OWN, data.data);
          return Promise.resolve('OK');
        } else {
          return Promise.resolve(data.msg);
        }
      } catch (error) {
        return Promise.resolve(error);
      }
    },
    async [FINISH_TASK]({}, payload): Promise<string> {
      try {
        const { data } = await httpRequestSilence.put<IResponse<ITask[]> >(
          `/tasks/${payload}`
        );
        if (data.status || data.msg === 'OK') {
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
      state.publicTasks = payload;
    },
    [MODIFY_ALL_TASKS_OWN](state, payload: ITask[]) {
      state.ownTasks = payload;
    }
  },
  getters: {
    [GET_ALL_TASKS](state): ITask[] {
      return state.publicTasks;
    },
    [GET_ALL_TASKS_OWN](state): ITask[] {
      return state.ownTasks;
    }
  }
} as Module<State, any>;
