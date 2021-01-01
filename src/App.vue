<template>
  <div
    id="app"
    class="min-h-screen w-full bg-gray-200 flex flex-col items-center  py-2 px-4"
  >
    <staggered-fade
      :duration="150"
      tag="ul"
      class="flex flex-col w-full items-center max-w-md"
    >
      <boss-card
        v-for="(boss, index) in chatlog"
        :boss="boss"
        :data-index="index"
        :key="boss.nome"
      />
    </staggered-fade>
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
  computed: mapState(["chatlog"])
};
</script>
