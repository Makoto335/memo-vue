<template>
  <div class="MemoRoom">
    <Navbar />
    <paginate
      :page-count="getPaginateCount"
      :page-range="3"
      :margin-pages="1"
      :click-handler="clickCallback"
      :prev-text="'＜'"
      :next-text="'＞'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    >
      >
    </paginate>
    <div class="MemoRoom_Grid">
      <MemoForm @getMemos="getMemos" />
      <div v-for="memo in getItems" :key="memo.id" class="MemoRoom_Memos">
        <div class="MemoRoom_BtnWrapper">
          {{ memo.id }}
          <button
            @click="
              shouldShowModal = true;
              memoIdBeingEdited = `${memo.id}`;
              memoTitleBeingEdited = `${memo.title}`;
              memoContentBeingEdited = `${memo.content}`;
            "
          >
            edit
          </button>
          <button @click="deleteMemo(`${memo.id}`)">delete</button>
        </div>
        <h3>{{ memo.title }}</h3>
        <p>{{ memo.content }}</p>
        <div class="MemoRoom_CreateAt">
          {{ memo.created_at }}
        </div>
        <div v-if="shouldShowModal">
          <EditForm
            :memoIdBeingEdited="memoIdBeingEdited"
            :memoTitleBeingEdited="memoTitleBeingEdited"
            :memoContentBeingEdited="memoContentBeingEdited"
            @closeEditForm="closeEditForm"
            @getMemos="getMemos"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/NavBar";
import MemoForm from "../components/MemoForm";
import axios from "axios";
import Paginate from "vuejs-paginate-next";
import EditForm from "../components/modules/EditForm.vue";

export default {
  components: { Navbar, MemoForm, Paginate, EditForm },
  data() {
    return {
      memos: [],
      currentPage: 1,
      perPage: 11,
      error: "",
      shouldShowModal: false,
      memoIdBeingEdited: "",
      memoTitleBeingEdited: "",
      memoContentBeingEdited: "",
    };
  },
  methods: {
    closeEditForm() {
      this.shouldShowModal = false;
    },
    async getMemos() {
      try {
        const res = await axios.get("http://localhost:3000/user", {
          headers: {
            uid: window.localStorage.getItem("uid"),
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
          },
        });
        if (!res) {
          new Error("メッセージ一覧を取得できませんでした");
        }
        this.memos = res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteMemo(id) {
      this.error = null;
      // this.$refs.cfModal.disableButton();
      // this.isDisabled = true;
      // this.$refs.cfModal.loadSubmit();
      try {
        const res = await axios.delete(
          `http://localhost:3000/api/memos/${id}`,
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
          this.getMemos();
        }

        console.log({ res });
        return res;
      } catch (error) {
        console.log({ error });
        this.error = "メモを保存できませんでした";
      }
    },
    clickCallback(pageNum) {
      this.currentPage = Number(pageNum);
    },
  },
  computed: {
    getItems: function () {
      let reversedMemos = this.memos.slice().reverse();
      let start = (this.currentPage - 1) * this.perPage;
      let end = this.currentPage * this.perPage;
      return reversedMemos.slice(start, end);
    },
    getPaginateCount: function () {
      return Math.ceil(this.memos.length / this.perPage);
    },
  },
  mounted() {
    this.getMemos();
  },
};
</script>

<style scoped lang="scss">
.MemoRoom {
  .pagination {
    text-align: center;
    margin: 10 0 0 0;
    padding: 0;
    list-style-type: none;
    // color: white;
  }
  &_Grid {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(4, minmax(300px, 1fr));
  }
  &_Memos {
    position: relative;
    background: white;
    padding: 1.5rem;
    margin: 0.5rem;
    width: 360px;
    height: 200px;
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
      width: 360px;
      height: 100px;
      overflow: hidden;
      display: block;
      margin: unset;
      font-size: 1rem;
      line-height: 1.25rem;
    }
  }
  &_BtnWrapper {
    position: absolute;
    top: 1rem;
    right: 1rem;
    button {
      width: 80px;
      &:nth-child(2) {
        margin-left: 20px;
        background: rgb(239 68 68);
      }
    }
  }
  &_CreateAt {
    font-size: 0.875rem;
    line-height: 1.25rem;
    position: absolute;
    bottom: 1rem;
    right: 1.5rem;
  }
}
</style>
