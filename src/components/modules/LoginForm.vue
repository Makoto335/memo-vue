<template>
  <div class="LoginForm">
    <h2>ログイン</h2>
    <form @submit.prevent="login">
      <div class="input-field">
        <label for="email">メールアドレス</label>
        <input id="email" type="email" placeholder="メールアドレス" v-model="email" />
      </div>
      <div class="input-field">
        <label for="password">パスワード</label>
        <input id="password" type="password" placeholder="パスワード" v-model="password" />
      </div>
      <div class="error">{{ error }}</div>
      <div class="LoginForm_BtnWrapper">
        <button class="LoginForm_Btn btn">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import setItem from "../../plugins/auth/setItem";
import errorHandler from "../../plugins/errorHandler";

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
        const res = await axios.post("/api/v1/auth/sign_in", {
          email: this.email,
          password: this.password,
        });
        setItem(res.headers, res.data.data.name);
        this.$emit("redirectToMemoRoom");
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
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;

  h2 {
    text-align: center;
  }
  .input-field {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      font-size: 1rem;
      display: block;
      width: 100%;
      padding: 0.5rem;
      box-sizing: border-box;
    }
  }
  &_BtnWrapper {
    display: flex;
    justify-content: center;
  }
  &_Btn {
    width: 200px;
    border: 0;
  }
}
</style>
