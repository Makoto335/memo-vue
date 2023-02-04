<template>
  <div class="NavBar">
    <nav>
      <img class="NavBar_Avatar" :src="avatarInNav" />
      <div>
        <p>
          <span class="NavBar_Name">{{ name }}</span
          >さん
        </p>
        <div class="NavBar_Error">{{ error }}</div>
      </div>
      <button @click="logout">ログアウト</button>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import removeItem from "../plugins/auth/removeItem";
export default {
  props: ["avatar"],
  data() {
    return {
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("uid"),
      error: null,
    };
  },
  computed: {
    avatarInNav() {
      return this.avatar;
    },
  },
  methods: {
    async logout() {
      this.error = null;

      try {
        const res = await axios.delete("http://localhost:3000/auth/sign_out", {
          headers: {
            uid: this.email,
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
          },
        });

        if (!res) {
          new Error("ログアウトできませんでした");
        }

        if (!this.error) {
          console.log("ログアウトしました");
          removeItem();
          this.$router.push({ name: "WelcomePage" });
        }

        return res;
      } catch (error) {
        this.error = "ログアウトできませんでした";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.NavBar {
  nav {
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  p {
    margin: 2px auto;
    font-size: 16px;
    color: #444;
  }
  &_Avatar {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>
