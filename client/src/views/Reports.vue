<template>
  <v-container >
    <v-card class="mt-6" elevation="5">
      <v-card-title>
        Rapports disponibles
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Recherche"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-progress-linear
      v-if="dataLoading"
      indeterminate
      color="red"
      ></v-progress-linear>
      <v-data-table
        :headers="headers"
        :items="reports"
        :search="search"
        multi-sort
      >
        <template v-slot:item.filename="row">
          <span @click="downloadTemplate(row.item)" style="cursor:pointer">
            <v-icon>mdi-download</v-icon><span>{{row.item.filename}}</span>
          </span>
        </template>
        <template v-slot:item.generateReport="row">
          <v-edit-dialog
              large
              persistent
              cancel-text="Fermer"
              save-text="Générer"
              @save="generateReport(row.item)"
            >
              <v-icon>
                mdi-download
              </v-icon>
              <template v-slot:input>
                <div class="mt-4 text-h6">
                  Choisir l'année
                </div>
                <div class="text-center mt-6"><strong>Année</strong></div>
                <v-select
                  v-model="generateYear"
                  autofocus
                  :items="years"
                  prepend-icon="mdi-calendar"
                ></v-select>
              </template>
          </v-edit-dialog>
          <!--<v-select 
            dense
            :items="years" 
            hide-details="auto"
             >
          </v-select>
          <v-icon @click="generateReport(row.item)">
            mdi-download
          </v-icon>-->
        </template>
        <template v-slot:item.timestampUser="props">
          <span v-if="props.item.timestampUser">{{new Date(props.item.timestampUser).toLocaleString('fr-FR')}}</span>
          <span v-else>Jamais</span>
        </template>
        <template v-slot:item.timestampAuto="props">
          <span v-if="props.item.timestampAuto">{{new Date(props.item.timestampAuto).toLocaleString('fr-FR')}}</span>
          <span v-else>Jamais</span>
        </template>
        <template v-slot:item.months="props">
          <v-edit-dialog
            :return-value.sync="props.item.months"
            large
            persistent
            cancel-text="Fermer"
            save-text="Sauv."
            @save="changeReportFrequency(props.item)"
          >
          <span>
            <v-icon>mdi-calendar-edit</v-icon>Changer la fréquence
          </span>
            <template v-slot:input>
              <div class="mt-4 text-h6">
                Changer la fréquence
              </div>
              <div class="text-center mt-6"><strong>Mois</strong></div>
              <v-select
                v-model="props.item.months"
                autofocus
                multiple
                :items="monthValues"
                item-text="txt"
                item-value="val"
                prepend-icon="mdi-calendar"
              ></v-select>
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data () {
    return {
        search: '',
        generateYear: new Date().getFullYear(),
        headers: [
          {
            text: 'Nom du rapport',
            align:'center',
            value: 'name'
          },
          {
            text: 'Modèle',
            align:'center',
            value: 'filename'
          },
          {
            text: 'Fréquence',
            align:'center',
            value: 'months'
          },
          {
            text: 'Description',
            align:'center',
            value: 'description'
          },
          {
            text: 'Générer',
            align:'center',
            value: 'generateReport'
          },
          {
            text: 'Dernière génération manuelle',
            align:'center',
            value: 'timestampUser'
          },
          {
            text: 'Dernier envoi automatique',
            align:'center',
            value: 'timestampAuto'
          },
        ],
        monthValues: [
          {txt: "Janvier", val: 0},
          {txt: "Février", val: 1},
          {txt: "Mars", val: 2},
          {txt: "Avril", val: 3},
          {txt: "Mai", val: 4},
          {txt: "Juin", val: 5},
          {txt: "Juillet", val: 6},
          {txt: "Août", val: 7},
          {txt: "Septembre", val: 8},
          {txt: "Octobre", val: 9},
          {txt: "Novembre", val: 10},
          {txt: "Décembre", val: 11},
        ]
        // reports: [
        //   {reportName : "Bilan annuel", reportFilename: "Modele_rapport_site_annuel.xlsx", reportFrequency: "Tous les mois", reportDesc: "Rapport contenant le bilan annuel énergétique du site", lastReportDate: "16/12/2021", lastAutoReportDate: "16/12/2021"},
        //   {reportName : "Bilan mensuel", reportFilename: "Modele_rapport_P1_annuel.xlsx", reportFrequency: "Tous les mois", reportDesc: "Rapport contenant le bilan mensuel énergétique du site", lastReportDate: "16/12/2021", lastAutoReportDate: "16/12/2021"}
        // ]
    }
  },
  computed: {
    ...mapState(["dataLoading"]),
    reports(){
      let reports = new Array()
      if (this.$store.state.reports.constructor.toString().indexOf("Array") != -1)
        reports = this.$store.state.reports
      else
        reports.push(this.$store.state.reports)
      reports.forEach(report => {
        if (report.months.constructor.toString().indexOf("Array") == -1)
          report.months = report.months.split(',').map(x => parseInt(x))
      })
      return reports
    },
    years(){
      let currentYear = new Date().getFullYear()
      return [
        currentYear,
        currentYear - 1,
        currentYear - 2,
        currentYear - 3,
        currentYear - 4
      ]
    }
  },
  methods: {
    ...mapActions(["get_template", "get_report","get_reports","set_report_frequency"]),
    generateReport(item){
      this.get_report({"id": item.report_id, "reportName": item.name, "year": this.generateYear})
    },
    changeReportFrequency(item){
      item.months.sort(function (a,b){
        return a - b
      })
      let months = item.months.join(",")
      this.set_report_frequency({"id": item.report_id, "months": months})
    },
    downloadTemplate(item){
      this.get_template({"id": item.report_id, "filename": item.filename})
    }
  },
  mounted() {
    this.get_reports();
  }
}
</script>

