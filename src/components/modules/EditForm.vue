<template>
  <div class="EditForm">
    <div class="EditForm_Overlay"></div>
    <div class="EditForm_Wrapper">
      <form @submit.prevent="onClickEdit()">
        <label>
          <span>Title</span>
          <input class="EditForm_Title" type="text" v-model="title" />
        </label>
        <label>
          <span>Content</span>
          <textarea v-model="content"></textarea>
        </label>
        <div class="EditForm_BtnWrapper">
          <a
            class="EditForm_CancelBtn"
            href="#"
            @click.prevent.stop="onClickCancel"
          >
            Cancel
          </a>
          <button class="EditForm_SaveBtn">Save</button>
        </div>
        <div class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["titleToEdit", "contentToEdit"],
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
    onClickEdit() {
      this.$emit("editMemo", this.title, this.content);
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
  &_BtnWrapper {
    margin-top: 20px;
    display: flex;
    width: 300px;
    font-size: 1rem;
  }
  &_SaveBtn {
    width: 160px;
    text-align: center;
    margin: 0 20px;
    text-decoration: none;
    background: #5FFE0E;
    color: #000000;
    // background: #367edd;
    font-weight: bold;
    border: 0;
    border-radius: 3px;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 1rem;
    line-height: 25px;
  }
  &_CancelBtn {
    margin: 0 20px;
    width: 120px;
    font-size: 1rem;
    text-decoration: none;
    padding: 10px 20px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid #000000;
    color: black;
    font-weight: bold;
    background: white;
    line-height: 25px;
  }
}
</style>
