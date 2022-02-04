<template>
  <v-menu
    :close-on-content-click="false"
    bottom
    left
    min-width="300"
    max-width="300"
    nudge-left="12"
    offset-x
    transition="slide-y-transition"
  >
    <v-btn slot="activator" class="elevation-0" color="grey" dark fab fixed style="top: 96px;" top>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-card>
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex xs12>
            <div class="text-xs-center body-2 text-uppercase sidebar-filter">Login</div>
            <v-divider class="mt-3" />
          </v-flex>
          <v-flex xs12>
            <v-text-field
                  v-model="user"
                  label="Utilisateur"
                  persistent-hint
                  required
                  outline
                ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
                  v-model="password"
                  type="password"
                  label="Mot de passe"
                  persistent-hint
                  required
                  outline
                ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-btn 
              block
              color="success"
              @click="login({user: user, password: password})" 
              :disabled="user=='' || password==''"
            >Connexion</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script>
// Utilities
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  data: () => ({
    colors: ["primary", "info", "danger", "warning", "success"],
    images: ["img\\eiffage_logo.jpg"],
    user: '',
    password: ''
  }),

  computed: {
    ...mapState("app", ["image", "color"]),
    color() {
      return this.$store.state.app.color;
    }
  },

  methods: {
    ...mapMutations("app", ["setImage"]),
    ...mapActions(['login']),
    setColor(color) {
      this.$store.state.app.color = color;
    }
  }
};
</script>

<!-- 
<style lang="scss">
.v-avatar,
.v-responsive {
  cursor: pointer;
}
</style>
-->