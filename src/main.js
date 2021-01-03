import Vue from "vue";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";
import VueIziToast from "vue-izitoast";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.config.productionTip = false;

import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "izitoast/dist/css/iziToast.css";

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

// Init plugin
Vue.use(Loading);
Vue.use(VueIziToast);
Vue.use(Toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
