<template>
  <div class="LoginForm">
    <h2>ログイン</h2>
    <form @submit.prevent="login">
      <label>メールアドレス</label>
      <input
        type="email"
        required
        placeholder="メールアドレス"
        v-model="email"
      />
      <label>パスワード（８〜５０文字）</label>
      <input
        type="password"
        required
        placeholder="パスワード"
        v-model="password"
      />
      <div class="error">{{ error }}</div>
      <div class="LoginForm_BtnWrapper"><button>ログインする</button></div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import setItem from "../plugins/auth/setItem";

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
      try {
        this.error = null;

        const res = await axios.post("http://localhost:3000/auth/sign_in", {
          email: this.email,
          password: this.password,
        });

        if (!res) {
          throw new Error("メールアドレスかパスワードが違います");
        }
        if (!this.error) {
          setItem(res.headers, res.data.data.name);
          this.$emit("redirectToMemoRoom");
        }

        console.log({ res });
        return res;
      } catch (error) {
        console.log({ error });
        this.error = "メールアドレスかパスワードが違います";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.LoginForm {
  label {
    margin-left: 5px;
    font-weight: bold;
  }
  h2 {
    text-align: center;
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
  &_BtnWrapper {
    text-align: center;
    margin: 20px auto;
  }
}
</style>
