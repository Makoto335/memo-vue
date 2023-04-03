import { createRouter, createWebHistory } from "vue-router";
import WelcomePage from "../components/views/WelcomePage";
import MemoRoom from "../components/views/MemoRoom";
import useValidate from "../plugins/auth/validate";

const { error, validate } = useValidate();

const requireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem("uid");
  const client = window.localStorage.getItem("client");
  const accessToken = window.localStorage.getItem("access-token");

  if (!uid || !client || !accessToken) {
    ("ログインしていません");
    next({ name: "WelcomePage" });
    return;
  }

  await validate();
  if (error.value) {
    next({ name: "WelcomePage" });
  } else {
    next();
  }
};

const noRequireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem("uid");
  const client = window.localStorage.getItem("client");
  const accessToken = window.localStorage.getItem("access-token");

  if (!uid && !client && !accessToken) {
    next();
    return;
  }

  await validate();

  if (!error.value) {
    next({ name: "MemoRoom" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "WelcomePage",
    component: WelcomePage,
    beforeEnter: noRequireAuth,
  },
  {
    path: "/memo",
    name: "MemoRoom",
    component: MemoRoom,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
