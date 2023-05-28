<template>
  <div>
    <div height="400px" v-if="loadingtable == true">
      <v-flex>
        <v-card class="d-flex align-center justify-center" height="400px">
          <v-progress-circular
            :size="50"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-card>
      </v-flex>
    </div>

    <v-card class="pa-8" outlined tile v-else>
      <v-data-table
        :headers="headers"
        :items="items"
        item-key="item_id"
        class="elevation-1"
        :sort-by="['quantity']"
        :sort-desc="[false]"
        :item-class="itemRowBackground"
        must-sort
      >
        <template v-slot:top>
          <v-toolbar flar>
            <v-toolbar-title>Controle FLEX - FULFILLMENT</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.link="{ item }">
          <v-icon large dense color="orange darken-2" class="mr-2" @click="linkAnuncio(item)">mdi-arrow-right-bold</v-icon>
        </template>

        <template v-slot:item.recommendation="{ item }">
          <p v-if="item.quantity<10 && item.flex==false">Ok</p>
          <p v-if="item.quantity<10 && item.flex==true">Desligar</p>
          <p v-if="item.quantity>10 && item.flex==false">Ligar</p>
          <p v-if="item.quantity>10 && item.flex==true">OK</p>
        </template>

        <template v-slot:item.flex="{ item }">
          <p v-if="item.flex==false">Desligado</p>
          <p v-if="item.flex==true">Ligado</p>
        </template>

        <template v-slot:item.variation="{ item }">
          <p v-if="item.variation==false">Não</p>
          <p v-if="item.variation==true">Sim</p>
        </template>

        <template v-slot:item.variation_id="{ item }">
          <p v-if="item.variation_id==nil">Não tem variação</p>
          <p v-else > {{ item.variation_id }}</p>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon v-if="item.flex == 'Ligado'" @click="turnOffFlex(item)" color="red">
            mdi-motorbike-off
          </v-icon>
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
  name: "flex",
  data() {
    return {
      headers: [
        { text: "Anúncio", align: "start", sortable: false, value: "ml_item_id" },
        { text: "É variação?", value: "variation" },
        { text: "ID Variação", value: "variation_id" },
        { text: "Seller", value: "seller_nickname" },
        { text: "SKU", value: "sku" },
        { text: "Quantidade", value: "quantity" },
        { text: "Flex", value: "flex" },
        { text: "Link", value: "link" },
        { text: "Ligar/Desligar", value: "actions", sortable: false },
        { text: "Recomendação", value: "recommendation", sortable: false },
      ],
      items: {},
      loadingtable: false,
    };
  },

  created() {
    this.getItems();
  },

  methods: {
    getItems() {
      this.loadingtable = true;
      axios
        //.get("https://orandsellerbot.com/fulfillment/flex")
        .get("http://localhost:3000/fulfillment/flex")
        .then((res) => {
          this.items = res.data;
          console.log(res.data);
          this.loadingtable = false;
        })
        .catch((error) => {
          console.log(error);
          this.loadingtable = false;
        });
    },
    linkAnuncio(item) { 
      window.open(item.link);
    },
    turnOffFlex(item) {
      console.log(item.ml_item_id);
      axios
        .post("http://localhost:3000/fulfillment/flex", {
          item: { ml_item_id: item.ml_item_id },
        })
        .then((res) => {
          console.log("foi tudo bem");
          console.log(res);
        })
        .catch((error) => {
          console.log("deu erro na alteracao do frete gratis");
          console.log(error);
        })
        .finally(() => {
          this.getItems();
        });
    },
    turnOnFlex(item) {
      console.log(item.ml_item_id);
      axios
        .post("http://localhost:3000/fulfillment/flex", {
          item: { ml_item_id: item.ml_item_id },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getItems();
        });
    },
    itemRowBackground(item) {
      console.log('Entre na funcao da cor')
      if (item.quantity < 10 && item.flex == true) {
        return "style-1";
      }
      if (item.quantity > 20 && item.flex == true) {
        return "style-2";
      }
      if (item.quantity < 20 && item.quantity >10 && item.flex == true) {
        return "style-3";
      }
      if (item.quantity < 20 && item.quantity >10 && item.flex == false) {
        return "style-1";
      }
      if (item.quantity > 20 && item.flex == false) {
        return "style-1";
      }
      if (item.quantity < 10 && item.flex == false) {
        return "style-2";
      }
    }
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

