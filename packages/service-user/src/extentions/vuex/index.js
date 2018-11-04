import {
  AUTH_STATE_AUTH_FAIL,
  AUTH_STATE_AUTH_PROCESS,
  AUTH_STATE_AUTH_SUCCESS,
  AUTH_STATE_NO_AUTH,
  STORE_AUTH_STATE,
  STORE_RESET,
  STORE_UPDATE
} from '../../const';
import clone from 'lodash/cloneDeep';

const moduleDef = {
  namespaced: true,
  state: {
    meta: {
      authState: AUTH_STATE_NO_AUTH
    },
    token: null
  },
  getters: {
    isAuth (state) {
      return state.meta.authState === AUTH_STATE_AUTH_SUCCESS;
    }
  },
  mutations: {
    [STORE_AUTH_STATE] (state, stateSign) {
      state.meta.authState = stateSign;
    },
    [STORE_UPDATE] (state, payload) {
      Object.assign(state, payload, {meta: state.meta});
    },
    [STORE_RESET] (state) {
      Object.assign(state, {
        meta: {
          authState: AUTH_STATE_NO_AUTH
        },
        token: null
      });
    }
  },
  actions: {
    logout ({commit}) {
      commit(STORE_RESET);
    }
  }
};

export default function module(Store, options) {
  let copy = clone(moduleDef);
  return (extender) => {
    if (typeof extender === 'function') {
      copy = extender(copy);
    }

    Store.registerModule('user', copy, options);
    return Store;
  };
}
