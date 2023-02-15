<template>
  <div class="UpdateAvatar">
    <div class="UpdateAvatar_Overlay"></div>
    <div class="UpdateAvatar_Wrapper">
      <form @submit.prevent="updateAvatar()">
        <div class="UpdateAvatar_UpdateImage">
          >
          <img class="UpdateAvatar_Avatar" :src="previewAvatar" />
          <div class="circle">
            <label class="sample">
              <input type="file" name="image" @change="selectedImage" />
            </label>
          </div>
        </div>
        <input type="submit" value="保存する" />
        <div class="ConfirmationModal_Action">
          <button class="ConfirmationModal_Btn" @click="onClickCancel">
            戻る
          </button>
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
  props: ["avatarInNav"],
  data() {
    return {
      title: this.titleToEdit,
      content: this.contentToEdit,
      id: this.idToEdit,
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
      // name = file.name,
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
        this.avatar = "";
      }
    },
    onClickCancel() {
      this.$emit("closeUpdateAvatar");
    },
    async updateAvatar() {
      this.error = null;
      let formData = new FormData();
      formData.append("user[avatar]", this.avatar);
      try {
        const res = await axios.patch(`http://localhost:3000/user`, formData, {
          headers: {
            uid: window.localStorage.getItem("uid"),
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
            "Content-Type": "multipart/form-data",
          },
        });
        this.$emit("getMemos");
        this.onClickCancel();
        console.log({ res });
        return res;
      } catch (err) {
        errorHandler(err);
        this.error = "アカウントを登録できませんでした";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.UpdateAvatar {
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
    // display: flex;
    flex-direction: column;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    padding: 32px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #333;
  }
  form {
    margin: auto;
    width: 300px;
  }
  &_Avatar {
    margin: 0 auto;
    display: block;
    width: 300px;
    height: 300px;
    border-radius: 50%;
  }
  &_UpdateImage {
    margin: 0 auto;
    height: 300px;
    width: 300px;
    position: relative;
    input {
      display: none;
    }
  }
}
.sample {
  position: absolute;
  bottom: -50px;
  right: 0;
  z-index: 2;
  display: block;
  height: 80px;
  width: 80px;
  background-image: url("../../assets/images/add-camera_96.png");
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}
</style>
