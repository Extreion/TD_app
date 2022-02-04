<template>
    <v-container class="spacing-playground px-sm-16" fill-height>
      <div class="text-h4 my-6">Paramétrage des mails</div>
      <v-expansion-panels>
        <v-expansion-panel v-if="mails.data" v-for="(service, idx) in mails.data" :key="idx">
          <v-expansion-panel-header><span><v-icon class="mx-3" :color="service.service_color">{{service.service_icon}}</v-icon>{{service.name}}</span></v-expansion-panel-header>
          <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" md="6">
              <v-form v-model="emailRulesOk">
                <v-text-field
                  v-model.trim="email"
                  label="Ajouter un email"
                  :rules="emailRules"
                >
                  <template v-slot:append-outer>
                    <v-btn  icon :disabled="!emailRulesOk" @click="addEmail(service.service_id)">
                      <v-icon color="red">
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </template>
                </v-text-field> 
              </v-form>
            </v-col>
            <v-divider inset vertical class="d-none d-md-inline">
            </v-divider>
            <v-col cols="12" md="6">
              <div>Emails associés au service</div>
              <v-text-field
                v-if="service.mails"
                v-for="(mail, key) in service.mails"
                :key="key"
                :value="mail.mail"
                readonly
                append-outer-icon="mdi-minus"
              >
                <template v-slot:append-outer>
                    <v-btn  icon @click="removeEmail(mail)">
                      <v-icon color="red">
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </template>
              </v-text-field>
            </v-col>
          </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data: function(){
    return {
      emailRules: [
        value => !!value || 'Champ requis.',
        value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'E-mail invalide.'
        },
      ],
      email: '',
      emailRulesOk: false,
    }
  },
  computed: {
    mails(){
      return this.$store.state.mails
    }
  },
  watch: {},
  methods: {
    ...mapActions(["get_mails","add_mail","delete_mail"]),
    addEmail(service_id){
        this.add_mail({
          "mail": this.email,
          "id": service_id
        });
    },
    removeEmail(mail){
      this.delete_mail({
        "id": mail.id
      })
    }
  },
  mounted(){
    this.get_mails()
  }
};
</script>

<style>
</style>