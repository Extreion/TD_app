import Vue from "vue";
import VueRouter from "vue-router";
import Stock from "../views/Stock.vue";
import Login from "../views/Login.vue";
import SignIn from "../views/SignIn.vue";
import SignOut from "../views/SignOut.vue";
import PurchaseOrders from "../views/PurchaseOrders.vue";
import Home from "../views/Home.vue";
import Homepage from "../views/Homepage.vue";
import store from "../store";
import axios from "axios";
let URL = "http://172.19.181.156:4545/";
//let URL = "http://192.168.135.129:4545/";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    title: "Homepage",
    icon: "mdi-home",
    component: Home,
    children: [
      {
        path: "",
        component: Homepage,
        name: "Homepage",
        meta: { requiresAuth: false },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    icon: "mdi-home",
    component: Login,
    hide: true
  },
  {
    path: "/stock",
    component: Stock,
    name: "Stock management",
    title: "Stock",
    icon: "mdi-google-spreadsheet"
  },
  {
    path: "/sign-out",
    component: SignOut,
    name: "Sign-Out",
    title: "Sign-Out",
    icon: "mdi-logout-variant"
  },
  {
    path: "/sign-in",
    component: SignIn,
    name: "Sign-In",
    title: "Sign-In",
    icon: "mdi-login-variant"
  },
  {
    path: "/project-view",
    component: PurchaseOrders,
    name: "Purchase Orders",
    title: "Purchase Orders",
    icon: "mdi-view-list"
  },
  {
    path: "/p-l-view",
    component: SignIn,
    name: "Profit & Loss",
    title: "Profit & Loss",
    icon: "mdi-chart-areaspline"
  },
  {
    path: "/admin",
    component: SignIn,
    name: "Administration Panel",
    title: "Administration Panel",
    icon: "mdi-wrench"
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
