<template>
  <v-container v-if="gateway">
    <v-row class="title">
      <v-col ms="12" class="ma-0 pa-0">
        <strong color="red">
          <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </strong>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card sm="12" raised :disabled="!gateway.enable" :key="gateway._id">
          <v-toolbar dense :color="gateway.status == 'open' ? 'green lighten-1' : 'red lighten-1'">
            <v-toolbar-title>{{gateway.name}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <span class="text">{{!gateway.enable ? ' La passerelle est désactivée' : ''}}</span>
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
                  <v-col
                    sm="12"
                    md="6"
                    lg="2"
                    v-for="counter in gateway.counters"
                    :key="counter._id"
                  >
                    <v-card shaped height="100px">
                      <v-toolbar dense color="#FFFAC0" height="25px">
                        <v-toolbar-title class="text--secondary">{{ counter.name }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn
                          icon
                          style="background-color:#FFFAC0"
                          :to="'/elec/passerelles/compteur/'.concat(counter.gatewayId, '/' ,counter._id)"
                          height="25px"
                        >
                          <v-icon small>mdi-arrow-expand</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-card class="pa-1" flat :disabled="!counter.enable">
                        <v-carousel
                          :continuous="true"
                          :show-arrows="(counter.datas.length > 1) ? true : false"
                          show-arrows-on-hover
                          hide-delimiter-background
                          hide-delimiters
                          height="100%"
                        >
                          <v-carousel-item v-for="(data, i) in counter.datas" :key="i">
                            <v-row style="background-color:#CFFFF0" align="center" justify="center">
                              <div class="display-0" v-if="data.error==false">{{ data.lable }}</div>
                              <v-alert
                                type="error"
                                outlined
                                width="80%"
                                class="ma-1 pa-0"
                                dense
                                v-model="data.error"
                              >{{ data.lable }}</v-alert>
                            </v-row>
                            <v-row align="center" justify="center">
                              <div>
                                <strong>{{data.value ? Intl.NumberFormat('fr-FR').format(data.value) : "Indéfinie" }}</strong>
                                <span>&#32;{{data.unity}}</span>
                              </div>
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
              <div>
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
                      <v-list-item-content :href="gateway.link">
                        <v-btn color="grey lighten-3" bloc :href="gateway.link" target="_blank">
                          <span class="mr-2">Configuration</span>
                        </v-btn>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </div>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState(["gateways"]),

    gateway() {
      let gateway = this.gateways.find(x => {
        return x._id === this.$route.params.id;
      });
      if(gateway) return gateway
      return false;
    },

    breadcrumbs() {
      return [
        {
          text: "Site",
          disabled: false,
          href: "/#/site/"
        },
        {
          text: "Passerelle",
          disabled: false,
          href: "/#/site/gateway/".concat(this.$route.params.id)
        }
      ];
    }
  },

  methods: {},

  mounted() {}
};
</script>
