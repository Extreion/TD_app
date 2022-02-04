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
      "get_gateways",
      "get_all_groups",
      "get_site_config",
      "connect_socketio",
      "set_windows_width",
      "set_windows_height",
      "get_max_power",
      "get_logs",
      "ack_log"
    ]),

    getWindowWidth(event) {
      this.set_windows_width(document.documentElement.clientWidth);
    },

    getWindowHeight(event) {
      this.set_windows_height(document.documentElement.clientHeight);
    },
  },

  mounted() {
    document.title = 'Comptage Énergie'
    this.connect_socketio();
    this.get_gateways();
    this.get_site_config();
    this.get_max_power({"year": new Date().getFullYear().toString()});
    this.get_logs({"Id": 0});
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
