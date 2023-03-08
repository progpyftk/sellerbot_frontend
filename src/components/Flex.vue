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
        must-sort
      >
        <template v-slot:top>
          <v-toolbar flar>
            <v-toolbar-title>Alterações de Preços</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.link="{ item }">
          <v-icon large dense color="orange darken-2" class="mr-2" @click="linkAnuncio(item)">mdi-arrow-right-bold</v-icon>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon v-if="item.flex == 204" @click="turnOffFlex(item)">
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
        { text: "Actions", value: "actions", sortable: false },


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
    },
  },
};
</script>