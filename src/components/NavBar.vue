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
  color: black;
  &_Wrapper {
    height: 55px;
    background: #fcf707;
    border-bottom: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  &_LogoutBtn {
    a {
      background: #252a2e;
      text-align: center;
      margin: 0 20px;
      text-decoration: none;
      color: white;
      font-weight: bold;
      border: 0;
      border-radius: 3px;
      cursor: pointer;
      padding: 10px 20px;
      font-size: 1rem;
      line-height: 25px;
    }
  }
  &_Avatar {
    margin: 0 20px;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  &_User {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
  }
  .error {
    margin: 0;
  }
}
</style>
