import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authToken: 'meutoken',
    currentUser: 'not logged',
    databaseUpdate: 'not updated',
    //backend_url: 'http://api.sellerbot.com.br',
    backend_url: 'http://localhost:3000'
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});
