<template>
  <v-container>
    <v-card flat shaped v-if="counter">
      <v-toolbar flat color="grey lighten-2" class="ma-0 pa-0">
        <v-toolbar-title class="title">{{ counter.name }}</v-toolbar-title>
      </v-toolbar>
      <v-container class="title ma-0 pa-0">
        <strong>
          <v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
        </strong>
      </v-container>
      <v-tabs>
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#infos" class="primary--text">
          <v-icon>mdi-information-variant</v-icon>
        </v-tab>

        <v-tab href="#datas" class="primary--text">
          <v-icon>mdi-database</v-icon>
        </v-tab>

        <v-tab href="#histo" class="primary--text">
          <v-icon>mdi-chart-areaspline-variant</v-icon>
        </v-tab>

        <v-tab-item :value="'infos'">
          <v-card flat>
            <v-card-text align="center" class="title"
              >Informations et état du compteur</v-card-text
            >
            <v-row class="ml-5" justify="center">
              <v-col ms="12" md="5" lg="5">
                <v-list dense two-line>
                  <v-list-item-group active-class="blue--text">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Nom</v-list-item-title>
                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="counter.name"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>@Modbus</v-list-item-title>
                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="counter.address"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>

                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Description</v-list-item-title>
                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="counter.description"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title
                          >Référence constructeur</v-list-item-title
                        >
                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="counter.reference"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Activation</v-list-item-title>
                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="counter.enable ? 'Activé' : 'Désactivé'"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>Passerelle</v-list-item-title>
                        <v-list-item-subtitle
                          class="text--primary"
                          v-text="gateway.name"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
              <v-col ms="12" md="5" lg="5">
                <v-card align="center" flat class="mx-auto">
                  <v-img
                    class="white--text align-end"
                    height="300px"
                    width="300px"
                    :src="'/img/' + counter.image"
                  ></v-img>

                  <v-card-actions>
                    <v-container class="ma-5 pa-5">
                      <v-btn
                        color="grey lighten-3"
                        block
                        :href="counter.link"
                        target="_blank"
                      >
                        <span class="mr-2">Documentations</span>
                      </v-btn>
                    </v-container>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>

        <v-tab-item :value="'datas'">
          <v-card flat>
            <v-card-text align="center" class="title"
              >Données du compteur</v-card-text
            >
            <v-container fluid>
              <v-row dense>
                <v-col
                  cols="12"
                  sm="4"
                  md="5"
                  lg="3"
                  v-for="data in counter.datas"
                  :key="data._id"
                >
                  <v-card raised :color="data.error == false ? 'green' : 'red'">
                    <v-card-text class="pa-0">
                      <v-row
                        style="display: flex"
                        justify="center"
                        class="ma-0 pa-0"
                      >
                        <span class="title">{{ data.label }}</span>
                      </v-row>
                      <v-row justify="center" class="ma-0 pa-0">
                        <div>
                          <span class="title">{{
                            Intl.NumberFormat("fr-FR").format(data.value)
                          }}</span>
                          <span>&#32;{{ data.unity }}</span>
                        </div>
                      </v-row>
                      <v-row justify="center" class="ma-0 pa-0">
                        {{ data.date ? moment(data.date).fromNow() : "??" }}
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-tab-item>

        <v-tab-item :value="'histo'">
          <v-card
            color="grey lighten-4"
            :key="counter.name"
            width="100%"
            class="pt-6 mx-auto d-flex text-center"
            flat
          >
            <v-container>
              <v-tabs dense fixed-tabs>
                <v-tab class="primary--text" @click="forceRender('annee')">
                  <v-icon></v-icon> Année
                </v-tab>
                <v-tab class="primary--text" @click="forceRender('mois')">
                  <v-icon></v-icon> Mois
                </v-tab>
                <v-tab class="primary--text" @click="forceRender('jour')">
                  <v-icon></v-icon> Jour
                </v-tab>
                <v-tab-item>
                  <componentSuivi
                    :address="parseInt(this.$route.params.address)"
                    :name="counter.name"
                    :type="type"
                  ></componentSuivi>
                </v-tab-item>
                <v-tab-item>
                  <componentSuivi
                    :address="parseInt(this.$route.params.address)"
                    :name="counter.name"
                    :type="type"
                  ></componentSuivi>
                </v-tab-item>
                <v-tab-item>
                  <componentSuivi
                    :address="parseInt(this.$route.params.address)"
                    :name="counter.name"
                    :type="type"
                  ></componentSuivi>
                </v-tab-item>
              </v-tabs>
            </v-container>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import componentSuivi from "@/components/consomation/SuiviCounter.vue";
import * as moment from "moment";
moment.locale("fr");
import VueApexCharts from "vue-apexcharts";

export default {
  data() {
    return {
      //global
      gateway: null,
      moment: moment,
      type: "annee",
      //data day consumption
      day: new Date().toISOString().substr(0, 10),
      energieIdData: null,
      headersDay: [
        {
          text: "Heure",
          align: "start",
          sortable: false,
          value: "hour",
        },
        { text: "Consommation", value: "counter" },
      ],

      //data month consumption
      month: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,
      headersMonth: [
        {
          text: "Jour",
          align: "start",
          sortable: false,
          value: "day",
        },
        { text: "Consommation", value: "counter" },
      ],

      //data year consumption
      year: new Date().getFullYear(),
      headersYear: [
        {
          text: "Mois",
          align: "start",
          sortable: false,
          value: "month",
        },
        { text: "Consommation", value: "counter" },
      ],
    };
  },

  computed: {
    ...mapState([
      "gateways",
      "dayConsumption",
      "monthConsumption",
      "yearConsumption",
    ]),
    years() {
      let years = new Array();
      let year = new Date().getFullYear();
      for (let i = 0; i < 4; i++) {
        years.unshift(year - i);
      }
      return years;
    },

    counter() {
      this.gateway = this.gateways.find((x) => {
        return x._id == this.$route.params.gatewayId;
      });
      if (this.gateway === undefined) return null;
      let counter = this.gateway.counters.find((x) => {
        return x.address == this.$route.params.address;
      });
      if (counter) {
        this.energieIdData = counter.datas.find((x) => {
          return x.label === "Energie active";
        }).id;
      }
      return counter;
    },

    breadcrumbs() {
      return [
        {
          text: "Passerelles",
          disabled: false,
          href: "/#/elec/passerelles",
        },
        {
          text: "Compteur",
          disabled: false,
          href: "/#/elec/passerelles/compteurs/".concat(
            this.$route.params.gatewayId,
            "/",
            this.$route.params.address
          ),
        },
      ];
    },
  },
  components: {
    VueApexCharts,
    componentSuivi,
  },
  methods: {
    forceRender(prop) {
      this.type = prop;
    },
  },

  mounted() {},
};
</script>
