<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title class="justify-center">
      <span class="text-h5">Add a New Account</span>
    </v-card-title>
    <v-form v-model="valid">
      <v-row class="justify-center">
        <v-col md="8">
          <v-text-field
            label="Account Name"
            id="accountname"
            v-model="accountname"
            required
          ></v-text-field>

          <v-text-field
            label="Seller ID"
            id="sellerid"
            v-model="sellerid"
            required
          ></v-text-field>

          <v-text-field
            label="Code"
            id="code"
            v-model="code"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>

    <v-card-actions class="justify-center">
      <v-btn color="blue darken-1" text @click="closeDialog()"> Close </v-btn>
      <v-btn color="blue darken-1" text @click="createSeller()"> Save </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script>
import axios from "axios";
export default {
  name: "AddAccount",
  data() {
    return {
      accountname: null,
      sellerid: null,
      code: null,
    };
  },

  methods: {
    closeDialog() {
      console.log("entre na funcao do evento");
      this.$emit("closeDialog");
    },
    createSeller() {
      axios
        .post(
          "http://localhost:3000/seller/create",
          //.post('https://orandsellerbot.com/seller/create',
          {
            seller: {
              nickname: this.accountname,
              code: this.code,
              ml_seller_id: this.sellerid,
            },
          }
        )
        .then((res) => {
          console.log("veio como res");
          console.log(res);
          this.$emit("closeDialog");
        })
        .catch((error) => {
          console.log("veio como error");
          console.log(error);
        })
        .finally(() => {
          console.log("entrei no finally");
          this.$emit("closeDialog");
          this.$emit("getAccounts");
        });
    },
  },
};
</script>