<template>
  <div class="MemoForm">
    <form @submit.prevent="handleCreate">
      <label>
        <span>Title</span>
        <input type="text" v-model="title" />
      </label>
      <label>
        <span>Content</span>
        <input type="textarea" v-model="content" />
      </label>
      <input type="submit" value="保存する" />
      <div class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

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
          "http://localhost:3000/memos",
          {
            title: this.title,
            content: this.content,
          },
          {
            headers: {
              uid: window.localStorage.getItem("uid"),
              "access-token": window.localStorage.getItem("access-token"),
              client: window.localStorage.getItem("client"),
              "Content-type": "application/json" ,
            },
          }
        );

        if (!res) {
          throw new Error("メモを保存できませんでした");
        }
        if (!this.error) {
          this.$emit("getMessages");
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

<style scoped lang="scss"></style>
