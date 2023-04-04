<template>
  <div v-for="memo in memos" :key="memo.id" class="MemoList">
    <div
      class="MemoList_MemoWrapper"
      @click.prevent.stop="emitEditMemo(memo.id, memo.title, memo.content)"
    >
      <div class="MemoList_BtnWrapper">
        <a
          href="#"
          @click.prevent.stop="emitEditMemo(memo.id, memo.title, memo.content)"
        >
          <font-awesome-icon icon="fa-solid fa-pencil" class="fa-lg" />
        </a>
        <a href="#" @click.prevent.stop="emitDeleteMemo(memo.id)">
          <font-awesome-icon icon="fa-solid fa-trash-can" class="fa-lg" />
        </a>
      </div>
      <h3>{{ memo.title }}</h3>
      <p>{{ memo.content }}</p>
      <div class="MemoList_CreateAt">
        {{ formatDate(memo.created_at) }}
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  props: {
    memos: Array,
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    },
    emitEditMemo(id, title, content) {
      this.$emit("open-edit-form", { id, title, content });
    },
    emitDeleteMemo(id) {
      this.$emit("open-delete-dialog", id);
    },
  },
};
</script>

<style scoped lang="scss">
.MemoList {
  position: relative;
  background: white;
  padding: 1.5rem;
  margin: 10px auto;
  width: 340px;
  height: 200px;
  color: black;
  cursor: pointer;
  h3 {
    width: 180px;
    height: 58px;
    overflow: hidden;
    margin-top: unset;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 1rem;
  }
  p {
    width: 100%;
    height: 100px;
    overflow: hidden;
    display: block;
    margin: unset;
    font-size: 1rem;
    line-height: 1.25rem;
  }
  &_CreateAt {
    font-size: 0.875rem;
    line-height: 1.25rem;
    position: absolute;
    bottom: 1rem;
    right: 1.5rem;
  }
  &_BtnWrapper {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    a {
      display: inline-block;
      width: 5px;
      color: black;
      font-weight: bold;
      border: 0;
      border-radius: 3px;
      padding: 2px;
      cursor: pointer;
      &:nth-child(2) {
        margin-right: 20px;
        margin-left: 40px;
      }
    }
  }
}
</style>
