<template>
  <div><Navbar /><MemoForm @getMessages="getMessages" /></div>

  {{ memos }}
</template>

<script>
import Navbar from "../components/NavBar";
import MemoForm from "../components/MemoForm";
import axios from "axios";

export default {
  components: { Navbar, MemoForm },
  data() {
    return {
      memos: [],
    };
  },
  methods: {
    async getMessages() {
      try {
        const res = await axios.get("http://localhost:3000/user", {
          headers: {
            uid: window.localStorage.getItem("uid"),
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
          },
        });
        if (!res) {
          new Error("メッセージ一覧を取得できませんでした");
        }
        this.memos = res.data;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {
    this.getMessages();
  },
};
</script>

<style scoped lang="scss"></style>
