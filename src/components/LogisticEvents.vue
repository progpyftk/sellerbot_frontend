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
          :items="logisticevents"
          item-key="item_id"
          class="elevation-1"
          must-sort
        >
          <template v-slot:top>
            <v-toolbar flar>
              <v-toolbar-title>Alterações de Logística</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:item.change_time="{ item }">
            {{ formatDate(item.change_time) }}
          </template>
          <template v-slot:item.permalink="{ item }">
            <v-icon large dense color="orange darken-2" class="mr-2" @click="linkAnuncio(item)">mdi-arrow-right-bold</v-icon>
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
  import moment from "moment";
  
  export default {
    name: "logisticevents",
    data() {
      return {
        headers: [
          {
            text: "Anúncio",
            align: "start",
            sortable: false,
            value: "item_id",
          },
          { text: "New Logistic", value: "new_logistic" },
          { text: "Old Logistic", value: "old_logistic" },
          { text: "Change Time", value: "change_time" },
          { text: "Link", value: "permalink" },
        ],
        logisticevents: {},
        loadingtable: false,
      };
    },
  
    created() {
      this.getLogisticEvents();
    },
  
    methods: {
        getLogisticEvents() {
        this.loadingtable = true;
        axios
          .get("http://api.sellerbot.com.br/item/logistic-events")
          .then((res) => {
            this.logisticevents = res.data;
            console.log(res.data);
            this.loadingtable = false;
          })
          .catch((error) => {
            console.log(error);
            this.loadingtable = false;
          });
      },
      formatDate(item) {
        console.log(item);
        return moment(item).format("DD/MM/YY");
      },
      linkAnuncio(item) { 
        window.open(item.permalink);
      },
    },
  };
  </script>