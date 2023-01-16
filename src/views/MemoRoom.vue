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
       <MemoForm @getMessages="getMessages" />
      <div
        v-for="(memo, index) in getItems"
        :key="index"
        class="MemoRoom_Memos"
      >
        <div class="MemoRoom_BtnWrapper">
          <button>edit</button>
          <button>delete</button>
        </div>
        <h3>{{ memo.title }}</h3>
        <p>{{ memo.content }}</p>
        <div class="MemoRoom_CreateAt">
          {{ memo.created_at }}
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

export default {
  components: { Navbar, MemoForm, Paginate },
  data() {
    return {
      memos: [],
      currentPage: 1,
      perPage: 11,
    };
  },
  methods: {
    async getMessages() {
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
    // reverseMemos() {
    //   return this.memos.slice().reverse();
    // },
    clickCallback(pageNum) {
      this.currentPage = Number(pageNum);
    },
  },
  computed: {
    getItems: function () {
      let reversedMemos = this.memos.slice().reverse()
      let start = (this.currentPage - 1) * this.perPage;
      let end = this.currentPage * this.perPage;
      return reversedMemos.slice(start, end);
    },
    getPaginateCount: function () {
      return Math.ceil(this.memos.length / this.perPage);
    },
  },
  mounted() {
    this.getMessages();
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
