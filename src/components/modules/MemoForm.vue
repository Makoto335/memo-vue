<template>
  <div class="MemoForm">
    <form @submit.prevent="handleCreate">
      <label>
        <span>Title</span>
        <input
          placeholder="20文字以内"
          class="MemoForm_Title"
          type="text"
          v-model="title"
          @blur="validateTitle"
          @keyup="validateTitle"
        />
      </label>
      <label>
        <span>Content</span>
        <textarea
          placeholder="500文字以内"
          v-model="content"
          @blur="validateContent"
          @keyup="validateContent"
        ></textarea>
      </label>
      <button class="btn" :class="{ _disabled: !isValid }" :disabled="!isValid">
        Save
      </button>
      <div class="error">{{ error }}</div>
      <div class="error">{{ titleError }}</div>
      <div class="error">{{ contentError }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import errorHandler from "../../plugins/errorHandler";

export default {
  data() {
    return {
      title: "",
      titleError: "",
      content: "",
      contentError: "",
      error: null,
    };
  },
  computed: {
    isValid() {
      return (
        this.title && !this.titleError && this.content && !this.contentError
      );
    },
  },
  methods: {
    validateTitle() {
      !this.title
        ? (this.titleError = "Titleの入力が必要です")
        : this.title.length > 20
        ? (this.titleError = "Titleは20文字以内にしてください")
        : (this.titleError = null);
    },
    validateContent() {
      !this.content
        ? (this.contentError = "Contentの入力が必要です")
        : this.content.length > 500
        ? (this.contentError = "Contentは500文字以内にしてください")
        : (this.contentError = null);
    },
    async handleCreate() {
      try {
        this.error = null;

        const res = await axios.post(
          "/api/v1/memos",
          {
            title: this.title,
            content: this.content,
          },
          {
            headers: {
              uid: window.localStorage.getItem("uid"),
              "access-token": window.localStorage.getItem("access-token"),
              client: window.localStorage.getItem("client"),
              "Content-type": "application/json",
            },
          }
        );
        this.$emit("reloadUserData");
        this.title = null;
        this.content = null;
        console.log({ res });
        return res;
      } catch (err) {
        errorHandler(err);
        this.error = "メモを保存できませんでした";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.MemoForm {
  width: 400px;
  margin: 0 auto;
  form {
    width: 100%;
    label {
      display: block;
    }
    textarea {
      width: 100%;
      display: block;
      padding: 0.5rem;
      box-sizing: border-box;
      height: 80px;
    }
  }
  &_Title {
    display: block;
    width: 99.5%;
    padding: 0.5rem;
    box-sizing: border-box;
  }
  ._disabled {
    background: grey;
  }
}
@media screen and (max-width: 400px) {
  .MemoForm {
    width: 350px;
  }
}
</style>
