<template>
  <div v-if="$store.state.currentUser == 'not logged'">
    <div height="400px" v-if="logging == true">
      <v-flex>
        <v-card class="d-flex align-center justify-center" height="400px">
          <v-progress-circular :size="50" indeterminate color="primary"></v-progress-circular>
        </v-card>
      </v-flex>
    </div>

    <div v-else>
      <div v-if="loginform == true">
        <v-card class="pa-8" outlined tile>
          <v-card width="400" pa-md-4 mx class="pa-md-8 mx-lg-auto">
            <v-card-title>Seller Bot - Login</v-card-title>
            <v-card-text>
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="submit">
                  <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                    <v-text-field color="primary" v-model="email" :error-messages="errors" label="E-mail"
                      required></v-text-field>
                  </validation-provider>
                  <validation-provider v-slot="{ errors }" name="password" rules="required">
                    <v-text-field v-model="password" :error-messages="errors" label="Password" required></v-text-field>
                  </validation-provider>
                  <v-card-actions>
                    <v-btn color="primary" class="mr-4" type="submit" :disabled="invalid">
                      Login
                    </v-btn>
                  </v-card-actions>
                </form>
              </validation-observer>
            </v-card-text>
          </v-card>
        </v-card>
      </div>

      <div v-else>
        <v-card class="pa-8" outlined tile>
          <v-card width="400" pa-md-4 mx class="pa-md-8 mx-lg-auto">
            <v-card-title>Welcome to Seller Bot!</v-card-title>
            <v-card-text>
              Increase your sells!
            </v-card-text>
          </v-card>
        </v-card>
      </div>
    </div>
  </div>
  <div v-else>
    <v-card class="pa-8" outlined tile>
      <v-card width="400" pa-md-4 mx class="pa-md-8 mx-lg-auto">
        <v-card-title>Seller Bot</v-card-title>
        <v-card-text>
          Hello {{ $store.state.currentUser }}, you are already logged in!
        </v-card-text>
      </v-card>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable */
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import axios from "axios";

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
  ...email,
  message: 'Email must be valid',
})


export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  name: "login",
  data: () => ({
    email: '',
    password: '',
    authorization_token: '',
    logging: false,
    loginform: true,
    loginsucess: true,
    login_error_message: false,
  }),

  methods: {
    submit() {
      this.logging = true;
      this.$refs.observer.validate();
      console.log(this.email)
      console.log(this.password)
      axios
        .post(this.$store.state.backend_url + "/login",
          {
            user: {
              email: this.email,
              password: this.password,
            }
          }
        )
        .then((res) => {
          console.log(res);
          console.log('Verificar se foi recebido o token de autoriazação');
          console.log(res.headers.authorization);
          this.authorization_token = res.headers.authorization;
          this.$store.state.authToken = res.headers.authorization;
          this.$store.state.currentUser = res.data.current_user;
          console.log(this.authorization_token)
          console.log(this.$store.state.currentUser)
          this.loginform = false;
          this.loginsucess = true
        })
        .catch((error) => {
          console.log("Deu erro, log do erro abaixo:");
          console.log(error);
          this.login_error_message = 'Login not successful '
        })
        .finally(() => {
          this.logging = false;
        });
    },
    clear() {
      this.email = ''
      this.password = ''
      this.$refs.observer.reset()
    },
  },
};
</script>