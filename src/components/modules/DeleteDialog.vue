<template>
  <div class="DeleteDialog">
    <div class="DeleteDialog_Overlay"></div>
    <div class="DeleteDialog_Wrapper">
      <p>{{ message }}</p>
      <div class="DeleteDialog_BtnWrapper">
        <a
          class="a-btn DeleteDialog_CancelBtn"
          href="#"
          @click.prevent.stop="onClickCancel()"
          >Cancel</a
        >
        <a
          class="a-btn DeleteDialog_DeleteBtn"
          @click.prevent.stop="onClickDelete()"
          >Delete</a
        >
      </div>
      <div class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["idToEdit", "titleToEdit", "contentToEdit"],
  data() {
    return {
      message: "メモを削除します。よろしいですか？",
      error: "",
    };
  },
  methods: {
    onClickCancel() {
      this.$emit("closeDeleteDialog");
    },
    onClickDelete() {
      this.$emit("deleteMemo");
    },
  },
};
</script>

<style scoped lang="scss">
.DeleteDialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
  p {
    color: #000000;
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
  &_CancelBtn {
    border: 1px solid #000000;
    color: black;
  }
  &_DeleteBtn {
    background: rgb(239 68 68);
    color: white;
  }
}
</style>
