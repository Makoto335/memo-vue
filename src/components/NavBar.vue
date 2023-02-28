<template>
  <div class="NavBar">
    <nav>
      <a href="#" @click.prevent.stop="showModal = true"
        ><img class="NavBar_Avatar" :src="avatarInNav"
      /></a>
      <div>
        <p>
          <span class="NavBar_Name">{{ name }}</span
          >さん
        </p>
        <div class="NavBar_Error">{{ error }}</div>
      </div>
      <button @click="logout">ログアウト</button>
    </nav>
    <div v-if="showModal">
      <UpdateAvatar
        :avatarInNav="avatarInNav"
        @closeUpdateAvatar="closeUpdateAvatar"
        @reloadUserData="reloadUserData"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import removeItem from "../plugins/auth/removeItem";
import UpdateAvatar from "../components/modules/UpdateAvatar";
export default {
  props: ["avatar"],
  components: { UpdateAvatar },
  data() {
    return {
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("uid"),
      showModal: false,
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
    closeUpdateAvatar() {
      this.showModal = false;
    },
    reloadUserData() {
      this.$emit("reloadUserData");
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
  button {
    background: radial-gradient(486px at 37.5% -17.2%, rgb(255, 2, 2) 0%, rgb(254, 78, 172) 90%);
  }
  &_Avatar {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>
