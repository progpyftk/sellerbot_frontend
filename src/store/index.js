import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: 'meutoken',
    currentUser: 'not logged'
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
