<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-subheader>REPORTS</v-subheader>
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

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Seller Bot v1.0.1</v-toolbar-title>
    </v-app-bar>

    <v-main>
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
    ],
  }),
};
</script>