<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    floating
    persistent
    mobile-breakpoint="991"
    :expand-on-hover="true"
    color="grey darken-3"
    :mini-variant.sync="opened"
  >
    <v-list-item>
      <v-list-item-title class="white--text"><v-icon style="vertical-align:middle" color="white">mdi-domain</v-icon><span class="mx-6"><strong>Tillman Domotics</strong></span></v-list-item-title>
    </v-list-item>
    <v-divider dark/>
    <v-list>
      <v-list-item-group v-for="(route, idx) in routes"  route :key="idx">
        <v-list-item :to="route.path" :active-class="color"  class="v-list-item" @click="setActive(idx)">
          <v-list-item-icon>
            <v-icon color="white">{{ route.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ route.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-expand-transition>
          <v-list v-if="route.children && route.children.length > 1 && activeIndex === idx">
            <v-list-item-group v-for="child in route.children" :key="child.name" >
              <v-list-item v-if="child.path != '' && child.show != false && (child.meta.requiresAuth ? ((isAuthentified) ? true : false) : true)" :to="route.path + '/' + child.path" :active-class="color" class="v-list-item" style='text-indent:1em'>
                <v-list-item-icon>
                  <v-icon color="white">{{ child.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content style="pa-0">
                  <v-list-item-title class="white--text">{{ child.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-expand-transition>
        <v-divider dark />
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>


<script>
import { mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    activeIndex: undefined,
    opened: true
  }),
  computed: {
    ...mapState("app", ["image", "color"]),
    inputValue: {
      get() {
        console.log("get " + this.$store.state.app.drawer)
        return this.$store.state.app.drawer;
      },
      set(val) {
        console.log("before set " + this.$store.state.app.drawer)
        console.log(val)
        this.setDrawer(val);
        console.log("after set " + this.$store.state.app.drawer)
      }
    },
    items() {
      return this.$("Layout.View.items");
    },
    isAuthentified() {
      return this.$store.state.user.Id ? true : false
    },
    routes(){
      return this.$router.options.routes.filter(x => x.hide != true)
    }
  },

  methods: {
    ...mapMutations("app", ["setDrawer", "toggleDrawer"]),
    setActive(idx){
      this.activeIndex = idx;
    }
  }
};
</script>
