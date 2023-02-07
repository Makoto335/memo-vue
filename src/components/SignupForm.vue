<template>
  <div class="SignupForm">
    <h2>アカウントを登録</h2>
    <form @submit.prevent="signUp">
      <div class="SignupForm_UploadImage">
        <img class="SignupForm_Avatar" :src="preview" />
        <label class="sample">
          <input type="file" name="image" @change="selectedImage" />
        </label>
      </div>
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
          placeholder="パスワード"
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
          @blur="validatePasswordConfirmation"
          @keyup="validatePasswordConfirmation"
        />
        <div class="error">{{ passwordConfirmationError }}</div>
      </div>
      <!-- <div class="SignupForm_Gender">
        <label>性別</label>
        <div class="SignupForm_GenderInput">
          <input type="radio" name="gender" value="male" v-model="gender" />男
          <input type="radio" name="gender" value="female" v-model="gender" />女
        </div>
      </div> -->
      <div class="SignupForm_DateOfBirth">
        <label>生年月日</label>
        <SelectDate v-model="dateOfBirth" />
      </div>
      <!-- <div class="SignupForm_Terms">
        <a href="#">
          <p>利用規約はこちら</p>
        </a>
        <input type="checkbox" name="checkbox" v-model="termsChk" />
        <label for="consent-chk">利用規約に同意する</label>
      </div> -->
      <div class="error">{{ error }}</div>
      <div class="SignupForm_BtnWrapper">
        <!-- <button :class="{ _disabled: !isValid }"  :disabled="!isValid"> -->
        <button :class="{ _disabled: !isValid }">登録する</button>
      </div>
    </form>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";
import setItem from "../plugins/auth/setItem";
import SelectDate from "./modules/SelectDate.vue";

export default {
  components: { SelectDate },
  emits: ["redirectToMemoRoom"],
  data() {
    const defaultDate = dayjs().toDate();
    return {
      name: "",
      nameError: "",
      email: "",
      emailError: "",
      // gender: "",
      password: "",
      passwordError: "",
      passwordConfirmation: "",
      passwordConfirmationError: "",
      error: null,
      dateOfBirth: defaultDate,
      // termsChk: false,
      avatar: null,
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
        // this.gender &&
        this.dateOfBirth &&
        this.avatar
        // this.termsChk
      );
    },
  },
  methods: {
    validateName() {
      !this.name
        ? (this.nameError = "お名前を入力してください")
        : this.name.length > 60
        ? (this.nameError = "60文字以内にして下さい")
        : (this.nameError = "");
    },
    validateEmail() {
      const regex = new RegExp(
        /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
        "gm"
      );
      !regex.test(this.email)
        ? (this.emailError = "有効なメールアドレスを入力してください")
        : this.email.length > 254
        ? (this.emailError = "254文字以内にして下さい")
        : (this.emailError = "");
    },
    validatePassword() {
      const regex = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i;
      this.password.length < 10
        ? (this.passwordError = "Password must be at least 10 characters")
        : !regex.test(this.password)
        ? (this.passwordError = "有効なパスワードを入力してください")
        : (this.passwordError = "");
    },
    validatePasswordConfirmation() {
      !(this.passwordConfirmation === this.password)
        ? (this.passwordConfirmationError = "Passwords do not match")
        : (this.passwordConfirmationError = "");
    },
    selectedImage(e) {
      e.preventDefault();
      this.avatar = e.target.files[0];
      this.preview = URL.createObjectURL(this.avatar);
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
      // formData.append("registration[gender]", this.gender);
      formData.append("registration[date_of_birth]", this.dateOfBirth);
      this.avatar ? formData.append("registration[avatar]", this.avatar) : false
      try {
        const res = await axios.post("http://localhost:3000/auth", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (!res) {
          throw new Error("アカウントを登録できませんでした");
        }
        if (!this.error) {
          setItem(res.headers, res.data.data.name);
          this.$emit("redirectToMemoRoom");
        }
        console.log({ res });
        return res;
      } catch (error) {
        this.error = "アカウントを登録できませんでした";
      }
    },
  },
};
</script>

<style scoped lang="scss">
._disabled {
  background: grey;
}
.SignupForm {
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
  &_Wrapper {
    width: 400px;
    margin: 0 auto;
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
  &_GenderInput {
    margin: 0 0 10px 0;
    height: 20px;
    line-height: 20px;
    display: flex;
    input {
      margin: unset;
      width: 30px;
      height: 100%;
      &:nth-child(2) {
        margin-left: 20px;
      }
    }
  }
  &_DateOfBirth {
    margin: 0 0 10px 0;
  }
  &_UploadImage {
    margin: 0 auto;
    height: 150px;
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
  .sample {
    position: absolute;
    bottom: -15px;
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
  &_Terms {
    margin: 0 0 10px 0;
    input[type="checkbox"] {
      transform: scale(1.5);
      margin: 0 6px 0 0;
    }
  }
  &_BtnWrapper {
    text-align: center;
    margin: 20px auto;
  }
}
</style>
