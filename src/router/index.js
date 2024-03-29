import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "homeview",
    component: HomeView,
  },
  {
    path: "/accounts",
    name: "accounts",
    component: () =>
      import("../components/Accounts.vue"),
  },
  {
    path: "/no-stock-fulfillment",
    name: "no-stock-fulfillment",
    component: () =>
      import("../components/NoStockFulfillment.vue"),
  },
  {
    path: "/add-stock",
    name: "add-stock",
    component: () =>
      import("../components/AddStock.vue"),
  },
  {
    path: "/price-events",
    name: "priceevents",
    component: () =>
      import("../components/PriceEvents.vue"),
  },
  {
    path: "/logistic-events",
    name: "logisticevents",
    component: () =>
      import("../components/LogisticEvents.vue"),
  },
  {
    path: "/free-shipping",
    name: "freeshipping",
    component: () =>
      import("../components/FreeShipping.vue"),
  },
  {
    path: "/flex",
    name: "flex",
    component: () =>
      import("../components/Flex.vue"),
  },
  {
    path: "/fiscal-data",
    name: "fiscal-data",
    component: () =>
      import("../components/FiscalData.vue"),
  },
  {
    path: "/general-data",
    name: "general-data",
    component: () =>
      import("../components/GeneralData.vue"),
  },
  {
    path: "/update-db",
    name: "updatedatabase",
    component: () =>
      import("../components/UpdateDatabase.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../components/Login.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import("../components/Signup.vue"),
  },
  {
    path: "/deals",
    name: "deals",
    component: () =>
      import("../components/Deals.vue"),
  },
  
];

const router = new VueRouter({
  routes,
});

export default router;
