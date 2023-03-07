<template>
  <div class="LogoutDialog">
    <div class="LogoutDialog_Overlay"></div>
    <div class="LogoutDialog_Wrapper">
      <p>{{ message }}</p>
      <div class="LogoutDialog_BtnWrapper">
        <a class="LogoutDialog_Btn LogoutDialog_CancelBtn" href="#" @click.prevent.stop="onClickCancel()"
          >Cancel</a
        >
        <a
          class="LogoutDialog_Btn LogoutDialog_DeleteBtn"
          @click.prevent.stop="onClickDelete()"
          >Logout</a
        >
      </div>
      <div class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "ログアウトします。よろしいですか？",
      error: "",
    };
  },
  methods: {
    onClickCancel() {
      this.$emit("closeLogoutDialog");
    },
    onClickDelete() {
      this.$emit("logout");
    },
  },
};
</script>

<style scoped lang="scss">
.LogoutDialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
  p{
    color:#000000;
  }
  &_Overlay {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    opacity: 0.2;
  }
  &_Wrapper {
    position: absolute;
    top: 48%;
    left: 50%;
    display: flex;
    flex-direction: column;
    transform: translate(-50%, -50%);
    width: 320px;
    height: 150px;
    padding: 20px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #333;
    text-align: center;
  }
  &_BtnWrapper {
    margin-top: auto;
    display: flex;
    justify-content: center;
  }
  &_Btn {
    width: 130px;
    margin: 0 20px;
    text-decoration: none;
    color: white;
    font-weight: bold;
    border-radius: 3px;
    padding: 10px 20px;
    line-height: 1.5;
    cursor: pointer;
    font-size: 1rem;
  }
  &_CancelBtn{
    border: 1px solid #000000;
    color: black;
  }
  &_DeleteBtn {
    border: 0;
    background: rgb(239 68 68);
    color: white;
  }
}
</style>
