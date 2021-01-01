<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/pausesteel70.png" />
    <HelloWorld msg="Welcome to Boss App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  computed: mapState(["chatlog"]),
  methods: {
    clickButton() {
      this.$socket.emit("test_connect", { payload: "test_payload" });
    }
  }
};
</script>
