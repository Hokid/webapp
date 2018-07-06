import cloneDeep from 'lodash/cloneDeep';
import { ActionContext, Module } from 'vuex';

export const AUTH_STATE_NO_AUTH = 0;
export const AUTH_STATE_AUTH_PROCESS = 1;
export const AUTH_STATE_AUTH_SUCCESS = 2;
export const AUTH_STATE_AUTH_FAIL = 3;

export const STORE_AUTH_STATE = 'STORE_AUTH_STATE';
export const STORE_UPDATE = 'STORE_UPDATE';
export const STORE_RESET = 'STORE_RESET';

export type State = typeof $state;
export type AUTH_STATE = 0 | 1 | 2 | 3;
type Action = ActionContext<State, any>;

const $state = {
  meta: {
    authState: AUTH_STATE_NO_AUTH,
  },
  id: null,
  name: '',
  token: null,
};

const module = {
  namespaced: true,
  state: cloneDeep($state),
  getters: {
    isAuth(state: State) {
      return state.meta.authState === AUTH_STATE_AUTH_SUCCESS;
    },
  },
  mutations: {
    [STORE_AUTH_STATE](state: State, stateSign: AUTH_STATE) {
      state.meta.authState = stateSign;
    },
    [STORE_UPDATE](state: State, payload: State) {
      Object.assign(state, payload, { meta: state.meta });
    },
    [STORE_RESET](state: State) {
      Object.assign(state, cloneDeep($state));
    },
  },
  actions: {
    logout({ commit }: Action) {
      commit(STORE_RESET);
    },
  },
};

export default module as Module<State, any>;
