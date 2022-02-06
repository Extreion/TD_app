<template>
  <v-app-bar
    id="core-toolbar"
    absolute
    color="grey darken-4"
    scroll-target="#playground-example"
    class="lighten-2"
    height="49px"
    :hide-on-scroll="false"
  >
    <div class="v-toolbar-title">
      <v-toolbar-title>
        <v-btn v-if="responsive" icon @click.stop="onClickBtn">
          <v-icon color="white">mdi-menu</v-icon>
        </v-btn>
      </v-toolbar-title>
    </div>
    <span class="title white--text">{{ title }}</span>
    <v-spacer></v-spacer>

    <img flex text-center src="\img\tillman-domotics.svg" height="30px"/>

    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        to="/"
        text
        color="white"
      >
        <span class="d-none d-sm-block">M. Symons, Administrator</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn
        @click="logOut"
        :to="'/login'"
        icon
      >
        <v-icon color="white">mdi-logout</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    title: null,
    responsive: false,
    dialog: false,
  }),

  watch: {
    $route(val) {
      this.title = val.name;
    },
  },

  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
    this.title = this.$router.currentRoute.name;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    onClickBtn() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    onClick() {
      //
    },
    onResponsiveInverted() {
      if (window.innerWidth < 991) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
    close() {
      this.dialog = false;
    },
    logOut() {
      localStorage.removeItem("jwtToken");
      if (this.$store.state.user.Id) {
        this.$store.commit("SET_USER", {});
      }
    },
  },
  computed: {
    isAuthentified() {
      return this.$store.state.user.Id ? true : false;
    },
  },
};
</script>

<style>
#core-toolbar a {
  text-decoration: none;
}
</style>
