<template>
  <div
    id="app"
    class="min-h-screen w-full bg-gray-200 flex flex-col items-center"
  >
    <button
      @click="triggerTransition"
      class="my-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    >
      {{ soud ? "Desativar Som" : "Ativar Som" }}
    </button>
    <template>
      <staggered-fade
        :duration="150"
        tag="ul"
        class="flex flex-col w-full items-center max-w-md"
      >
        <!-- Each element requires a data-index attribute in order for the transition to work properly -->
        <boss-card
          v-for="(boss, index) in chatlog"
          :boss="boss"
          :data-index="index"
          :key="boss.nome"
        />
      </staggered-fade>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";

import BossCard from "./components/BossCard";
import StaggeredFade from "./components/StaggeredFade";
export default {
  name: "App",
  components: {
    BossCard,
    StaggeredFade
  },
  data() {
    return {
      showPayments: true
    };
  },
  computed: mapState(["chatlog", "soud"]),

  methods: {
    // You probably won't need this
    triggerTransition() {
      this.$store.dispatch("changeState", !this.$store.state.soud);
    }
  }
};
</script>

<style></style>
