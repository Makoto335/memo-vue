<template>
  <div class="WelcomePage">
    <div class="WelcomePage_Wrapper">
      <div class="WelcomePage_Title">
        <h1>Simple Memo</h1>
      </div>
      <div class="WelcomePage_Form">
        <div v-if="showSignUpForm">
          <SignupForm @redirectToMemoRoom="redirectToMemoRoom" />
          <div class="WelcomePage_Text">
            <p class="WelcomePage_ChangeForm">
              <span @click="showSignUpForm = false"
                >ログイン</span
              >
            </p>
          </div>
        </div>
        <div v-if="!showSignUpForm">
          <LoginForm @redirectToMemoRoom="redirectToMemoRoom" />
          <div class="WelcomePage_Text">
            <p class="WelcomePage_ChangeForm">
              <span @click="showSignUpForm = true"
                >アカウント登録はこちら</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";

export default {
  components: { SignupForm, LoginForm },
  data() {
    return {
      showSignUpForm: false,
    };
  },
  methods: {
    redirectToMemoRoom() {
      this.$router.push({ name: "MemoRoom" });
    },
  },
};
</script>

<style scoped lang="scss">
.WelcomePage {
  margin: 0 auto;
  span {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    color: #166fe5;
  }
  &_Wrapper {
    width: 600px;
    margin: 20px auto;
  }
  &_Title {
    width: 100%;
    text-align: center;
    h1 {
      color: #fcf707;
    }
  }
  &_Form {
    margin: 0 auto;
    border-radius: 3px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.6);
    background: white;
    padding: 0.5rem 0;
  }
  &_Text {
    text-align: center;
  }
  &_ChangeForm {
    font-size: 16px;
    margin: 10px;
  }
}
@media screen and (max-width: 600px) {
  .WelcomePage {
    &_Wrapper {
      width: 380px;
    }
  }
}
</style>
