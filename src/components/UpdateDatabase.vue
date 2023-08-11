<template>
  <div>
    <div height="400px" v-if="loading == true">
      <v-flex>
        <v-card class="d-flex align-center justify-center" height="400px">
          <v-text-field> Essa função recebe varre todo sistema do Tiny, porém devido às limitações do Tiny, pode levar bastante tempo</v-text-field>
          <v-progress-circular
            :size="50"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-card>
      </v-flex>
    </div>

    <v-card class="pa-8" outlined tile v-else>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
            v-model="message"
            label="Status da Atualização"
        >{{ message }}</v-text-field>
      </v-col>
    </v-card>
  </div>
</template>
    
<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/no-unused-vars */
/* eslint-disable vue/valid-v-slot */
import axios from "axios";

export default {
  name: "updatedatabase",
  data() {
    return {
      loading: false,
      message: "Vamos atualizar a DB",
    };
  },

  created() {
    this.updateDatabse();
  },

  methods: {
    updateDatabse() {
      this.loading = true;
      axios
        .get(this.$store.state.backend_url + "/webhook/update-tiny-stock", { headers: { Authorization: this.$store.state.authToken } })
        .then((res) => {
          this.message = 'Atualizando ...'
          console.log("Atualizando DB");
          console.log(res);
          this.$store.state.databaseUpdate = "database updated!"
        })
        .catch((error) => {
          this.message = 'Ocorreu algum erro durante a atualização!'
          console.log(error);
          if (error.request.status === 401) {
            console.log("--- user não está logado ---:");
            this.$router.push('login')
          }
          console.log("Deu algum erro");
        })
        .finally(() => {
          this.message = 'Base de Dados Atualizada'
          this.loading = false;
        });
    },
  },
};

</script>

<style>
.style-1{
  background-color: rgb(240, 207, 204);
}
.style-2{
  background-color: rgb(211, 249, 230);
}
.style-3{
  background-color: rgb(244, 245, 218);
}
</style>

