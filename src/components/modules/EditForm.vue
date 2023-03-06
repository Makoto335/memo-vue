<template>
  <div class="EditForm">
    <div class="EditForm_Overlay"></div>
    <div class="EditForm_Wrapper">
      <form @submit.prevent="onClickEdit()">
        <label>
          <div class="EditForm_Label"><span>Title</span></div>
          <input
            class="EditForm_Title"
            type="text"
            v-model="title"
            @blur="validateTitle"
            @keyup="validateTitle"
          />
        </label>
        <label>
          <div class="EditForm_Label"><span>Content</span></div>
          <textarea
            class="EditForm_Content"
            v-model="content"
            @blur="validateContent"
            @keyup="validateContent"
          ></textarea>
        </label>
        <div class="EditForm_BtnWrapper">
          <a
            class="EditForm_CancelBtn a-btn"
            href="#"
            @click.prevent.stop="onClickCancel"
          >
            Cancel
          </a>
          <button
            class="EditForm_SaveBtn btn"
            :class="{ _disabled: !isValid }"
            :disabled="!isValid"
          >
            Save
          </button>
        </div>
        <div class="error">{{ error }}</div>
        <div class="error">{{ titleError }}</div>
        <div class="error">{{ contentError }}</div>
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
      titleError: "",
      content: this.contentToEdit,
      contentError: "",
      id: this.idToEdit,
      error: "",
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
  color: black;
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
    width: 800px;
    height: 800px;
    padding: 32px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #333;
  }
  form {
    width: 700px;
    label {
      display: block;
    }
    textarea {
      display: block;
      padding: 0.5rem 1rem 0.5rem 1rem;
      width: 100%;
      height: 450px;
    }
  }
  &_Label {
    margin-top: 10px;
    font-size: 1.5rem;
  }
  &_Title {
    font-size: 1.5rem;
    display: block;
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
  &_Content {
    font-size: 1rem;
    display: block;
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 1rem;
  }
  &_BtnWrapper {
    margin: 20px auto 0 auto;
    display: flex;
    width: 300px;
    font-size: 1rem;
  }
  &_SaveBtn {
    margin: 0 20px;
  }
  &_CancelBtn {
    color: black;
  }
  .error {
    text-align: center;
    margin: 2px 0;
  }
  ._disabled {
    background: grey;
  }
}
</style>
