<template>
    <v-container class="spacing-playground px-sm-16" fill-height>
      <v-row>
        <v-col v-for="(item, idx) in dashboardData" :key='idx' cols="12" sm="12" md="6">
          <v-hover>  
            <template v-slot:default="{hover}">
              <v-card raised shaped :class="`elevation-${hover ? 10 : 5}`" class="transition-swing" :to="item.route" height="100%" min-height ="150px">
                <v-card-title>{{item.title}}</v-card-title>
                <v-card-subtitle :class="item.color + '--text'">Communication TR: <strong>{{item.comState}}</strong></v-card-subtitle>
                <v-card-text>
                    <v-row>
                      <v-col v-for="(data,idxData) in item.data" :key='idxData'>
                        <strong>{{data.name}} :</strong> {{data.value}}
                      </v-col>
                    </v-row>
                </v-card-text>
              </v-card>
            </template>
          </v-hover>
        </v-col>
      </v-row>
      
    </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  data: function(){
    return {
    }
  },
  computed: {
    ...mapState(["gateways", "powerP1", "powerP2", "powerSite"]),
    ...mapGetters({
        gateCount:"nbrGateways",
        gateError:"nbrGatewaysError",
        gateDisabled:"nbrGatewaysDisabled",
        countNumber:"nbrCounters",
        socket_status:"socketio_status"
    }),
    dashboardData: function(){
      return [
        {title: "Électricité", comState: (this.socket_status) ? "OK": "NOK", color: (this.socket_status) ? "green": "red", route: "/elec/passerelles"  , data: [
            {name:"Nombre de passerelles", value: this.gateCount},
            {name:"Nombre de compteurs", value: this.countNumber},
            {name:"Erreur de com", value:this.gateError},
            {name:"Passerelles désactivées", value: this.gateDisabled},
            {name:"Puissance site", value: (this.powerSite[0] ? parseInt(this.powerSite[0].value).toFixed(0) + ' kW' : "À venir")}
          ] 
        },
        {title: "Eau", comState: "", route: "/eau", color:"", data: [
            {name:"Data 6", value: "Value 6"},
            {name:"Data 7", value: "Value 7"},
            {name:"Data 8", value: "Value 8"},
          ]
        },
        {title: "Gaz", comState: "", route: "/gaz", color:"", data: [
            {name:"Data 9", value: "Value 9"},
          ]
        },
        {title: "Fuel", comState: "", color:"", route: "/fuel" }
      ]
    }

  },
  watch: {},
  methods: {},
  mounted: function() {}
};
</script>

<style>
.blink_text {
  animation: 2s blinker linear infinite;
  -webkit-animation: 1s blinker linear infinite;
  -moz-animation: 1s blinker linear infinite;
}

@-moz-keyframes blinker {
  0% {
    opacity: 1;
  }
  /* 50% {
    opacity: 0;
  } */
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes blinker {
  0% {
    opacity: 1;
  }
  /* 50% {
    opacity: 0;
  } */
  100% {
    opacity: 1;
  }
}

@keyframes blinker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>