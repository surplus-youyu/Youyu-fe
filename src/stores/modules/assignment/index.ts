import { Module } from 'vuex';
import {
  GET_ALL_ASSIGNMENTS, LOAD_ALL_ASSIGNMENTS, MODIFY_ALL_ASSIGNMENTS, SUBMIT_ASSIGNMENT_ANSWER
} from './constants';
import { State } from './typing';
import { httpRequestSilence } from '@/utils/httpRequest';
import { IResponse } from '@/typings/response';
import { IAssignment } from '@/typings/assignment';

export default {
  namespaced: true,
  state: () => ({
    allAssignments: []
  }),
  mutations: {
    [MODIFY_ALL_ASSIGNMENTS](state, payload) {
      state.allAssignments = payload;
    }
  },
  getters: {
    [GET_ALL_ASSIGNMENTS](state): IAssignment[] {
      return state.allAssignments;
    }
  },
  actions: {
    async [LOAD_ALL_ASSIGNMENTS]({ commit }) {
      try {
        const { data } = await httpRequestSilence.get<IResponse<IAssignment> >(
          `/assignments`
        );
        if (data.status || data.msg === 'OK') {
          commit(MODIFY_ALL_ASSIGNMENTS, data.data);
        }
      } catch (error) {
        // noop
      }
    },
    async [SUBMIT_ASSIGNMENT_ANSWER]({ commit }, { aid, payload }) {
      try {
        const { data } = await httpRequestSilence.post<IResponse<{}> >(
          `/assignments/${aid}`, {
            payload: JSON.stringify(payload)
          }
        );
        return Promise.resolve('OK');
      } catch (error) {
        return Promise.resolve(error);
      }
    }
  }
} as Module<State, any>;
