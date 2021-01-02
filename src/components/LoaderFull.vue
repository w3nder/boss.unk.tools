<template>
  <loading
    :active.sync="isLoading"
    :can-cancel="false"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  />
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapGetters } from "vuex";

export default {
  name: "LoaderFull",
  components: { Loading },
  computed: {
    ...mapGetters(["isLoading"])
  },
  data() {
    return {
      fullPage: true
    };
  },
  methods: {
    onCancel() {
      this.$store.commit("CHANGE_LOADING", false);
    }
  }
};
</script>

<style scoped></style>
