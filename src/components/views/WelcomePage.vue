<template>
  <div class="WelcomePage">
    <div class="WelcomePage_Wrapper">
      <h1 class="WelcomePage_Title">Simple Memo</h1>
      <div class="WelcomePage_Form">
        <div v-if="showSignUpForm">
          <SignupForm @redirectToMemoRoom="redirectToMemoRoom" />
          <div class="WelcomePage_Text">
            <p class="WelcomePage_ChangeForm">
              <span
                class="WelcomePage_ChangeFormBtn"
                @click="showSignUpForm = false"
                >アカウントをお持ちの方はこちら</span
              >
            </p>
          </div>
        </div>
        <div v-if="!showSignUpForm">
          <LoginForm @redirectToMemoRoom="redirectToMemoRoom" />
          <div class="WelcomePage_Text">
            <p class="WelcomePage_ChangeForm">
              <span
                class="WelcomePage_ChangeFormBtn"
                @click="showSignUpForm = true"
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
import LoginForm from "../modules/LoginForm.vue";
import SignupForm from "../modules/SignupForm.vue";

export default {
  components: { SignupForm, LoginForm },
  data() {
    return {
      showSignUpForm: true,
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
  &_Wrapper {
    width: 600px;
    margin: 20px auto;
  }
  &_Title {
    width: 100%;
    text-align: center;
    color: #fcf707;
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
  &_ChangeFormBtn {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
    color: #166fe5;
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
