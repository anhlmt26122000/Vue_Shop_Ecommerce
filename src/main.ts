import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/bootstrap.min.css";
import "@/assets/css/templatemo.css";
import "@/assets/css/custom.css";
import "@/assets/css/fontawesome.min.css";
import "@/assets/css/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';


Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
