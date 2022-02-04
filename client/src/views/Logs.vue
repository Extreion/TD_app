<template>
  <v-container>
    <v-card class="mt-6" elevation="5">
      <v-card-title>
        Suivi des logs et alarmes
          <downloadExcel
            :name="'Export logs - ' + new Date(Date.now()).toLocaleDateString('fr-FR')"
            :data="this.dataForExcel.data"
            :fields="this.dataForExcel.headers"
          >
            <v-btn  class="mx-6 white--text" color="red">
              Exporter au format EXCEL
            </v-btn>
          </downloadExcel>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Recherche"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="alarms"
        :search="search"
        multi-sort
      >
        <template v-slot:item.level_desc="{item}">
          <v-chip
            :color="item.level_color"
            dark
          >
            {{item.level_desc}}
          </v-chip>
        </template>
        <template v-slot:item.log_acked="props">
          <v-edit-dialog
            :return-value.sync="props.item.log_comment"
            large
            persistent
            v-if="props.item.level_canBeAcked === true"
            cancel-text="Fermer"
            save-text="Sauv."
            @save="ackLogMessage(props.item)"
          >
            <v-icon v-if="props.item.log_acked === true" color="green darken-2">
              mdi-check
            </v-icon>
            <v-icon v-else>
              mdi-pencil
            </v-icon>
            <template v-slot:input>
              <div class="mt-4 text-h6">
                Acquitter l'alarme
              </div>
              <v-text-field
                v-model="props.item.log_comment"
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
          <span v-else>
            /
          </span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import JsonExcel from "vue-json-excel";
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Type',
            align:'center',
            value: 'level_desc'
          },
          {
            text: 'Catégorie',
            align:'center',
            value: 'service_name'
          },
          {
            text: 'Horodatage',
            align:'center',
            value: 'log_timestamp'
          },
          {
            text: 'Bâtiment',
            align:'center',
            value: 'log_batiment'
          },
          {
            text: 'Nom Équipement',
            align:'center',
            value: 'log_device'
          },
          {
            text: 'Description',
            align:'center',
            value: 'log_description'
          },
          {
            text: 'Ack ?',
            align:'center',
            value: 'log_acked'
          },
          {
            text: 'Commentaire',
            align:'center',
            value: 'log_comment'
          }
        ],
        // alarms: [
        // {level_icon: "mdi-alert-decagram", level_desc: "Alarme", level_color: "red", timestamp: "14/12/2021 - 17:09", categoryIcon: "mdi-flash", categoryDesc: "Électricité", poste: "P1", building: "Galerie du 8", deviceName: "Bât G2 galerie du 8", alarmDesc: "Perte de communication", acked: true, ackComment: "Comm rétablie", canAck: true, color: "lightyellow" },
        // {typeIcon: "mdi-alert", typeDesc: "Avertissement", typeColor: "yellow", timestamp: "14/12/2021 - 17:09", categoryIcon: "mdi-water", categoryDesc: "Eau", poste: "P2", building: "NEFS TD11 ET TD21 TGBT", deviceName: "PC général TD11", alarmDesc: "Fuite débit eau", acked: false, ackComment: "", canAck: false, color: "lightblue" },
        // {typeIcon: "mdi-alert-circle-outline", typeDesc: "Notification", typeColor:"grey", timestamp: "14/12/2021 - 17:09", categoryIcon: "mdi-gas-station", categoryDesc: "Fuel", poste: "P1", building: "Galerie du 8", deviceName: "Bât G2 galerie du 8", alarmDesc: "Description très longue d'une alarme qui vient de se produire de manière totalement aléatoire", acked: false, ackComment: "", canAck: false, color: "lightgreen" },
        // {typeIcon: "mdi-alert-decagram", typeDesc: "Alarme", typeColor: "red", timestamp: "14/12/2021 - 17:09", categoryIcon: "mdi-fire", categoryDesc: "Gaz", poste: "P2", building: "Galerie du 8", deviceName: "Bât G2 galerie du 8", alarmDesc: "Perte de communication", acked: false, ackComment: "", canAck: true,color: "lightpink" },
        // {typeIcon: "mdi-alert-decagram", typeDesc: "Alarme", typeColor: "red", timestamp: "14/12/2021 - 17:09",categoryIcon: "mdi-flash", categoryDesc: "Électricité", poste: "P1", building: "Galerie du 8", deviceName: "Bât G2 galerie du 8", alarmDesc: "Perte de communication", acked: false, ackComment: "", canAck: true, color: "lightyellow" }
        // ]
      }
    },
    computed: {
      alarms() {
        return this.$store.state.logs;
      },
      dataForExcel(){
        let headers = {}
        this.headers.forEach(x => headers[x.text] = x.value)
        headers["Ack ?"] = {
          field: "log_acked",
          callback: (value) => {
            return (`${value}` == "true" ? "Oui" : "Non")
          }
        }
        return {
          data: this.alarms,
          headers: headers
        }
      }
    },
    methods: {
      ...mapActions(["ack_log"]),
      ackLogMessage(item){
        this.ack_log({'log_id': item.log_id, 'log_comment': item.log_comment});
      }
    },
    components: {
      "downloadExcel": JsonExcel
    }
  }
</script>