import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import UserQRcode from "../views/User.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),





    // path: "/",
    // name: "Home",
    // component: Home,
    // children: [
    //     {
    //     path: "/users/:userID",
    //     component: UserQRcode
    //   }
    // ]
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
        {
        path: "/users/:userID",
        component: UserQRcode
      }
    ]
    // path: "/login",
    // name: "Login",
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
