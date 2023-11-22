import Vue from "vue";
import Vuex from "vuex";
import actioncable from 'actioncable';



Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cable: null,
    authToken: 'meutoken',
    currentUser: 'not logged',
    databaseUpdate: 'not updated',
    //backend_url: 'http://api.sellerbot.com.br',
    backend_url: 'http://localhost:3000'
  },

  getters: {},
  mutations: {
    SET_CABLE(state, cable) {
      console.log('Setting cable instance:', cable);
      state.cable = cable;
    },
  },
  actions: {
    createCable({ commit }) {
      const cable = actioncable.createConsumer('ws://localhost:3000/cable');
      commit('SET_CABLE', cable);
    },
  },
  modules: {},
});
