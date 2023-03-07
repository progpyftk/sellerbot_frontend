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

    <v-app-bar 
      color="#f0f0f0"
      rounded app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-avatar size="25"> <img src="./assets/laranja.png" /> </v-avatar>
        Seller Bot v1.0.1</v-toolbar-title
      >
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
      { title: "Contas", icon: "mdi-account-key", router_name: "/accounts" },
      {
        title: "Full Sem Estoque",
        icon: "mdi-flask-empty-outline",
        router_name: "/no-stock-fulfillment",
      },
      {
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
      },
      {
        title: "Frete Grátisssssss",
        icon: "mdi-truck-fast",
        router_name: "/free-shipping",
      },
      {
        title: "Flex",
        icon: "mdi-truck-fast",
        router_name: "/flex",
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