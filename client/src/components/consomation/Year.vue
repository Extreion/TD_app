<template>
  <v-container style="background-color:grey" id="consomation-year">
    <v-tabs v-if="consomation" centered color="yellow" dark icons-and-text>
      <v-tabs-slider color="yellow"></v-tabs-slider>

      <v-tab href="#tab-1">
        Graphique
        <v-icon small>mdi-chart-bar</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Valeurs
        <v-icon small>mdi-table</v-icon>
      </v-tab>

      <v-tab-item value="tab-1">
        <v-row align="center">
          <v-btn class="ma-4" right @click="reload()">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
          <span class="title ma-4">{{this.description}}</span>
        </v-row>

        <v-container>
          <VueApexCharts width="100%" height="450px" type="bar" :options="options" :series="series"></VueApexCharts>
        </v-container>
      </v-tab-item>

      <v-tab-item value="tab-2">
        <v-row>
          <v-col class="ma-0 pa-0" align="center" justify="center" ms="12">
            <span class="title">Valeur en {{consomation.unity}}</span>
          </v-col>
        </v-row>

        <v-container>
          <v-data-table
            dense
            :items-per-page="12"
            :headers="headers"
            :items="consomation.value"
            class="elevation-25"
            hide-default-footer
          >
            <template slot="headerCell" slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template slot="items" slot-scope="{ item }">
              <tr>
                <td>{{ item.month }}</td>
                <td>{{ item.value }}</td>
                <td>{{ item.valueMonth }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      headers: [
        {
          sortable: false,
          text: "Mois",
          value: "month"
        },
        {
          sortable: false,
          text: "Valeur",
          value: "value"
        },
        {
          sortable: false,
          text: "Consomation",
          value: "valueMonth"
        }
      ]
    };
  },

  props: {
    groupId: {
      type: String
    },
    consomationId: {
      type: String
    },
    description: {
      type: String
    }
  },

  computed: {
    ...mapState(["consomations", "year"]),

    consomation() {
      this.loading = false;
      if (this.consomations) {
        return this.consomations.find(x => {
          return x._id === this.consomationId;
        });
      }
      return undefined;
    },

    options() {
      return {
        chart: {
          id: this.consomationId
        },
        plotOptions: {
          bar: {
            horizontal: false,
            dataLabels: {
              position: "bottom"
            }
          }
        },
        xaxis: {
          categories: this.consomation.value.map(x => {
            return x.month;
          })
        },
        yaxis: {
          title: {
            text: this.consomation.unity
          }
        },
        title: {
          text: "",
          align: "center"
        },
        dataLabels: {
          enabled: false
        }
      };
    },

    series() {
      return [
        {
          name: this.description,
          data: this.consomation.value.map(x => {
            return x.valueMonth;
          })
        }
      ];
    }
  },

  methods: {
    ...mapActions(["get_consomation"]),

    reload() {
      this.loading = true;
      this.get_consomation({
        groupId: this.groupId,
        consomationId: this.consomationId,
        year: this.year
      });
    }
  },

  components: {
    VueApexCharts
  },

  mounted() {
    // this.loading = true;
    // this.get_consomation({
    //   groupId: this.groupId,
    //   consomationId: this.consomationId,
    //   year: this.year
    // });
  }
};
</script>