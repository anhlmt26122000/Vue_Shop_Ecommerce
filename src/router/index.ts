import Vue from "vue";
import Router from "vue-router";
import LoginPage from "@/components/LoginPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import HomePage from "@/components/HomePage.vue";
import AboutPage from "@/components/AboutPage.vue";
import AdminCategoryPage from "@/components/AdminCategoryPage.vue";
import AdminProductPage from "@/components/AdminProductPage.vue";
import AdminUserPage from "@/components/AdminUserPage.vue";
import ShopPage from "@/components/ShopPage.vue";

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
      path: "/shop",
      name: "ShopPage",
      component: ShopPage,
    },
    {
      path: "/adminCategory",
      name: "AdminCategoryPage",
      component: AdminCategoryPage,
    },
    {
      path: "/adminProduct",
      name: "AdminProductPage",
      component: AdminProductPage,
    },
    {
      path: "/adminUser",
      name: "AdminUserPage",
      component: AdminUserPage,
    },
  ],
});
