<template>
  <div class="SignupForm">
    <h2>アカウントを登録</h2>
    <form @submit.prevent="signUp">
      <div class="SignupForm_UploadAvatar">
        <img class="SignupForm_Avatar" :src="preview" />
        <label class="SignupForm_CameraIcon">
          <input type="file" name="image" @change="selectedImage" />
        </label>
      </div>
      <div class="error SignupForm_AvatarError">{{ avatarError }}</div>
      <div class="SignupForm_TextInput">
        <label>お名前</label>
        <input
          type="text"
          placeholder="例）山田太郎"
          v-model="name"
          @blur="validateName"
          @keyup="validateName"
        />
        <div class="error">{{ nameError }}</div>
        <label>メールアドレス</label>
        <input
          type="text"
          placeholder="例）example@example.com"
          v-model="email"
          autocomplete="off"
          @blur="validateEmail"
          @keyup="validateEmail"
        />
        <div class="error">{{ emailError }}</div>
        <label>パスワード</label>
        <input
          type="password"
          placeholder="１０文字以上の半角英字と半角数字の混合"
          v-model="password"
          autocomplete="off"
          @blur="
            validatePassword();
            validatePasswordConfirmation();
          "
          @keyup="
            validatePassword();
            validatePasswordConfirmation();
          "
        />
        <div class="error">{{ passwordError }}</div>
        <label>パスワード（確認用）</label>
        <input
          type="password"
          placeholder="パスワード（確認用）"
          v-model="passwordConfirmation"
          autocomplete="off"
          @blur="validatePasswordConfirmation"
          @keyup="validatePasswordConfirmation"
        />
        <div class="error">{{ passwordConfirmationError }}</div>
      </div>
      <div class="SignupForm_DateOfBirth">
        <label>生年月日</label>
        <SelectDate @setDateOfBirth="setDateOfBirth" />
        <div class="error">{{ dateOfBirthError }}</div>
      </div>

      <div class="error">{{ error }}</div>
      <div class="SignupForm_BtnWrapper">
        <button
          class="SignupForm_Btn btn"
          :class="{ _disabled: !isValid }"
          :disabled="!isValid"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
import setItem from "../plugins/auth/setItem";
import SelectDate from "./modules/SelectDate.vue";
import errorHandler from "../plugins/errorHandler";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default {
  components: { SelectDate },
  emits: ["redirectToMemoRoom"],
  data() {
    return {
      name: "",
      nameError: null,
      email: "",
      emailError: null,
      password: "",
      passwordError: null,
      passwordConfirmation: "",
      passwordConfirmationError: null,
      error: null,
      dateOfBirth: "",
      dateOfBirthError: null,
      avatar: null,
      avatarError: null,
      preview: require("../assets/images/blank-profile-picture_640.png"),
    };
  },
  computed: {
    isValid() {
      return (
        this.name &&
        !this.nameError &&
        this.email &&
        !this.emailError &&
        this.password &&
        !this.passwordError &&
        this.passwordConfirmation &&
        !this.passwordConfirmationError &&
        this.dateOfBirth &&
        !this.dateOfBirthError
      );
    },
  },
  watch: {
    dateOfBirth(date) {
      if (
        !dayjs(date, "YYYY-M-D", true).isValid() ||
        !dayjs(date, "YYYY-M-D", true).isBefore()
      ) {
        this.dateOfBirthError = "有効な日付を選択してください";
      } else {
        this.dateOfBirthError = null;
      }
    },
  },
  methods: {
    setDateOfBirth(value) {
      this.dateOfBirth = value;
    },
    validateName() {
      !this.name
        ? (this.nameError = "お名前を入力してください")
        : this.name.length > 60
        ? (this.nameError = "60文字以内にしてください")
        : (this.nameError = null);
    },
    validateEmail() {
      const regex = new RegExp(
        /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
        "gm"
      );
      !regex.test(this.email)
        ? (this.emailError = "有効なメールアドレスを入力してください")
        : this.email.length > 254
        ? (this.emailError = "254文字以内にしてください")
        : (this.emailError = null);
    },
    validatePassword() {
      const regex = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,300}$/i;
      this.password.length < 10
        ? (this.passwordError =
            "１０文字以上の半角英字と半角数字の混合にしてください")
        : !regex.test(this.password)
        ? (this.passwordError =
            "半角のアルファベットと数字をそれぞれ一文字以上入れてください")
        : this.password.length > 128
        ? (this.passwordError = "128文字以内にしてください")
        : (this.passwordError = null);
    },
    validatePasswordConfirmation() {
      !(this.passwordConfirmation === this.password)
        ? (this.passwordConfirmationError = "パスワードが一致していません")
        : (this.passwordConfirmationError = null);
    },
    selectedImage(e) {
      e.preventDefault();
      this.avatar = e.target.files[0];
      this.avatarError = null;
      this.preview = URL.createObjectURL(this.avatar);
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
        console.log(errors);
        this.avatarError = errors;
        this.avatar = null;
      }
    },
    async signUp() {
      this.error = null;
      let formData = new FormData();
      formData.append("registration[name]", this.name);
      formData.append("registration[email]", this.email);
      formData.append("registration[password]", this.password);
      formData.append(
        "registration[password_confirmation]",
        this.passwordConfirmation
      );
      formData.append("registration[date_of_birth]", this.dateOfBirth);
      this.avatar
        ? formData.append("registration[avatar]", this.avatar)
        : false;
      try {
        const res = await axios.post("/api/v1/auth", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setItem(res.headers, res.data.data.name);
        this.$emit("redirectToMemoRoom");
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
.SignupForm {
  color: black;
  width: 500px;
  margin: 0 auto;
  padding: 10px;
  h2 {
    text-align: center;
  }
  label {
    margin-left: 5px;
    font-weight: bold;
  }
  &_TextInput {
    input {
      width: 100%;
      padding: 12px 20px;
      margin: 0 0 8px 0;
      border-radius: 4px;
      border: 1px solid #eee;
      outline: none;
      box-sizing: border-box;
    }
  }
  &_DateOfBirth {
    margin: 0 0 10px 0;
  }
  &_UploadAvatar {
    margin: 0 auto;
    height: 200px;
    width: 150px;
    position: relative;
    input {
      display: none;
    }
  }
  &_Avatar {
    margin: 0 auto;
    display: block;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  &_AvatarError {
    white-space: pre-line;
  }
  &_CameraIcon {
    position: absolute;
    bottom: 25px;
    right: 0;
    z-index: 2;
    display: block;
    height: 54px;
    width: 54px;
    background-image: url("../assets/images/add-camera_96.png");
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }
  &_BtnWrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  &_Btn {
    width: 200px;
    background: #fcf707;
    border: 0;
  }
  ._disabled {
    background: grey;
  }
}
</style>
