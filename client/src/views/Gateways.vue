<template>
  <v-container>
    <v-card
      sm="12"
      class="pa-0 mb-3"
      raised
      :disabled="!gateway.enable"
      v-for="gateway in gateways"
      :key="gateway._id"
    >
      <v-toolbar dense :color="gateway.status == 'open' ? 'green lighten-1' : 'red lighten-1'">
        <v-toolbar-title>{{gateway.letter}} - {{gateway.name}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <span class="text">{{!gateway.enable ? ' La passeralle est désactivée' : ''}}</span>
      </v-toolbar>
      <v-tabs dense>
        <v-tab>
          <v-icon left small>mdi-counter</v-icon>Compteurs
        </v-tab>
        <v-tab>
          <v-icon left small>mdi-information-variant</v-icon>Informations
        </v-tab>
        <v-tab-item>
          <v-container fluid>
            <v-row dense>
              <v-col sm="12" md="6" lg="2" v-for="counter in gateway.counters" :key="counter._id">
                <v-card shaped height="100px">
                  <v-toolbar dense color="#FFFAC0" height="25px">
                    <v-toolbar-title class="text--secondary">{{ counter.name }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn
                      icon
                      style="background-color:#FFFAC0"
                      :to="'/elec/passerelles/compteurs/'.concat(counter.gatewayId, '/' ,counter.address)"
                      height="25px"
                    >
                      <v-icon small>mdi-arrow-expand</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-card class="pa-1" flat :disabled="!counter.enable" height='75px'>
                    <v-carousel
                      :continuous="true"
                      :cycle="cycle"
                      :show-arrows="(counter.datas.length > 1) ? true : false"
                      show-arrows-on-hover
                      hide-delimiter-background
                      hide-delimiters
                      height="75px"
                      
                    >
                      <v-carousel-item v-for="(data, i) in counter.datas" :key="i">
                        <v-row style="background-color:#CFFFF0;" justify="center" class="ma-0">
                          <div class="display-0" v-if="data.error==false">{{ data.label }}</div>
                          <v-alert
                            type="error"
                            outlined
                            width="80%"
                            class="ma-1 pa-0"
                            dense
                            v-model="data.error"
                          >{{ data.label }}</v-alert>
                        </v-row>
                        <v-row align="center" justify="center">
                            <span class="title">{{data.value ? Intl.NumberFormat('fr-FR').format(data.value) : "Indéfinie" }}</span>
                            <span>&#32;{{data.unity}}</span>
                        </v-row>
                      </v-carousel-item>
                    </v-carousel>
                  </v-card>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col>
              <v-container>
                <v-list dense two-line>
                  <v-list-item-group active-class="blue--text">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Nom</v-list-item-title>
                        <v-list-item-subtitle class="text--primary" v-text="gateway.name"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>@IP</v-list-item-title>
                        <v-list-item-subtitle class="text--primary" v-text="gateway.address"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Description</v-list-item-title>
                        <v-list-item-subtitle class="text--primary" v-text="gateway.description"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Local</v-list-item-title>
                        <v-list-item-subtitle class="text--primary" v-text="gateway.local"></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Activation</v-list-item-title>
                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="gateway.enable ? 'Activé' : 'Désactivé'"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Période de rafraichissement en ms</v-list-item-title>
                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="gateway.periode"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-container>
            </v-col>
            <v-col>
              <v-card align="center" flat class="mx-auto">
                <v-img
                  class="white--text align-end"
                  height="300px"
                  width="300px"
                  :src="'/img/' + gateway.image"
                ></v-img>
                <v-card-actions>
                  <v-container class="ma-5 pa-5" v-if="isAuthentified">
                    <v-btn color="grey lighten-3" block :href="gateway.link" target="_blank">
                      <span class="mr-2">Configuration</span>
                    </v-btn>
                  </v-container>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      cycle: false
    };
  },

  computed: {
    ...mapState(["gateways"]),
    isAuthentified() {
      return this.$store.state.user.Id ? true : false
    }
  },

  methods: {},

  mounted() {}
};
</script>