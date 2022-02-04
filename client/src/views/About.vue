<template>
  <v-container>
    <v-card raised class="ma-2 pa-4">
      <v-card-title>Objectif</v-card-title>
      <v-card-text>
        <p>Ce logiciel a pour objectif de faire un suivi de la consommation énergétique et de superviser l'ensemble des compteurs du site Eiffage Énergie Systèmes à Verquin.</p>
        <p>Il a été développé afin de répondre à la norme <a href="https://fr.wikipedia.org/wiki/ISO_50001">ISO 50001</a>.</p>
      </v-card-text>
    </v-card>
    <v-card raised class="ma-2 pa-2">
      <v-card-title>Documents utiles</v-card-title>
      <v-card-text>
        <p>Ci-dessous se trouve les plans du site de Verquin :</p>
          <div class=" my-6"><strong>Informations</strong></div>
          <v-row  v-for="(item, idx) in documents" :key="idx" color="primary">
            <v-col v-for="(info,i) in item" :key="i" col="2">
                <v-icon v-text="info.icon"></v-icon>
                <a :href="'/documents/' + info.link" download>{{info.text}}</a>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    </v-card>
    <v-card raised class="ma-2 pa-2">
      <v-card-title>Contact</v-card-title>
      <v-card-text>
        <p>Ce logiciel est développé par M. OUARET Nassim, M. SUEUR Samuel et M. DEFRANCE Henri. Nous sommes ouverts à toutes critiques ou propositions d'améliorations.</p>
          <div class=" my-6"><strong>Informations</strong></div>
          <v-row  v-for="(item, i) in users" :key="i"color="primary">
            <v-col v-for="(info,idx) in item" col="2" :key="idx">
                <v-icon v-text="info.icon"></v-icon>
                {{info.text}}
            </v-list-item>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card raised class="ma-2 pa-2">
      <v-card-title>Version des applications</v-card-title>
      <v-card-text>
        <p>Ce logiciel utilise les technologies suivantes :</p>
          <div class=" my-6"><strong>Informations</strong></div>
          <v-row  v-for="(item, i) in apps" :key="i" color="primary">
            <v-col v-for="(info,idx) in item" :key="idx" col="2">
                <v-icon v-text="info.icon"></v-icon>
                {{info.text}}
            </v-list-item>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    documents: [
      [
        { text: "Architecture Réseau", icon: "mdi-file-pdf-box", link: "Architecture Réseau.pdf"},
        { text: "Plan Site", icon: "mdi-file-pdf-box", link: "Plan Site.pdf" },
      ],
      [
        { text: "Schéma unifilaire", icon: "mdi-file-pdf-box", link: "Schéma unifilaire.pdf" },
        { text: "Tableau Équipements", icon: "mdi-file-excel", link: "Tableau équipements.xlsx"},
      ]
    ],
    users: [
      [
        { text: "Nassim Ouaret", icon: "mdi-account"},
        { text: "Numéro tel : 03 21 54 73 52 ", icon: "mdi-deskphone" },
        { text: "E-mail : nassim.ouaret@eiffage.com", icon: "mdi-email" }
      ],
      [
        { text: "Samuel Sueur", icon: "mdi-account"},
        { text: "Numéro tel : 03 21 54 73 52 ", icon: "mdi-deskphone" },
        { text: "E-mail : samuel.sueur@eiffage.com", icon: "mdi-email" }
      ],
      [
        { text: "Henri Defrance", icon: "mdi-account"},
        { text: "Numéro tel : 03 21 54 73 52 ", icon: "mdi-deskphone" },
        { text: "E-mail : henri.defrance@eiffage.com", icon: "mdi-email" }
      ]
    ],
    apps: [
      [
        {text: "Node.JS - V16.13.1", icon: "mdi-nodejs"}
      ],
      [
        {text: "Vue.JS - V2.6.10", icon: "mdi-vuejs"}
      ],
      [
        {text: "Vuetify - V2.1.0", icon: "mdi-vuetify"}
      ]
    ]
  })
};
</script>

