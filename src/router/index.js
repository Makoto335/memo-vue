import { createRouter, createWebHistory } from "vue-router";
import WelcomePage from "../views/WelcomePage";
import MemoRoom from "../views/MemoRoom";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: WelcomePage,
  },
  {
    path: "/memo",
    name: "MemoRoom",
    component: MemoRoom,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
