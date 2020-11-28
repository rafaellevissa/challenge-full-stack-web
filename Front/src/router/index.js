import Vue from "vue";
import Router from "vue-router";
import estudante from "@/components/estudante.vue";
import modulo from "@/components/modulo.vue";
import matricula from "@/components/matricula.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: estudante,
    },
    {
      path: "/modulo",
      name: "modulo",
      component: modulo,
    },
    {
      path: "/matricula",
      name: "matricula",
      component: matricula,
    },
  ],
});
