import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chatlog: [],
    LoadingOverlay: true,
    soud: true
  },
  mutations: {
    PUSH_MESSAGE(state, data) {
      state.chatlog = data;
    },
    CHANGE_LOADING(state, status) {
      state.LoadingOverlay = status;
    },
    CHANGE_SOUD(state, status) {
      state.soud = status;
    }
  },
  actions: {
    SOCKET_addNewMessage(context, data) {
      context.commit("CHANGE_LOADING", false);
      context.commit("PUSH_MESSAGE", data);
    },
    SOCKET_notificar() {
      if (this.state.soud) {
        new Audio(require("@/assets/sound/alerta.wav")).play();
      }
    },
    changeState(context, status) {
      context.commit("CHANGE_SOUD", status);
    }
  },
  getters: {
    isLoading(state) {
      return state.LoadingOverlay;
    },
    isSoud(state) {
      return state.soud;
    }
  }
});
