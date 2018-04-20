import Vue from 'vue';
import Vuex from 'vuex';
import PersistedStatePlugin from 'vuex-persistedstate';

Vue.use(Vuex);

const store = {
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {},
  plugins: [
    PersistedStatePlugin({
      paths: [
        // paths
      ],
    }),
  ],
};

export default new Vuex.Store(store);
