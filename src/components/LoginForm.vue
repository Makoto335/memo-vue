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
        const res = await axios.post("/api/v1/auth/sign_in", {
          email: this.email,
          password: this.password,
        });
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
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
  form {
    width: 100%;
    margin: 0 auto;
    label {
      display: block;
    }
  }
  h2 {
    text-align: center;
  }
  label {
    margin: 5px 0 5px 5px;
    font-weight: bold;
  }
  input {
    font-size: 1rem;
    display: block;
    width: 100%;
    padding: 0.5rem;
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
