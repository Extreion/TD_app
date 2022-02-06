<template>
  <v-container>
    <v-card raised class="mx-auto ma-2 pa-4" align="center" max-width="800">
      <v-img src="\img\logo_eiffage.png" width="250px"></v-img>
      <v-card-title class="justify-center"> Welcome to Tillman Domotics!</v-card-title>
      <v-card-text>
        <p>This website allows Tillman Domotics' employees to manage company stock.<br/> Please make sure to log in to proceed.</p>
      </v-card-text>
      <v-btn to="/login" color="grey darken-3" class="white--text" v-if="!isAuthentified"> Log In </v-btn>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
  }),
  computed: () => ({
    isAuthentified() {
      return this.$store.state.user.Id ? true : false
    },
  })
};
</script>

