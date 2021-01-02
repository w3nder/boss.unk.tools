import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chatlog: [],
    LoadingOverlay: true
  },
  mutations: {
    PUSH_MESSAGE(state, data) {
      state.chatlog = data;
    },
    CHANGE_LOADING(state, status) {
      state.LoadingOverlay = status;
    }
  },
  actions: {
    SOCKET_addNewMessage(context, data) {
      context.commit("CHANGE_LOADING", false);
      context.commit("PUSH_MESSAGE", data);
    }
  },
  getters: {
    isLoading(state) {
      return state.LoadingOverlay;
    }
  }
});
