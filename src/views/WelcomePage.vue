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
          <LoginForm/>
          <div class="WelcomePage_Text">
            <p class="change-form">
              <span @click="showLoginForm = false"
                >アカウント登録はこちらをクリック</span
              >
            </p>
          </div>
        </div>
        <div v-if="!showLoginForm">
          <SignupForm/>
          <div class="WelcomePage_Text">
            <p class="change-form">
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

</style>
