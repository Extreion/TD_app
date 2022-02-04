<template>
  <v-card class="ma-2">
    <v-card-title class="red white--text text-h6">
      Suivi de consommation
    </v-card-title>
    <v-row class="ma-1" justify="space-between">
      <v-col class="pa-0" lg="3" md="3" sm="12">
        <v-treeview
          :active.sync="active"
          :items="items"
          :load-children="fetchItems"
          activatable
          color="red"
          transition
          selection-type="independent"
        >
          <template slot="label" slot-scope="{ item }">
            <div @click="forceRender('annee')" style="cursor: pointer">
              {{ item.name }}
            </div>
          </template>
          <template v-slot:prepend="{ item }" @click="forceRender('annee')">
            <v-icon v-if="!item.children"> </v-icon>
          </template>
        </v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="d-flex text-center pa-0" lg="9" md="9" sm="12">
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="text-h6 grey--text text--lighten-1 font-weight-light"
            style="align-self: center"
          >
            Sélectionner un élément
          </div>
          <v-card
            color="grey lighten-4"
            v-else
            :key="selected.name"
            width="100%"
            class="pt-6 mx-auto"
            flat
          >
            {{ selected.name }} - {{ selected.description }}
            <v-container class="pa-1">
              <v-tabs dense fixed-tabs >
                <v-tabs-slider></v-tabs-slider>
                <v-tab class="primary--text" @click="forceRender('annee')"> <v-icon></v-icon> Année </v-tab>
                <v-tab class="primary--text" @click="forceRender('mois')"> <v-icon></v-icon> Mois </v-tab>
                <v-tab class="primary--text" @click="forceRender('jour')"> <v-icon></v-icon> Jour </v-tab>
                <v-tab-item >
                  <componentSuivi :id="selected.building_id" :name="selected.name" :type='type'></componentSuivi>
                </v-tab-item>
                <v-tab-item>
                  <componentSuivi :id="selected.building_id" :name="selected.name" :type='type'></componentSuivi>
                </v-tab-item>
                <v-tab-item>
                  <componentSuivi :id="selected.building_id" :name="selected.name" :type='type'></componentSuivi>
                </v-tab-item>
              </v-tabs>
            </v-container>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
import componentSuivi from "@/components/consomation/Suivi.vue";
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function searchNode(parent, id) {
  var i;
  var result = parent.find((item) => item.id === id);
  if (result != undefined) return result;
  else if (parent != undefined) {
    result = null;
    for (i = 0; result == null && i < parent.length; i++) {
      if (parent[i].children == undefined) continue;
      result = searchNode(parent[i].children, id);
    }
    return result;
  }
  return null;
}
export default {
  data: () => ({
    active: [],
    open: [],
    site: [],
    annee: "2021",
    type: "annee",
  }),
  computed: {
    ...mapState(["configSite"]),
    items() {
      return [
        {
          name: "Site",
          description: "Site Eiffage Énergie Systèmes",
          id: 1,
          children: this.site,
        },
      ];
    },
    selected() {
      if (!this.active.length) return undefined;
      const id = this.active[0];
      return searchNode(this.items, id);
    },
  },
  watch: {
    selected: "getData",
  },
  methods: {
    async fetchItems(item) {
      await pause(500);
      return item.children.push(...this.configSite.children);
    },
    getData() {},
    forceRender(prop) {
      this.type = prop;
    },
  },
  components: {
    componentSuivi,
  },
  mounted() {},
};
</script>
