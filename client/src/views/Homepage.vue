<template>
  <v-container>
    <v-card raised class="mx-auto ma-2 pa-4" align="center" max-width="800">
      <v-img src="\img\logo_eiffage.png" width="250px"></v-img>
      <v-card-title class="justify-center"> Bienvenue ! </v-card-title>
      <v-card-text>
        <p>Ce logiciel a été développé dans le cadre de la norme ISO 50 001.<br/> Il permet un suivi énergétique du site Eiffage à Verquin.</p>
      </v-card-text>
    </v-card>
    <v-img
      contain
      src="\img/Plan_masse.png"
    ></v-img>
    <v-row>
      <v-col cols="12" lg="6">
        <v-img
          contain
          src="\img\Legende_1.png"
        ></v-img>
      </v-col>
      <v-col cols="12" lg="6">
        <v-img
          contain
          src="\img\Legende_2.png"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
  })
};
</script>

