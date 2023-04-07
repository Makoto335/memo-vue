<template>
  <div class="LoginForm">
    <h2 class="LoginForm_Title">ログイン</h2>
    <form @submit.prevent="login">
      <div class="LoginForm_InputField">
        <label class="LoginForm_Label" for="email">メールアドレス</label>
        <input
          class="LoginForm_Input"
          type="email"
          placeholder="メールアドレス"
          v-model="email"
        />
      </div>
      <div class="LoginForm_InputField">
        <label class="LoginForm_Label" for="password">パスワード</label>
        <input
          class="LoginForm_Input"
          type="password"
          placeholder="パスワード"
          v-model="password"
        />
      </div>
      <div class="error">{{ error }}</div>
      <div class="LoginForm_BtnWrapper">
        <button class="LoginForm_Btn btn">Login</button>
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
import axios from "axios";
import setItem from "../../plugins/auth/setItem";
import errorHandler from "../../plugins/errorHandler";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  components:{Loading},
  emits: ["redirectToMemoRoom"],
  data() {
    return {
      email: "",
      password: "",
      error: null,
      isLoading: false,
    };
  },
  methods: {
    async login() {
      this.error = null;
      this.isLoading = true;
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
      } finally {
        this.isLoading = false;
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

  &_Title {
    text-align: center;
  }
  &_InputField {
    margin-bottom: 20px;
  }
  &_Label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  &_Input {
    font-size: 1rem;
    display: block;
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
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
