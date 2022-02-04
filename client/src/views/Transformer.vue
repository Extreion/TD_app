<template>
  <v-container>
    <v-row no-gutters class="mx-lg-10" align="center" justify="center">
      <v-col v-for="(item,idx) in transformerData" :key="idx" cols="12" md="4" lg="4">
        <v-card raised class="ma-2 pa-4" align="center" outlined>
          <v-card-title class="justify-center"> {{item.name}} </v-card-title>
          <VueApexCharts  width="100%" max-height="450px" type="radialBar" :options="chartOptions" :series="item.series"  ></VueApexCharts>
          <hr class="ma-2"/>
          <v-card-text class="text-h4">
            {{item.currentPower.toFixed(2)}} / {{item.maxPower}} kVA
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import { mapState, mapGetters } from "vuex";
export default {
  data: function(){
    return {
      P1maxPower: 800,
      P2maxPower: 800,
      
    };
  },
  computed: {
    ...mapState(["gateways","powerP1", "powerP2"]),
    transformerData: function(){
      return [
        {
          name: "Transformateur P1", 
          maxPower: this.P1maxPower,
          currentPower: (this.powerP1[2] ? this.powerP1[2].value : 0),
          series: [(((this.powerP1[2] ? this.powerP1[2].value : 0)/this.P1maxPower)*100).toFixed(2)], 
        },
        {
          name: "Transformateur P2",
          maxPower: this.P2maxPower, 
          currentPower: (this.powerP2[2] ? this.powerP2[2].value : 0),
          series: [(((this.powerP2[2] ? this.powerP2[2].value : 0)/this.P2maxPower) * 100).toFixed(2)], 
        },
      ];
    },
    chartOptions: function(){
    return {
        labels: ['Charge'],
        colors: ["#21B8EC","#D1D1D1"],
        plotOptions: {
          radialBar: {
            startAngle: -110,
            endAngle: 110
          },
        },
        colors: [
          function ({value, seriesIndex, w}){
            if(value <=50) {
              return '#85CB6E';
            } else if (value <= 75) {
              return '#FAA668'
            } else {
              return '#F03421'
            }
          }
        ],
      }
    }
  },
  components: {
    VueApexCharts
  },
  mounted() {}
};
</script>

