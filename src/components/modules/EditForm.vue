<template>
  <div class="EditForm">
    <div class="EditForm_Overlay"></div>
    <div class="EditForm_Wrapper">
      <form @submit.prevent="editMemo()">
        <label>
          <span>Title</span>
          <input class="EditForm_Title" type="text" v-model="title" />
        </label>
        <label>
          <span>Content</span>
          <textarea v-model="content"></textarea>
        </label>
        <input type="submit" value="保存する" />
        <div class="ConfirmationModal_Action">
          <button class="ConfirmationModal_Btn" @click="onClickCancel">
            <!-- <button
            class="ConfirmationModal_Btn"
            :disabled="isDisabled"
            @click="onClickCancel"
            :class="{ _disabledBtn: isDisabled }"
          > -->
            戻る
          </button>
        </div>
        <div class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["idToEdit", "titleToEdit", "contentToEdit"],
  data() {
    return {
      title: this.titleToEdit,
      content: this.contentToEdit,
      id: this.idToEdit,
      error: "",
    };
  },
  methods: {
    onClickCancel() {
      this.$emit("closeEditForm");
    },
    async editMemo() {
      this.error = null;
      try {
        const res = await axios.put(
          `http://localhost:3000/api/memos/${this.id}`,
          {
            title: this.title,
            content: this.content,
          },
          {
            headers: {
              uid: window.localStorage.getItem("uid"),
              "access-token": window.localStorage.getItem("access-token"),
              client: window.localStorage.getItem("client"),
            },
          }
        );
        if (!res) {
          new Error("メッセージ一覧を取得できませんでした");
        }
        if (!this.error) {
          this.$emit("getMemos");
          this.$emit("closeEditForm");
        }

        console.log({ res });
        return res;
      } catch (error) {
        console.log({ error });
        this.error = "メモを保存できませんでした";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.EditForm {
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
    width: 500px;
    height: 300px;
    padding: 32px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #333;
  }
  form {
    margin: auto;
    width: 300px;
    label {
      display: block;
    }
    textarea {
      display: block;
      padding: 0.5rem 1rem 0.5rem 1rem;
      width: 100%;
      height: 80px;
    }
  }
  &_Title {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
}
</style>
