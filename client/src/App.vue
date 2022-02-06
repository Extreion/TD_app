<template>
  <v-app style="overflow: auto">
    <core-drawer />
    <core-view />
    <core-footer></core-footer>
  </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "App",

  components: {
    ...mapState(["windowHeight"]),
  },

  methods: {
    ...mapActions([
      "set_windows_width",
      "set_windows_height",
    ]),

    getWindowWidth(event) {
      this.set_windows_width(document.documentElement.clientWidth);
    },

    getWindowHeight(event) {
      this.set_windows_height(document.documentElement.clientHeight);
    },
  },

  mounted() {
    document.title = 'Tillman Domotics'
    this.$nextTick(() => {
      window.addEventListener("resize", this.getWindowWidth);
      window.addEventListener("resize", this.getWindowHeight);
      //Init
      this.getWindowWidth();
      this.getWindowHeight();
    });
  },



  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
    window.removeEventListener("resize", this.getWindowHeight);
  },

  data: () => ({
    drawer: true,
    mini: true,
  }),
};
</script>

<!--
<style lang="scss">
@import '@/styles/index.scss';
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
-->
