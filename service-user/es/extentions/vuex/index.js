import _defineProperty from "@babel/runtime/helpers/defineProperty";
import "core-js/modules/es6.object.assign";

var _mutations;

import { AUTH_STATE_AUTH_FAIL, AUTH_STATE_AUTH_PROCESS, AUTH_STATE_AUTH_SUCCESS, AUTH_STATE_NO_AUTH, STORE_AUTH_STATE, STORE_RESET, STORE_UPDATE } from '../../const';
import clone from 'lodash/cloneDeep';
var moduleDef = {
  namespaced: true,
  state: {
    meta: {
      authState: AUTH_STATE_NO_AUTH
    },
    token: null
  },
  getters: {
    isAuth: function isAuth(state) {
      return state.meta.authState === AUTH_STATE_AUTH_SUCCESS;
    }
  },
  mutations: (_mutations = {}, _defineProperty(_mutations, STORE_AUTH_STATE, function (state, stateSign) {
    state.meta.authState = stateSign;
  }), _defineProperty(_mutations, STORE_UPDATE, function (state, payload) {
    Object.assign(state, payload, {
      meta: state.meta
    });
  }), _defineProperty(_mutations, STORE_RESET, function (state) {
    Object.assign(state, {
      meta: {
        authState: AUTH_STATE_NO_AUTH
      },
      token: null
    });
  }), _mutations),
  actions: {
    logout: function logout(_ref) {
      var commit = _ref.commit;
      commit(STORE_RESET);
    }
  }
};
export default function module(Store, options) {
  var copy = clone(moduleDef);
  return function (extender) {
    if (typeof extender === 'function') {
      copy = extender(copy);
    }

    Store.registerModule('user', copy, options);
    return Store;
  };
}