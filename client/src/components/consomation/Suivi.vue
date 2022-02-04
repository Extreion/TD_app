<template>
  <v-container class="pa-0" fluid>
    <p class="pa-4 title" v-if="type == 'annee'">
      Suivi de consommation annuelle
    </p>
    <p class="pa-4 title" v-if="type == 'mois'">
      Suivi de consommation mensuelle
    </p>
    <p class="pa-4 title" v-if="type == 'jour'">
      Suivi de consommation journalier
    </p>
    <v-row justify="center">
      <v-btn @click="getData()">
        <v-icon> mdi-refresh </v-icon> Rafraîchir les données
      </v-btn>
    </v-row>
    <v-row justify="center">
      <v-col lg="3" sm="6" v-if="type == 'jour'">
        <v-select
          :disabled="dataIsLoading"
          :items="jour"
          outlined
          dense
          v-model="jourChoisi"
          @change="getData()"
        >
        </v-select>
      </v-col>
      <v-col lg="3" sm="6" v-if="type == 'mois' || type == 'jour'">
        <v-select
          :disabled="dataIsLoading"
          :items="mois"
          item-text="txt"
          item-value="val"
          outlined
          dense
          v-model="moisChoisi"
          @change="getData()"
        >
        </v-select>
      </v-col>
      <v-col lg="3" sm="6">
        <v-select
          :disabled="dataIsLoading"
          :items="annees"
          v-model="annee"
          dense
          outlined
          @change="getData()"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-container>
      <v-tabs dense fixed-tabs>
        <v-tab class="primary--text">
          <v-icon>mdi-chart-histogram</v-icon>
          <span class="d-none d-sm-block">Histogramme</span>
        </v-tab>
        <v-tab class="primary--text">
          <v-icon>mdi-chart-donut</v-icon>
          <span class="d-none d-sm-block">Diagramme circulaire</span>
        </v-tab>
        <v-tab class="primary--text">
          <v-icon>mdi-table</v-icon>
          <span class="d-none d-sm-block">Tableau</span>
        </v-tab>
        <v-tab-item>
          <v-progress-linear
            v-if="dataIsLoading"
            color="red"
            indeterminate
            :width="7"
            class="my-6"
          >
          </v-progress-linear>
          <VueApexCharts
            width="100%"
            height="450px"
            type="bar"
            :options="options"
            :series="series"
            class="my-4"
          ></VueApexCharts>
        </v-tab-item>
        <v-tab-item>
          <v-row>
            <v-col align="center" class="my-4">
              <p class="title">
                Consommation
                <span v-if="type == 'annee'">annuelle:</span>
                <span v-else-if="type == 'mois'">mensuelle:</span>
                <span v-else>journalière:</span>
                {{
                  Intl.NumberFormat("fr-FR").format(
                    seriesDonut.reduce((partial_sum, a) => partial_sum + a, 0)
                  )
                }}
                kWh
              </p>
            </v-col>
          </v-row>
          <v-progress-linear
            v-if="dataIsLoading"
            color="red"
            indeterminate
            :width="7"
            class="my-6"
          >
          </v-progress-linear>
          <VueApexCharts
            width="100%"
            height="450px"
            type="donut"
            :options="optionsDonut.chartOptions"
            :series="seriesDonut"
          ></VueApexCharts>
        </v-tab-item>
        <v-tab-item>
          <downloadExcel
            v-if="isAuthentified"
            :name="
              this.name + ' - Suivi energetique annuel - ' + this.annee + '.xls'
            "
            :data="this.dataForExcel.data"
            :fields="this.dataForExcel.headers"
          >
            <v-btn class="my-6 white--text" color="red">
              Exporter au format EXCEL
            </v-btn>
          </downloadExcel>
          <v-progress-linear
            v-if="dataIsLoading"
            color="red"
            indeterminate
            :width="7"
            class="my-6"
          >
          </v-progress-linear>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="(header, idx) in table.headers"
                    :key="idx"
                    class="text-center"
                  >
                    {{ header.value }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, idxRow) in table.rows" :key="idxRow">
                  <td v-for="item in row.data">
                    {{ item.value }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>
      </v-tabs>
      <div v-if="counters.length">
        <strong>Adresse des compteurs : | </strong>
        <span v-for="(counter, idx) in counters" :key="idx">
          {{counter}} |
        </span>
      </div>
    </v-container>
  </v-container>
</template>
<script>
import VueApexCharts from "vue-apexcharts";
import { mapActions, mapState, mapGetters } from "vuex";
import JsonExcel from "vue-json-excel";
export default {
  data: () => ({
    annee: new Date().getFullYear(),
    categoriesAnnee: [
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
    heures: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
    moisChoisi: new Date().getMonth(),
    jourChoisi: new Date().getDate(),
  }),
  props: {
    type: {
      default: "annee",
      type: String,
      required: true,
    },
    id: {
      default: 1,
      type: Number,
      required: true,
    },
    name: {
      default: "",
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapState(["datas"]),
    ...mapGetters(["dataIsLoading"]),
    nbrJoursDansMois() {
      let array = new Array();
      for (
        let i = 1;
        i <= new Date(this.annee, this.moisChoisi + 1, 0).getDate();
        i++
      ) {
        array[i - 1] = i;
      }
      return array;
    },
    jour() {
      let maxJour = Math.max(...this.nbrJoursDansMois);
      if (this.jourChoisi > maxJour) {
        this.jourChoisi = maxJour;
      }
      return this.nbrJoursDansMois;
    },
    mois() {
      return [
        { txt: "Janvier", val: 0 },
        { txt: "Février", val: 1 },
        { txt: "Mars", val: 2 },
        { txt: "Avril", val: 3 },
        { txt: "Mai", val: 4 },
        { txt: "Juin", val: 5 },
        { txt: "Juillet", val: 6 },
        { txt: "Août", val: 7 },
        { txt: "Septembre", val: 8 },
        { txt: "Octobre", val: 9 },
        { txt: "Novembre", val: 10 },
        { txt: "Décembre", val: 11 },
      ];
    },
    annees() {
      let annneeEnCours = new Date().getFullYear();
      return [
        annneeEnCours,
        annneeEnCours - 1,
        annneeEnCours - 2,
        annneeEnCours - 3,
        annneeEnCours - 4,
      ];
    },
    options() {
      return {
        chart: {
          id: "total",
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        xaxis: {
          categories:
            this.type == "annee"
              ? this.categoriesAnnee
              : this.type == "mois"
              ? this.nbrJoursDansMois
              : this.heures,
          labels: {
            show: true,
            trim: false,
            rotate:
              this.type == "annee"
                ? -45
                : this.type == "mois"
                ? 0
                : 0,
            minHeight: 40,
            hideOverlappingLabels: true,
          },
        },
        yaxis: {
          title: {
            text: "kWh",
          },
        },
        title: {
          text: "",
          align: "center",
        },
        legend: {
          position: "top",
          offsetY: 0,
        },
        dataLabels: {
          enabled: false,
        },
      };
    },
    counters(){
      let addresses = new Array()
      if(this.datas && this.datas.counters){
        for(let i =0; i < this.datas.counters.length; i++){
          addresses.push(this.datas.counters[i])
        }
      }
      return addresses
    },
    series() {
      if (this.datas && this.datas.data) {
        let series = new Array();
        for (let i = 0; i < this.datas.data.length; i++) {
          series.push({
            name: this.datas.seriesLabel[i],
            data: this.datas.data[i],
          });
        }
        return series;
      }
      return [];
    },
    seriesDonut() {
      let series = new Array();
      if (this.datas && this.datas.data) {
        for (let i = 0; i < this.datas.data.length; i++) {
          series[i] = this.datas.data[i].reduce(
            (partial_sum, a) => partial_sum + a,
            0
          );
        }
      }
      return series;
    },
    optionsDonut() {
      let labelStrings = new Array();
      if (this.datas && this.datas.seriesLabel) {
        labelStrings = this.datas.seriesLabel;
      }
      return {
        chartOptions: {
          labels: labelStrings,
          legend: {
            position: "top",
          },
        },
      };
    },
    table() {
      let headers = undefined;
      let iteration = 0;
      if (this.type == "annee") {
        headers = [{ value: "Mois" }];
        iteration = this.categoriesAnnee.length;
      } else if (this.type == "mois") {
        headers = [{ value: "Jour" }];
        iteration = this.nbrJoursDansMois.length;
      } else {
        headers = [{ value: "Heure" }];
        iteration = this.heures.length;
      }
      let rows = new Array();
      if (this.datas) {
        for (let i = 0; i < this.datas.seriesLabel.length; i++) {
          headers.push({ value: this.datas.seriesLabel[i] });
        }
        for (let j = 0; j < iteration; j++) {
          rows.push({ data: [] });
          if (this.type == "annee")
            rows[j].data.push({ value: this.categoriesAnnee[j] });
          else if (this.type == "mois")
            rows[j].data.push({ value: this.nbrJoursDansMois[j] });
          else rows[j].data.push({ value: this.heures[j] });
          for (let k = 0; k < this.datas.data.length; k++) {
            rows[j].data.push({ value: this.datas.data[k][j] });
          }
        }
      }
      return {
        headers: headers,
        rows: rows,
      };
    },
    dataForExcel() {
      let headers = {};
      let data = [];
      if (this.type == "annee") headers["Mois"] = "key";
      else if (this.type == "mois") headers["Jour"] = "key";
      else headers["Heure"] = "key";
      if (this.datas && this.datas.data) {
        for (let i = 0; i < this.datas.data.length; i++) {
          headers[this.datas.seriesLabel[i] + " (kWh)"] = "value" + (i + 1);
        }
        if (this.type == "annee") {
          for (let i = 0; i < this.table.rows.length; i++) {
            data.push({ key: this.table.rows[i].data[0].value });
            for (let j = 1; j < this.table.rows[i].data.length; j++) {
              data[i]["value" + j] = this.table.rows[i].data[j].value;
            }
          }
        }
      }
      return {
        data: data,
        headers: headers,
      };
    },
    isAuthentified() {
      return this.$store.state.user.Id ? true : false;
    },
  },
  methods: {
    ...mapActions(["get_data_consommation"]),
    getData() {
      this.get_data_consommation({
        id: this.id,
        annee: this.annee,
        mois: this.moisChoisi + 1,
        jour: this.jourChoisi,
        type: this.type,
      });
    },
  },
  watch: {
    type: function (val) {
      this.get_data_consommation({
        id: this.id,
        annee: this.annee,
        mois: this.moisChoisi + 1,
        jour: this.jourChoisi,
        type: this.type,
      });
    },
  },
  mounted() {
    this.get_data_consommation({
      id: this.id,
      annee: this.annee,
      mois: this.moisChoisi + 1,
      jour: this.jourChoisi,
      type: this.type,
    });
  },
  components: {
    VueApexCharts,
    downloadExcel: JsonExcel,
  },
};
</script>
