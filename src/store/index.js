import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chatlog: []
  },
  mutations: {
    PUSH_MESSAGE(state, data) {
      state.chatlog = data;
    }
  },
  actions: {
    SOCKET_addNewMessage(context, data) {
      context.commit("PUSH_MESSAGE", data);
    }
  }
});
