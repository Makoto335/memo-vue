import { createRouter, createWebHistory } from "vue-router";
import WelcomePage from "../views/WelcomePage";
import MemoRoom from "../views/MemoRoom";
import useValidate from "../plugins/auth/validate";

const { error, validate } = useValidate();

const requireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem("uid");
  const client = window.localStorage.getItem("client");
  const accessToken = window.localStorage.getItem("access-token");

  if (!uid || !client || !accessToken) {
    console.log("ログインしていません");
    next({ name: "Welcome" });
    return;
  }

  await validate();
  if (error.value) {
    console.log("認証に失敗しました");
    next({ name: "Welcome" });
  } else {
    next();
  }
};

const noRequireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem('uid')
  const client = window.localStorage.getItem('client')
  const accessToken = window.localStorage.getItem('access-token')

  if (!uid && !client && !accessToken) {
    next()
    return
  }

  await validate()

  if (!error.value) {
    next({ name: 'Chatroom' })
  } else {
    next()
  }
}

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: WelcomePage,
    beforeEnter: noRequireAuth
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
