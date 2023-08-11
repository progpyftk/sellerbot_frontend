<template>
  <v-app id="inspire" >
    <v-navigation-drawer v-model="drawer" color="#f0f0f0" app>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.router_name"
            link
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar class="title"
      color="#f0f0f0"
      rounded app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-avatar size="35"> <img src="./assets/laranja.png" /> </v-avatar>
        SellerBot   v1.0.0  </v-toolbar-title>
        <v-spacer></v-spacer>
          User: {{ $store.state.currentUser }}
          <v-spacer></v-spacer>
          Database: {{ this.$store.state.databaseUpdate }}
        <v-spacer></v-spacer>
    </v-app-bar>

    <v-main >
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      /*{ 
        title: "Signup", 
        icon: "mdi-account-plus", 
        router_name: "/signup" },*/
      { 
        title: "Login", 
        icon: "mdi-login", 
        router_name: "/login" },
      { 
        title: "Contas", 
        icon: "mdi-playlist-edit", 
        router_name: "/accounts" },
      {
        title: "Full Sem Estoque",
        icon: "mdi-package-variant",
        router_name: "/no-stock-fulfillment",
      },
      /*{
        title: "Adicionar Estoque",
        icon: "mdi-plus-box",
        router_name: "/add-stock",
      },
      {
        title: "Eventos de Preço",
        icon: "mdi-currency-usd",
        router_name: "/price-events",
      },
      {
        title: "Eventos de Logística",
        icon: "mdi-truck-fast",
        router_name: "/logistic-events",
      },*/
      {
        title: "Frete Grátiss",
        icon: "mdi-truck-fast",
        router_name: "/free-shipping",
      },
      {
        title: "Flex - Fulfillment",
        icon: "mdi-truck-fast",
        router_name: "/flex",
      },
      /*{
        title: "Flex - Mercado Envios",
        icon: "mdi-truck-fast",
        router_name: "/flex-me",
      },*/
      {
        title: "API - Dados Fiscais",
        icon: "mdi-api",
        router_name: "/fiscal-data",
      },
      {
        title: "API - Dados Gerais",
        icon: "mdi-api",
        router_name: "/general-data",
      },
      {
        title: "Atualizar DB - Tiny",
        icon: "mdi-database",
        router_name: "/update-db",
      },
      {
        title: "Promoções",
        icon: "mdi-database",
        router_name: "/deals",
      },
    ],
  }),
};
</script>

<style>
#inspire {
    background-color: var(--v-background-base);
}
</style>