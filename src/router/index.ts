import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import { user } from "../store/user";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "Register" */ "../views/Register.vue"),
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () =>
      import(
        /* webpackChunkName: "Notifications" */ "../views/Notifications.vue"
      ),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/Profile.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () =>
      import(/* webpackChunkName: "Users" */ "../views/Members.vue"),
    beforeEnter(to, from, next) {
      if (user.value.admin) next();
      else next(from);
    },
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Home",
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("access_token");

  if (to.name === "Login" || to.name === "Register") {
    if (!isLoggedIn || !isLoggedIn.length) {
      next();
      return;
    }
    console.log("You must be logged out to login.");
    next(from);
    return;
  }

  if (!isLoggedIn || !isLoggedIn.length) {
    console.log("You must be logged in.");
    next("/login");
    return;
  }

  next();
});

export default router;
