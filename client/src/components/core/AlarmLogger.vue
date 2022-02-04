<template>
  <v-main id ="core-alarmLogger" class="spacing-playground px-sm-14 rounded-lg" >
    <router-link :to="'/administration/logs'" style="text-decoration: none; color: inherit">
      <v-simple-table
        fixed-header
        height="200px"
        class="elevation-5"
      >
        <template >
          <thead>
            <tr>
              <th class="text-center" v-for="(data, idx) in theader" :key="idx">
                {{data.name}}
              </th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="(alarm,alarmIdx) in alarmList" :key="alarmIdx"  :style="{background: alarm.service_color}"  class="text-center" :class="(!alarm.log_acked) ? 'blink' : ''">
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-icon v-bind="attrs" v-on="on">{{ alarm.level_icon }}</v-icon>
                  </template>
                  <span>{{alarm.level_desc}}</span>
                </v-tooltip>
              </td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{on, attrs}">
                    <v-icon v-bind="attrs" v-on="on">{{ alarm.service_icon }}</v-icon>
                  </template>
                  <span>{{alarm.service_name}}</span>
                </v-tooltip>
              </td>
              <td>
                {{alarm.log_timestamp}}
              </td>
              <td>
                {{alarm.log_batiment}}
              </td>
              <td>
                {{alarm.log_device}}
              </td>
              <td>
                {{alarm.log_description}}
              </td>
              <td>
                <v-icon v-if="alarm.log_acked">mdi-check</v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </router-link>
  </v-main>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
      theader: [
        {name: "Type"},
        {name: "Catégorie"},
        {name: "Horodatage"},
        {name: "Bâtiment"},
        {name: "Nom Équipement"},
        {name: "Description"},
        {name: "Ack ?"}
      ],
      // alarmList: [
      //   {typeIcon: "mdi-alert-decagram", typeDesc: "Alarme", timestamp: "14/12/2021 - 17:09", categoryIcon: "mdi-flash", categoryDesc: "Électricité", poste: "P1", building: "Galerie du 8", deviceName: "Bât G2 galerie du 8", alarmDesc: "Perte de communication", acked: true, color: "lightyellow" },
      //   {typeIcon: "mdi-alert", typeDesc: "Avertissement", timestamp: "14/12/2021 - 17:09", categoryIcon: "mdi-water", categoryDesc: "Eau", poste: "P2", building: "NEFS TD11 ET TD21 TGBT", deviceName: "PC général TD11", alarmDesc: "Fuite débit eau", acked: false, color: "lightblue" },
      //   {typeIcon: "mdi-alert-circle-outline", typeDesc: "Notification", timestamp: "14/12/2021 - 17:09", categoryIcon: "mdi-gas-station", categoryDesc: "Fuel", poste: "P1", building: "Galerie du 8", deviceName: "Bât G2 galerie du 8", alarmDesc: "Description très longue d'une alarme qui vient de se produire de manière totalement aléatoire", acked: false, color: "lightgreen" },
      //   {typeIcon: "mdi-alert-decagram", typeDesc: "Alarme", timestamp: "14/12/2021 - 17:09", categoryIcon: "mdi-fire", categoryDesc: "Gaz", poste: "P2", building: "Galerie du 8", deviceName: "Bât G2 galerie du 8", alarmDesc: "Perte de communication", acked: false, color: "lightpink" },
      //   {typeIcon: "mdi-alert-decagram", typeDesc: "Alarme", timestamp: "14/12/2021 - 17:09",categoryIcon: "mdi-flash", categoryDesc: "Électricité", poste: "P1", building: "Galerie du 8", deviceName: "Bât G2 galerie du 8", alarmDesc: "Perte de communication", acked: false, color: "lightyellow" }
      // ]
  }),
  computed: {
    alarmList(){
      return this.$store.state.logsByType;
    }
  },
};
</script>

<style>
@keyframes blink {
  50% {
    background-color: white;
  }
}
@-webkit-keyframes blink {
  50% {
    background-color: white;
  }
}
.blink {
  animation: blink 1s step-start 0s infinite;
  -webkit-animation: blink 1s step-start 0s infinite;
}

</style>
