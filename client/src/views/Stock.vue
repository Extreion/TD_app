<template>
  <v-container>
    <v-card class="mt-6" elevation="5">
      <v-card-title>
        Stock
          <!--<downloadExcel
            :name="'Export logs - ' + new Date(Date.now()).toLocaleDateString('fr-FR')"
            :data="this.dataForExcel.data"
            :fields="this.dataForExcel.headers"
          >
            <v-btn  class="mx-6 white--text" color="red">
              Exporter au format EXCEL
            </v-btn>
          </downloadExcel>-->
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          :expanded="expanded"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="stock_items"
        :search="search"
        item-key="stock_id"
        multi-sort
        @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
      >
        <template v-slot:expanded-item="{headers, item}">
          <td :colspan="headers.length">
            <v-row>
              <v-col cols="12" lg="2">
                <v-card
                  outlined
                >
                  <v-card-title>
                    Serial No.
                  </v-card-title>
                  <v-card-text>
                    4568752
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" lg="2">
                <v-card
                  outlined
                >
                  <v-card-title
                    class="text-button"
                  >
                    Serial No.
                  </v-card-title>
                  <v-card-text>
                    4568752
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" lg="2">
                <v-card
                  outlined
                >
                  <v-card-title>
                    Serial No.
                  </v-card-title>
                  <v-card-text>
                    4568752
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </td>
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
        expanded: [],
        search: '',
        headers: [
          {
            text: 'Status',
            align:'center',
            value: 'stock_status'
          },
          {
            text: 'ID',
            align:'center',
            value: 'stock_id'
          },
          {
            text: 'PO',
            align:'center',
            value: 'po_number'
          },
          {
            text: 'Ordered',
            align:'center',
            value: 'stock_ordered'
          },
          {
            text: 'Project Name',
            align:'center',
            value: 'project_name'
          },
          {
            text: 'Product Code',
            align:'center',
            value: 'stock_productCode'
          },
          {
            text: 'Quantity',
            align:'center',
            value: 'stock_Quantity'
          },
          {
            text: 'Comment',
            align:'center',
            value: 'stock_Comment'
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
      stock_items() {
        return [
          {stock_status: "In Stock", stock_id: "100"}
        ]
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