import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import Exam from "../views/DashDis/Exam.vue";
import GradePage from "../views/GradePage.vue";
import * as firebase from "firebase/app";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/exam",
    name: "Exam",
    component: Exam,
    meta: {
      requireAuth: true,
    },
  },
  {
    path: "/finish",
    name: "Finish",
    component: GradePage,
    meta: {
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requireAuth)) {
    const user = firebase.auth().currentUser;
    if (user) {
      next();
    } else {
      next({
        name: "Login",
      });
    }
  } else {
    next();
  }
});
///cndsj

export default router;
