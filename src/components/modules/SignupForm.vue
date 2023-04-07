<template>
  <div class="SignupForm">
    <h2 class="SignupForm_Title">アカウントを登録</h2>
    <form @submit.prevent="signUp">
      <AvatarUploader
        @selectedImage="selectedImage"
        :avatarError="avatarError"
        :preview="preview"
      />
      <TextInput
        type="text"
        v-model="name"
        label="お名前"
        placeholder="例）山田太郎"
        :error="nameError"
        @blur="validateName"
        @keyup="validateName"
      />
      <TextInput
        type="text"
        label="メールアドレス"
        placeholder="例）example@example.com"
        v-model="email"
        autocomplete="off"
        @blur="validateEmail"
        @keyup="validateEmail"
        :error="emailError"
      />
      <TextInput
        type="password"
        label="パスワード"
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
        :error="passwordError"
      />
      <TextInput
        type="password"
        label="パスワード（確認用）"
        placeholder="パスワード（確認用）"
        v-model="passwordConfirmation"
        autocomplete="off"
        @blur="validatePasswordConfirmation"
        @keyup="validatePasswordConfirmation"
        :error="passwordConfirmationError"
      />
      <DateOfBirthSelector
        @setDateOfBirth="setDateOfBirth"
        :error="dateOfBirthError"
        label="生年月日"
      />
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
    <loading
      :active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import 'vue-loading-overlay/dist/css/index.css';
import dayjs from "dayjs";
import axios from "axios";
import setItem from "../../plugins/auth/setItem";
import DateOfBirthSelector from "./DateOfBirthSelector.vue";
import AvatarUploader from "./AvatarUploader.vue";
import TextInput from "./TextInput.vue";
import errorHandler from "../../plugins/errorHandler";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export default {
  components: {
    AvatarUploader,
    TextInput,
    DateOfBirthSelector,
    loading: Loading,
  },
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
      preview: require("../../assets/images/blank-profile-picture_640.png"),
      isLoading: false,
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
    selectedImage(file) {
      this.avatar = file;
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
        this.avatarError = errors;
        this.avatar = null;
      }
    },
    async signUp() {
      this.error = null;
      this.isLoading = true;
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
      } catch (err) {
        errorHandler(err);
        this.error = "アカウントを登録できませんでした";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.SignupForm {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  &_Title {
    text-align: center;
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
