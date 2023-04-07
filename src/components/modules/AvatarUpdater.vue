<template>
  <div class="AvatarUpdater">
    <div class="AvatarUpdater_Overlay"></div>
    <div class="AvatarUpdater_Wrapper">
      <form class="AvatarUpdater_Form" @submit.prevent="updateAvatar()">
        <div class="AvatarUpdater_Avatar">
          <img class="AvatarUpdater_Image" :src="previewAvatar" />
          <div class="circle">
            <label class="AvatarUpdater_CameraIcon">
              <input
                class="AvatarUpdater_ImageInput"
                type="file"
                name="image"
                @change="selectedImage"
              />
            </label>
          </div>
        </div>
        <div class="AvatarUpdater_BtnWrapper">
          <a
            class="AvatarUpdater_CancelBtn a-btn"
            href="#"
            @click.prevent.stop="onClickCancel()"
          >
            Cancel
          </a>
          <button class="AvatarUpdater_SaveBtn btn">Save</button>
        </div>
        <div class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import errorHandler from "../../plugins/errorHandler";

export default {
  props: {
    avatarInNav: String,
  },
  emits: ["closeAvatarUpdater", "reloadUserData"],
  data() {
    return {
      error: "",
      avatar: null,
      previewAvatar: this.avatarInNav,
    };
  },
  methods: {
    selectedImage(e) {
      e.preventDefault();
      this.avatar = e.target.files[0];
      this.previewAvatar = URL.createObjectURL(this.avatar);
      let size = this.avatar.size,
        type = this.avatar.type,
        errors = "";
      if (size > 2097152) {
        errors += "ファイルの上限サイズ2MBを超えています\n";
      }
      if (
        type != "image/jpeg" &&
        type != "image/gif" &&
        type != "image/png" &&
        type != "application/pdf"
      ) {
        errors +=
          ".jpg、.gif、.png、.pdfのいずれかのファイルのみ許可されています\n";
      }
      if (errors) {
        alert(errors);
        this.avatar = null;
      }
    },
    onClickCancel() {
      this.$emit("closeAvatarUpdater");
    },
    async updateAvatar() {
      this.error = null;
      let formData = new FormData();
      formData.append("user[avatar]", this.avatar);
      try {
        await axios.patch(`/api/v1//user`, formData, {
          headers: {
            uid: window.localStorage.getItem("uid"),
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
            "Content-Type": "multipart/form-data",
          },
        });
        this.$emit("reloadUserData");
        this.onClickCancel();
      } catch (err) {
        errorHandler(err);
        this.error = "画像を変更できませんでした";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.AvatarUpdater {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 6;

  &_Overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    opacity: 0.8;
  }
  &_Wrapper {
    position: absolute;
    top: 48%;
    left: 50%;
    flex-direction: column;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 500px;
    padding: 32px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #333;
  }
  &_Form {
    margin: auto;
    width: 300px;
  }
  &_Image {
    margin: 0 auto;
    display: block;
    width: 300px;
    height: 300px;
    border-radius: 50%;
  }
  &_Avatar {
    margin: 0 auto;
    height: 380px;
    width: 300px;
    position: relative;
  }
  &_ImageInput {
    display: none;
  }
  &_CameraIcon {
    position: absolute;
    bottom: 50px;
    right: 10px;
    z-index: 2;
    display: block;
    height: 80px;
    width: 80px;
    background-image: url("../../assets/images/add-camera_96.png");
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  &_BtnWrapper {
    display: flex;
    width: 300px;
    font-size: 1rem;
  }
  &_SaveBtn {
    margin: 0 20px;
  }
  &_CancelBtn {
    margin: 0 20px;
    color: black;
  }
}
</style>
