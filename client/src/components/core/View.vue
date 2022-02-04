<template>
  <v-main fill-height>
    <div id="core-view">
      <core-toolbar />
      <!--<v-sheet id="playground-example" class="overflow-y-auto" :max-height="windowHeight-50" style="margin-top:49px">-->
      <v-sheet id="playground-example" class="overflow-y-auto" >
        <v-fade-transition mode="out-in" style="margin-top:5px">
          <router-view />
        </v-fade-transition>
      </v-sheet>
    </div>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  metaInfo() {
    return {
      title: "EIFFAGE ENERGIE SYSTÈMES"
    };
  },

  computed: {
    ...mapState(["windowHeight"])
  },
  mounted() { }
};
</script>

<style>
#core-view {
  padding-bottom: 100px;
}
</style>
