import Vue from "vue";
import Router from "vue-router";
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import HomePage from "@/components/HomePage.vue";
import AboutPage from "@/components/AboutPage.vue";
import AdminPage from "@/components/AdminPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: LoginPage,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterPage,
    },
    {
      path: "/home",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/about",
      name: "AboutPage",
      component: AboutPage,
    },
    {
      path: "/admin",
      name: "AdminPage",
      component: AdminPage,
    },
  ],
});
