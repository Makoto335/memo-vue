<template>
  <div class="DeleteDialog">
    <div class="DeleteDialog_Overlay"></div>
    <div class="DeleteDialog_Wrapper">
      <p>{{ message }}</p>
      <div class="DeleteDialog_Action">
        <button class="DeleteDialog_Btn" @click="onClickCancel">戻る</button>
        <button class="DeleteDialog_Btn DeleteDialog_DeleteBtn" @click="onClickDelete">削除</button>
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
    &_Action {
    margin-top: auto;
    display: flex;
    justify-content: center;
  }
  &_Btn {
    width: 130px;
    margin: 0 20px;
    padding: 8px;
    line-height: 1.5;
    font-weight: bold;
    cursor: pointer;
  }
  &_DeleteBtn {
    background: rgb(239 68 68);
    color: white;
  }
}
</style>
