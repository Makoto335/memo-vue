<template>
  <div class="WelcomePage">
    <div class="WelcomePage_Wrapper">
      <div class="WelcomePage_AppDescription">
        <AppDescription />
      </div>
      <div class="WelcomePage_Form">
        <div class="WelcomePage_Text">
        </div>
        <div v-if="showLoginForm">
          <LoginForm @redirectToMemoRoom="redirectToMemoRoom"/>
          <div class="WelcomePage_Text">
            <p class="WelcomePage_ChangeForm">
              <span @click="showLoginForm = false"
                >アカウント登録はこちらをクリック</span
              >
            </p>
          </div>
        </div>
        <div v-if="!showLoginForm">
          <SignupForm @redirectToMemoRoom="redirectToMemoRoom"/>
          <div class="WelcomePage_Text">
            <p class="WelcomePage_ChangeForm">
              <span @click="showLoginForm = true"
                >ログインはこちらをクリック</span
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
import AppDescription from "../components/AppDescription.vue";

export default {
  components: { SignupForm, LoginForm, AppDescription },
  data() {
    return {
      showLoginForm: false,
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
  span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
  // padding-top: 80px;
  &_Wrapper {
    display: flex;
    width: 1280px;
    margin: 60px auto;
    // background: white;
    // box-shadow: 4px 4px 4px 4px rgba(0,0,0,0.6);
  }
  &_AppDescription {
    width: 50%;
    // background: #51b392;
    // background-image: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
  }
  &_Form {
    margin: 0 auto;
    border-radius: 3px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.6);
    // box-shadow: 2px 4px 6px rgba(28, 6, 49, 0.1);
    background: white;
    padding: 10px;
  }
  &_Text {
    text-align: center;
  }
  &_ChangeForm {
  font-size: 16px;
  margin: 10px;
}
}
</style>

