<template>
  <div class="NavBar">
    <div class="NavBar_Wrapper">
      <div class="error">{{ error }}</div>
      <div class="NavBar_User">
        <p>
          <span class="NavBar_Name">{{ name }}</span
          >さん
        </p>
        <a href="#" @click.prevent.stop="showModal = true"
          ><img class="NavBar_Avatar" :src="avatarInNav"
        /></a>
        <a
          class="NavBar_LogoutBtn a-btn"
          href="#"
          @click.prevent.stop="showLogoutDialog = true"
          >Logout
        </a>
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
        const res = await axios.delete("/api/v1/auth/sign_out", {
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
  width: 100%;
  &_Wrapper {
    width: 100%;
    height: 60px;
    margin: 0 auto;
    background: #fcf707;
    border-bottom: 1px solid;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  &_LogoutBtn {
    background: #252a2e;
    color: white;
    border: 0;
    cursor: pointer;
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
