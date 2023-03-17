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
          <p v-if="item.quantity<10 && item.flex==404">Ok</p>
          <p v-if="item.quantity<10 && item.flex==204">Desligar</p>
          <p v-if="item.quantity>10 && item.flex==404">Ligar</p>
          <p v-if="item.quantity>10 && item.flex==204">OK</p>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon v-if="item.flex == 204" @click="turnOffFlex(item)" color="red">
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
    itemRowBackground(item) {
      console.log('Entre na funcao da cor')
      if (item.quantity < 10 && item.flex == 204) {
        return "style-1";
      }
      if (item.quantity > 20 && item.flex == 204) {
        return "style-2";
      }
      if (item.quantity < 20 && item.quantity >10 && item.flex == 204) {
        return "style-3";
      }
      if (item.quantity < 20 && item.quantity >10 && item.flex == 404) {
        return "style-1";
      }
      if (item.quantity > 20 && item.flex == 404) {
        return "style-1";
      }
      if (item.quantity < 10 && item.flex == 404) {
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

