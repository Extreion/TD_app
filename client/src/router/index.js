import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Gateways from "../views/Gateways.vue";
import Counter from "../views/Counter.vue";
import History from "../views/History";
import Logs from "../views/Logs";
import About from "../views/About";
import Electricity from "../views/Electricity.vue";
import Water from "../views/Water.vue";
import Fuel from "../views/Fuel.vue";
import Gas from "../views/Gas.vue";
import Administration from "../views/Administration.vue";
import Login from "../views/Login.vue";
import Power from "../views/Power.vue";
import Home from "../views/Home.vue";
import Homepage from "../views/Homepage.vue";
import Reports from "../views/Reports.vue";
import Transformer from "../views/Transformer.vue";
import AppConfig from "../views/AppConfig.vue";
import store from "../store";
import axios from "axios";
let URL = "http://172.19.181.156:4545/";
//let URL = "http://192.168.135.129:4545/";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    title: "Page d'accueil",
    icon: "mdi-home",
    component: Home,
    children: [
      {
        path: "",
        component: Homepage,
        name: "Accueil",
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/administration",
    component: Administration,
    title: "Administration",
    icon: "mdi-clipboard-account",
    children: [
      {
        path: "",
        component: Login,
        name: "Login",
        meta: { requiresAuth: false },
      },
      // {path: 'suivi-alarme', component: Dashboard, name: "Suivi des alarmes", icon: "mdi-alarm-light" },
      {
        path: "logs",
        component: Logs,
        name: "Logs",
        icon: "mdi-history",
        meta: { requiresAuth: true },
      },
      {
        path: "config",
        component: AppConfig,
        name: "Paramétrage",
        icon: "mdi-cogs",
        meta: {requiresAuth: true},
      }
    ],
  },
  {
    path: "/dashboard",
    title: "Tableau de bord",
    icon: "mdi-view-dashboard",
    component: Dashboard,
    children: [
      {
        path: "",
        component: Dashboard,
        name: "Tableau de bord",
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/elec",
    component: Electricity,
    title: "Électricité",
    icon: "mdi-flash",
    children: [
      {
        path: "",
        name: "Électricité",
        component: Dashboard,
        meta: { requiresAuth: false },
      },
      {
        path: "passerelles",
        component: Gateways,
        name: "Passerelles",
        icon: "mdi-sitemap",
        meta: { requiresAuth: false },
      },
      {
        path: "passerelles/compteurs/:gatewayId/:address",
        component: Counter,
        name: "Compteur",
        show: false,
        meta: { requiresAuth: false },
      },
      {
        path: "puissance",
        component: Power,
        name: "Puissance",
        icon: "mdi-power-plug",
        meta: { requiresAuth: false },
      },
      {
        path: "transformateurs",
        component: Transformer,
        name: "Transformateur",
        icon: "mdi-transmission-tower",
        meta: { requiresAuth: false },
      },
      {
        path: "consommation",
        component: History,
        name: "Suivi de conso",
        icon: "mdi-chart-timeline-variant",
        meta: { requiresAuth: false },
      },
      {
        path: "rapport",
        component: Reports,
        name: "Rapport",
        icon: "mdi-chart-tree",
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/eau",
    component: Water,
    title: "Eau",
    icon: "mdi-water",
    children: [
      {
        path: "",
        component: Dashboard,
        name: "Eau",
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/gaz",
    component: Gas,
    title: "Gaz",
    icon: "mdi-fire",
    children: [
      {
        path: "",
        component: Dashboard,
        name: "Gaz",
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/fuel",
    component: Fuel,
    title: "Fuel",
    icon: "mdi-gas-station",
    children: [
      {
        path: "",
        component: Dashboard,
        name: "Fuel",
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/about",
    component: About,
    title: "À propos",
    icon: "mdi-information-outline",
    children: [
      {
        path: "",
        component: Dashboard,
        name: "À propos",
        meta: { requiresAuth: false },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (!store.state.user.Id) {
    if (localStorage.getItem("jwtToken")) {
      const req = axios.create({
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });
      req
        .get(URL.concat("api/isAuth"))
        .then((res) => {
          store.commit("SET_USER", res.data.token);
          next();
        })
        .catch((err) => {});
    } else {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        next({
          name: "Login",
        });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router;
