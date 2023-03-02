<template>
  <div class="MemoForm">
    <form @submit.prevent="handleCreate">
      <label>
        <span>Title</span>
        <input class="MemoForm_Title" type="text" v-model="title" />
      </label>
      <label>
        <span>Content</span>
        <textarea v-model="content"></textarea>
      </label>
      <button class="MemoForm_SaveBtn">Save</button>
      <div class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import errorHandler from "../plugins/errorHandler";

export default {
  data() {
    return {
      title: "",
      content: "",
      error: null,
    };
  },
  methods: {
    async handleCreate() {
      try {
        this.error = null;

        const res = await axios.post(
          "http://localhost:3000/api/memos",
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
  form {
    width: 300px;
    margin-left: 1.5rem;
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
  &_SaveBtn {
    margin-top: 10px;
    width: 100px;
    text-align: center;
    text-decoration: none;
    background: #5FFE0E;
    font-weight: bold;
    border: 0;
    border-radius: 3px;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 1rem;
    line-height: 25px;
  }
}
</style>
