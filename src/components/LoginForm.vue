<template>
  <div class="LoginForm">
    <h2>ログイン</h2>
    <form @submit.prevent="login">
      <label>メールアドレス</label>
      <input type="email" placeholder="メールアドレス" v-model="email" />
      <label>パスワード</label>
      <input type="password" placeholder="パスワード" v-model="password" />
      <div class="error">{{ error }}</div>
      <div class="LoginForm_BtnWrapper">
        <button class="LoginForm_Btn btn">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import setItem from "../plugins/auth/setItem";
import errorHandler from "../plugins/errorHandler";

export default {
  emits: ["redirectToMemoRoom"],
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const res = await axios.post(
          "https://seaentrance.link/api/v1/auth/sign_in",
          {
            email: this.email,
            password: this.password,
          }
        );
        setItem(res.headers, res.data.data.name);
        this.$emit("redirectToMemoRoom");
        console.log({ res });
        return res;
      } catch (err) {
        errorHandler(err);
        this.error = "メールアドレスかパスワードが違います";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.LoginForm {
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
  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px auto;
    border-radius: 4px;
    border: 1px solid #eee;
    outline: none;
    box-sizing: border-box;
  }
  button {
    width: 200px;
  }
  &_BtnWrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  &_Btn {
    width: 200px;
    border: 0;
  }
}
</style>
