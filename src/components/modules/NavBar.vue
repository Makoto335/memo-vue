<template>
  <div class="NavBar">
    <div class="NavBar_Wrapper">
      <div class="error">
        <p class="NavBar_Error">{{ error }}</p>
      </div>
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
        <AvatarUpdater
          :avatarInNav="avatarInNav"
          @closeAvatarUpdater="closeAvatarUpdater"
          @reloadUserData="reloadUserData"
        />
      </div>
      <div v-if="showLogoutDialog">
        <LogoutDialog @closeLogoutDialog="closeLogoutDialog" @logout="logout" />
      </div>
    </div>
    <loading
      :active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading>
  </div>
</template>

<script>
import axios from "axios";
import removeItem from "../../plugins/auth/removeItem";
import AvatarUpdater from "../../components/modules/AvatarUpdater";
import errorHandler from "@/plugins/errorHandler";
import LogoutDialog from "./LogoutDialog";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  props: {
    avatar: String,
  },
  emits: ["reloadUserData"],
  components: { AvatarUpdater, LogoutDialog, Loading },
  data() {
    return {
      name: window.localStorage.getItem("name"),
      showModal: false,
      error: null,
      showLogoutDialog: false,
      isLoading: false,
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
      this.isLoading = true;
      try {
        await axios.delete("/api/v1/auth/sign_out", {
          headers: {
            uid: window.localStorage.getItem("uid"),
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
          },
        });
        removeItem();
        this.$router.push({ name: "WelcomePage" });
      } catch (err) {
        errorHandler(err);
        this.error = "ログアウトできませんでした";
        this.closeLogoutDialog();
      } finally {
        this.isLoading = false;
      }
    },
    closeAvatarUpdater() {
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
    min-height: 60px;
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
@media screen and (max-width: 800px) {
  .NavBar {
    &_Error {
      margin: unset;
    }
  }
  .error {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}
</style>
