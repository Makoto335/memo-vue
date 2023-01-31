<template>
  <div class="SignupForm">
    <h2>アカウントを登録</h2>
    <form @submit.prevent="signUp">
      <div class="SignupForm_TextInput">
        <label>お名前</label>
        <input type="text" required placeholder="例）山田太郎" v-model="name" />
        <label>メールアドレス</label>
        <input
          type="email"
          required
          placeholder="例）example@example.com"
          v-model="email"
        />
        <label>パスワード（８〜５０文字）</label>
        <input
          type="password"
          required
          placeholder="パスワード"
          v-model="password"
        />
        <label>パスワード（確認用）</label>
        <input
          type="password"
          required
          placeholder="パスワード（確認用）"
          v-model="passwordConfirmation"
        />
      </div>
      <div class="SignupForm_Gender">
        <label>性別</label>
        <div class="SignupForm_GenderInput">
          <input
            type="radio"
            required
            name="gender"
            value="male"
            v-model="gender"
          />男
          <input
            type="radio"
            required
            name="gender"
            value="female"
            v-model="gender"
          />女
        </div>
      </div>
      <div class="SignupForm_DateOfBirth">
        <label>生年月日</label>
        <SelectDate v-model="dateOfBirth" />
      </div>
      <div class="SignupForm_UploadImage">
        <label>プロフィール画像</label>
        <div>
          <input
            type="file"
            name="image"
            accept=".jpg, .jpeg, .gif, .png"
            @change="selectedImage"
          />
        </div>
      </div>
      <div class="SignupForm_Terms">
        <a
          href="#"
        >
          <p>利用規約はこちら</p>
        </a>
        <input type="checkbox" required name="checkbox" v-model="termsChk" />
        <label for="consent-chk">利用規約に同意する</label>
      </div>
      <div class="error">{{ error }}</div>
      <div class="SignupForm_BtnWrapper"><button>登録する</button></div>
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
      email: "",
      gender: "",
      password: "",
      passwordConfirmation: "",
      error: null,
      dateOfBirth: defaultDate,
      termsChk: false,
      avatar: null,
    };
  },
  methods: {
    selectedImage(e) {
      e.preventDefault();
      this.avatar = e.target.files[0];
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
      formData.append("registration[gender]", this.gender);
      formData.append("registration[date_of_birth]", this.dateOfBirth);
      formData.append("registration[avatar]", this.avatar);
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
    margin: 0 0 10px 0;
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
