<template>
  <div class="NavBar">
    <div class="NavBar_Wrapper">
      <p class="error">{{ error }}</p>
      <div class="NavBar_User">
        <p>
          <span class="NavBar_Name">{{ name }}</span
          >さん
        </p>
        <a href="#" @click.prevent.stop="showModal = true"
          ><img class="NavBar_Avatar" :src="avatarInNav"
        /></a>
        <div class="NavBar_LogoutBtn">
          <a href="#" @click.prevent.stop="showLogoutDialog = true">Logout </a>
        </div>
      </div>
      <div v-if="showModal">
        <UpdateAvatar
          :avatarInNav="avatarInNav"
          @closeUpdateAvatar="closeUpdateAvatar"
          @reloadUserData="reloadUserData"
        />
      </div>
      <div v-if="showLogoutDialog">
        <LogoutDialog @closeLogoutDialog="closeLogoutDialog" @logout="logout" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import removeItem from "../plugins/auth/removeItem";
import UpdateAvatar from "../components/modules/UpdateAvatar";
import errorHandler from "@/plugins/errorHandler";
import LogoutDialog from "./modules/LogoutDialog";

export default {
  props: ["avatar"],
  components: { UpdateAvatar, LogoutDialog },
  data() {
    return {
      name: window.localStorage.getItem("name"),
      email: window.localStorage.getItem("uid"),
      showModal: false,
      error: null,
      showLogoutDialog: false,
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
            uid: window.localStorage.getItem("uid"),
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
          },
        });
        console.log("ログアウトしました");
        removeItem();
        this.$router.push({ name: "WelcomePage" });
        return res;
      } catch (err) {
        errorHandler(err);
        this.error = "ログアウトできませんでした";
        this.closeLogoutDialog();
      }
    },
    closeUpdateAvatar() {
      this.showModal = false;
    },
    closeLogoutDialog() {
      this.showLogoutDialog = false;
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
