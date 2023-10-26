<template>
  <div>
    <div height="400px" v-if="loadingtable == true">
      <v-flex>
        <v-card class="d-flex align-center justify-center" height="400px">
          <v-progress-circular :size="50" indeterminate color="primary"></v-progress-circular>
        </v-card>
      </v-flex>
    </div>

    <v-card class="pa-8" outlined tile v-else>
      <v-data-table :headers="headers" :items="items" item-key="promotion_id" class="elevation-1" :sort-by="['seller']"
        must-sort @click:row="abrirPromocao">
        <template v-slot:top>
          <v-toolbar flar>
            <v-toolbar-title>Controle de Promoções</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-dialog v-model="dialog" max-width="600px" class="mx-auto my-20">
            <v-card>
              <v-divider class="mx-4"></v-divider>
              <v-card-title class="justify-center text-h5">{{ selectedItem.name }}</v-card-title>

              <v-divider class="mx-4"></v-divider>
              <br>
              <v-card-text class="text-h6">
                Tipo: {{ selectedItem.type }}<br><br>
                Seller: {{ selectedItem.seller }}<br><br>
                Status: {{ selectedItem.status }}<br><br>
                Anúncios Aptos: xxxxx<br><br>
                Anúncios Ativados: yyyyy<br>
              </v-card-text>

              <v-divider class="mx-4"></v-divider>
              <v-card-title>Ativação de Anúncios</v-card-title>
              <v-col cols="12" md="4">
                <v-text-field v-model="markup" label="Markup Desejado" required hide-details type="number"
                  min="0" hint="Apenas os anúncios que atenderem serão ativados"  prepend-inner-icon="mdi-percent-box"></v-text-field>
              </v-col>
              <v-card-actions>

                <v-btn color="deep-purple lighten-2" text @click="ativarPromocao">
                  Ativar todos
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Fechar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </template>

        <template v-slot:item.benefits="{ item }">
          <p>MercadoLivre: {{ item.benefits ? item.benefits.meli_percent : '' }}%</p>
          <p>Seller: {{ item.benefits ? item.benefits.seller_percent : '' }}%</p>
        </template>


      </v-data-table>
    </v-card>
  </div>
</template>
    
<script>
/* eslint-disable vue/no-unused-components */
/* eslint-disable vue/no-unused-vars */
/* eslint-disable vue/valid-v-slot */
import axios from "axios";

export default {
  name: "deals",
  data() {
    return {
      headers: [
        { text: "Seller", align: "start", sortable: false, value: "seller" },
        { text: "ID Promoção", value: "promotion_id" },
        { text: "Type", value: "type" },
        { text: "Status", value: "status" },
        { text: "Start Date", value: "start_date" },
        { text: "Finish Date", value: "finish_date" },
        { text: "Deadline", value: "deadline_date" },
        { text: "Name", value: "name" },
        { text: "Benefits", value: "benefits" },
      ],
      items: {},
      loadingtable: false,
      selectedItem: { seller: "", promotion_id: "", type: "", status: "", start_date: "", finish_date: "", deadline_date: "", name: "", benefits: "" },
      dialog: false,
      markup: 5,
      anuncios_aptos: 0,
      anuncios_ativos: 0,
    };
  },

  created() {
    this.getItems();
  },

  methods: {
    abrirPromocao(row) {
      this.selectedItem = row
      console.log(this.selectedItem.seller)
      console.log(this.selectedItem.promotion_id)
      console.log(this.selectedItem.type)

      // pegar os dados da promoção no ML via API, tais como número de anuncios
      axios
        .post(this.$store.state.backend_url + "/seller/promotion-data",
          {
            promotion_data: {
              promotion_id: this.selectedItem.promotion_id,
              type: this.selectedItem.type,
              seller: this.selectedItem.seller,
            }
          },
          { headers: { Authorization: this.$store.state.authToken } }
        )
        .then((res) => {
          // aqui é onde vamos pegar os dados da quantidade de anuncios apto e tal
          console.log(res);
        })
        .catch((error) => {
          console.log("Deu erro, log do erro abaixo:");
          console.log(error);
          if (error.request.status === 401) {
            console.log("--- user não está logado ---:");
            this.$router.push('login')
          }
        })
        .finally(() => {
          this.dialog = true;
        });













    },

    close() {
      // altereii um pouco pra ver o que acontece
      this.dialog = false;
    },


    getItems() {
      this.loadingtable = true;
      axios
        .get(this.$store.state.backend_url + "/seller/promotions", { headers: { Authorization: this.$store.state.authToken } })
        .then((res) => {
          this.items = res.data;
          console.log(res.data);
          this.loadingtable = false;
        })
        .catch((error) => {
          console.log(error);
          if (error.request.status === 401) {
            console.log("--- user não está logado ---:");
            this.$router.push('login')
          }
          this.loadingtable = false;
        });
    },

    ativarPromocao() {
      console.log(this.selectedItem.name)
      console.log(this.markup)

      // o item selecionado é o que nos dá todas informações para mandar para o backend e ativar as promoções
      // lembrar de colocar o markup para 5% apos finalizar
    },


    itemRowBackground(item) {
      console.log('Entre na funcao da cor')
      if (item.store_quantity < 10 && item.flex == true) {
        return "style-1";
      }
      if (item.store_quantity > 20 && item.flex == true) {
        return "style-2";
      }
      if (item.store_quantity < 20 && item.store_quantity > 10 && item.flex == true) {
        return "style-3";
      }
      if (item.store_quantity < 20 && item.store_quantity > 10 && item.flex == false) {
        return "style-1";
      }
      if (item.store_quantity > 20 && item.flex == false) {
        return "style-1";
      }
      if (item.store_quantity < 10 && item.flex == false) {
        return "style-2";
      }
    }
  },
};

</script>

<style>
.style-1 {
  background-color: rgb(240, 207, 204);
}

.style-2 {
  background-color: rgb(211, 249, 230);
}

.style-3 {
  background-color: rgb(244, 245, 218);
}
</style>

