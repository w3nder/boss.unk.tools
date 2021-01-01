import Vue from "vue";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: SocketIO("https://raidboss.unk.tools/"),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
