import Vue from "vue";
import Vuex from "vuex";
import actioncable from 'actioncable';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isProcessingPromotions: false,
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
    SET_PROCESSING_PROMOTIONS(state, isProcessing) {
      console.log(`isProcessingPromotions is set to: ${isProcessing}`);
      state.isProcessingPromotions = isProcessing;
    },
  },
  actions: {
    createCable({ commit }) {
      const cable = actioncable.createConsumer(process.env.VUE_APP_WEBSOCKET_HOST + '/cable');
      commit('SET_CABLE', cable);
    },
    setProcessingPromotions({ commit }, isProcessing) {
      commit('SET_PROCESSING_PROMOTIONS', isProcessing);
    },
  },
  modules: {},
});
