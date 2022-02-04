<template>
  <v-container>
    <v-row>
      <v-col sm="12">
        <v-card raised>
          <v-toolbar dense color="grey lighten-3">
            <v-toolbar-title>Puissance site</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-card v-if="Object.keys(powerSite).length == 0" class="d-flex" style="align-items: center">
                <v-progress-circular
                  class="mx-6"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
                <v-card-text class="text--primary">
                  <strong class="title">Données en cours d'acquisition</strong>
                </v-card-text>
              </v-card>
              <v-col
                v-else
                sm="12"
                md="6"
                lg="4"
                v-for="power in powerSite"
                :key="power.label"
              >
                <v-card shaped>
                  <v-card-text class="text--primary">
                    <span>{{ power.label }} :</span>
                    <strong class="title">{{ " " + power.value + " " }}</strong>
                    <span>{{ power.unity }}</span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col sm="12">
        <v-card raised>
          <v-toolbar dense color="grey lighten-3">
            <v-toolbar-title>Puissance poste 1</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-card v-if="Object.keys(powerP1).length == 0" class="d-flex" style="align-items: center">
                <v-progress-circular
                  class="mx-6"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
                <v-card-text class="text--primary">
                  <strong class="title">Données en cours d'acquisition</strong>
                </v-card-text>
              </v-card>
              <v-col
                v-else
                sm="12"
                md="6"
                lg="4"
                v-for="power in powerP1"
                :key="power.label"
              >
                
                <v-card shaped>
                  <v-card-text class="text--primary">
                    <span>{{ power.label }} :</span>
                    <strong class="title">{{ " " + power.value + " " }}</strong>
                    <span>{{ power.unity }}</span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12">
        <v-card raised>
          <v-toolbar dense color="grey lighten-3">
            <v-toolbar-title>Puissance poste 2</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-card v-if="Object.keys(powerP2).length == 0" class="d-flex" style="align-items: center">
                <v-progress-circular
                  class="mx-6"
                  indeterminate
                  color="primary"
                ></v-progress-circular>
                <v-card-text class="text--primary">
                  <strong class="title">Données en cours d'acquisition</strong>
                </v-card-text>
              </v-card>
              <v-col
                v-else
                sm="12"
                md="6"
                lg="4"
                v-for="power in powerP2"
                :key="power.label"
              >
                <v-card shaped>
                  <v-card-text class="text--primary">
                    <span>{{ power.label }} :</span>
                    <strong class="title">{{ " " + power.value + " " }}</strong>
                    <span>{{ power.unity }}</span>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-container>
      <v-menu ref="menu" :close-on-content-click="false" v-model="menu">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" color="red" class="white--text"
            ><v-icon>mdi-calendar-edit</v-icon>Année :
            {{ formattedDate }}</v-btn
          >
        </template>
        <v-date-picker
          color="red"
          no-title
          reactive
          ref="picker"
          v-model="menuDate"
          @input="save"
          :max="maxDate + '-NaN-NaN'"
          :min="minDate + '-NaN-NaN'"
        ></v-date-picker>
      </v-menu>
      <v-row align="center">
        <p align="center" class="pa-4 title">
          Suivi du maximum de puissance en kW pour l'année {{ formattedDate }}
        </p>
      </v-row>
      <VueApexCharts
        width="100%"
        height="450px"
        type="line"
        :options="chartOptions"
        :series="series"
        class="my-4"
      ></VueApexCharts>
    </v-container>
  </v-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      menu: false,
      menuDate: new Date().getFullYear().toString() + "-NaN-NaN",
      formattedDate: new Date().getFullYear().toString(),
      maxDate: new Date().getFullYear(),
      minDate: new Date().getFullYear() - 4,
    };
  },

  computed: {
    ...mapState(["gateways", "powerP1", "powerP2", "powerSite"]),
    chartOptions() {
      return {
        chart: {
          height: 450,
          type: "line",
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              reset: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
            },
          },
        },
        xaxis: {
          tickPlacement: "between",
          categories: [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre",
          ],
          title: {
            text: "Mois",
          },
        },
        yaxis: {
          max:
            Math.ceil(
              (this.series[0].data == undefined
                ? this.contractPower
                : Math.max(...this.series[0].data) > this.contractPower
                ? Math.max(...this.series[0].data)
                : this.contractPower) / 100
            ) * 100,
          title: {
            text: "kW",
          },
          labels: {
            formatter: function (val) {
              return val.toFixed(0);
            },
          },
        },
        annotations: {
          yaxis: [
            {
              y: this.contractPower,
              borderColor: "#FB9B34",
              borderWidth: 3,
              label: {
                borderColor: "#FB9B34",
                style: {
                  color: "#fff",
                  background: "#FB9B34",
                },
                text: "Limite du contrat EDF : " + this.contractPower + "kW",
              },
            },
          ],
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return val + " kW";
          },
        },
        responsive: [
          {
            breakpoint: 650,
            options: {
              dataLabels: {
                enabled: false,
              },
              markers: {
                size: 5,
                colors: "#0078FB",
              },
            },
          },
        ],
      };
    },
    series() {
      let data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < Object.keys(this.$store.state.maxPower).length; i++) {
        data[this.$store.state.maxPower[i].month - 1] =
          this.$store.state.maxPower[i].maxValue;
      }
      return [
        {
          name: "Valeur maximale atteinte",
          type: "line",
          data: data,
        },
      ];
    },
    contractPower(){
      if(this.$store.state.maxPower && this.$store.state.maxPower[0])
        return parseInt(this.$store.state.maxPower[0].edfContractPower)
      else
        return 0
    }
  },

  methods: {
    ...mapActions(["get_max_power"]),
    save(date) {
      this.$refs.menu.save(date);
      this.$refs.picker.internalActivePicker = "YEAR";
      this.menu = false;
      this.get_max_power({ year: date.substr(0, date.indexOf("-")) });
    },
  },
  watch: {
    menu(val) {
      val &&
        this.$nextTick(() => (this.$refs.picker.internalActivePicker = "YEAR"));
    },
    menuDate(date) {
      this.formattedDate = this.menuDate.substring(0, 4);
    },
  },
  mounted() {},
  components: {
    VueApexCharts,
  },
};
</script>

<style></style>
