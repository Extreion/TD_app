<template>
  <v-container>
    <v-card
      elevation="5"
      class="mx-auto pa-12"
      align="center"
      max-width="800"
      style="overflow-wrap: normal"
    >
      <v-form @submit="onSubmit" v-if="!$store.state.user.Id" ref="form">
        <v-card-title class="justify-center"> Log In </v-card-title>
        <v-alert type="error" v-if="messageVisibility">
          {{message}}
        </v-alert>
        <v-text-field
          required
          label="Login"
          append-icon="mdi-account-box"
          v-model.trim="loginData.Login"
        ></v-text-field>
        <v-text-field
          name="password"
          :append-icon="passwordVisibility ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (passwordVisibility = !passwordVisibility)"
          :type="passwordVisibility ? 'password' : 'text'"
          required
          v-model.trim="loginData.PassWord"
          label="Password"
        ></v-text-field>
        <v-btn type="submit" color="grey darken-3" class="white--text"> Log In </v-btn>
      </v-form>
      <v-card-title v-else style="word-break: break-word;" class="justify-center pa-0"> Logged In as : {{this.$store.state.user.Login}} </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  props: [],
  data() {
    return {
      passwordVisibility: true,
      loginData: {},
      errors: [],
      messageVisibility: false,
      message: ''
    };
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit(evt) {
      evt.preventDefault();
      this.login({ ...this.loginData })
        .then(
          (res) => {
            if (res.data.success){
              this.messageVisibility = false;
            } else {
              this.messageVisibility = true;
              this.message = res.data.msg
            }
          },
        );
    }
  },
};
</script>
