import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

import index from "./pages/page-layout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/calculator",
  },

  {
    path: "/",
    component: index,
    children: [
      {
        path: "",
        redirect: "/calculator",
      },
      {
        path: "calculator",
        component: () => import("./pages/calculator-page.vue"),
      },
      {
        path: "settings",
        component: () => import("./pages/settings-page.vue"),
      },
      {
        path: "about",
        component: () => import("./pages/about-page.vue"),
      },
    ],
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

export default router;
