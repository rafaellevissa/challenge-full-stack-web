import Vue from "vue";
import Router from "vue-router";
import student from "@/components/student.vue";
import module from "@/components/module.vue";
import registration from "@/components/registration.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/student",
      name: "student",
      component: student,
    },
    {
      path: "/module",
      name: "module",
      component: module,
    },
    {
      path: "/registration",
      name: "registation",
      component: registration,
    },
  ],
});
