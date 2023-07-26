<template>
  <div>
    <v-toolbar flex-grow-0 outlined>
      <v-toolbar-title class="black--text">Busca API - Mercado Livre - Dados Gerais</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card class="pa-8" outlined tile>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field label="Anúncio - MLB" solo placeholder="Identificação do Anúncio MLB" outlined
              append-icon="mdi-database-search" @click:append="serchApi" v-model="inputvalue">
              <template v-slot:append-icon>
                <v-progress-circular v-if="loading" size="12" color="info" indeterminate></v-progress-circular>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-container fluid>
        <v-textarea readonly="yes" name="input-7-1" variant="filled" label="API Response" auto-grow
          v-model="textareavalue"></v-textarea>
      </v-container>
    </v-card>
  </div>
</template>
      
<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/no-unused-vars */
/* eslint-disable vue/valid-v-slot */
import axios from "axios";

export default {
  name: "generaldata",
  data() {
    return {
      inputvalue: null,
      loading: false,
      ml_item: null,
      textareavalue: null,
    };
  },

  methods: {
    serchApi() {
      this.loading = true;
      this.ml_item = this.inputvalue;
      this.textareavalue = 'Buscando na API ...';
      axios
        .post(
          "http://api.sellerbot.com.br/item/general-data",
          { item: { ml_item_id: this.ml_item, }},
          { headers: { Authorization: this.$store.state.authToken } }
        )
        .then((res) => {
          console.log(JSON.stringify(res.data));
          this.textareavalue = JSON.stringify(res.data, null, 4);
        })
        .catch((error) => {
          this.textareavalue = 'Anúncio não encontrado!';
          console.log(error);
          if (error.request.status === 401) {
            console.log("--- user não está logado ---:");
            this.$router.push('login')
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>


