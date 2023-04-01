<template>
  <div class="MemoRoom">
    <Navbar :avatar="avatar" @reloadUserData="reloadUserData" />
    <div class="error">{{ error }}</div>
    <paginate
      :page-count="getPaginateCount"
      :page-range="3"
      :margin-pages="1"
      :click-handler="clickCallback"
      :prev-text="'＜'"
      :next-text="'＞'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :prev-class="'prev-class'"
      :next-class="'next-class'"
    >
      >
    </paginate>
    <div class="MemoRoom_Grid">
      <MemoForm @reloadUserData="reloadUserData" />
      <div v-for="memo in reversedMemos" :key="memo.id" class="MemoRoom_Memos">
        <div
          class="MemoRoom_MemoWrapper"
          @click.prevent.stop="
            showEditForm = true;
            setIdToEdit(`${memo.id}`);
            titleToEdit = `${memo.title}`;
            contentToEdit = `${memo.content}`;
          "
        >
          <div class="MemoRoom_BtnWrapper">
            <a
              href="#"
              @click.prevent.stop="
                showEditForm = true;
                setIdToEdit(`${memo.id}`);
                titleToEdit = `${memo.title}`;
                contentToEdit = `${memo.content}`;
              "
            >
              <font-awesome-icon icon="fa-solid fa-pencil" class="fa-lg" />
            </a>
            <a
              href="#"
              @click.prevent.stop="
                showDeleteDialog = true;
                setIdToDelete(`${memo.id}`);
              "
            >
              <font-awesome-icon icon="fa-solid fa-trash-can" class="fa-lg" />
            </a>
          </div>
          <h3>{{ memo.title }}</h3>
          <p>{{ memo.content }}</p>
          <div class="MemoRoom_CreateAt">
            {{ formatDate(memo.created_at) }}
          </div>
        </div>
      </div>
    </div>
    <div v-if="showEditForm">
      <EditForm
        :titleToEdit="titleToEdit"
        :contentToEdit="contentToEdit"
        @closeEditForm="closeEditForm"
        @reloadUserData="reloadUserData"
        @editMemo="editMemo"
      />
    </div>
    <div v-if="showDeleteDialog">
      <DeleteDialog
        @closeDeleteDialog="closeDeleteDialog"
        @deleteMemo="deleteMemo(idToDelete)"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/NavBar";
import MemoForm from "../components/MemoForm";
import axios from "axios";
import Paginate from "vuejs-paginate-next";
import EditForm from "../components/modules/EditForm";
import DeleteDialog from "../components/modules/DeleteDialog";
import errorHandler from "@/plugins/errorHandler";
import dayjs from "dayjs";

export default {
  components: { Navbar, MemoForm, Paginate, EditForm, DeleteDialog },
  data() {
    return {
      memos: [],
      currentPage: 1,
      perPage: 11,
      error: "",
      showEditForm: false,
      idToEdit: "",
      titleToEdit: "",
      contentToEdit: "",
      idToDelete: "",
      showDeleteDialog: false,
      avatar: "",
    };
  },
  methods: {
    async reloadUserData() {
      this.error = null;
      try {
        const res = await axios.get("/api/v1/user", {
          headers: {
            uid: window.localStorage.getItem("uid"),
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
          },
        });
        this.memos = res.data.user.memos_array;
        this.avatar = res.data.user.avatar_url;
        return res;
      } catch (err) {
        errorHandler(err);
        this.error = "正しくデータを取得できませんでした";
      }
    },
    async editMemo(editedTitle, editedContent) {
      this.error = null;
      try {
        const res = await axios.put(
          `/api/v1//memos/${this.idToEdit}`,
          {
            title: editedTitle,
            content: editedContent,
          },
          {
            headers: {
              uid: window.localStorage.getItem("uid"),
              "access-token": window.localStorage.getItem("access-token"),
              client: window.localStorage.getItem("client"),
            },
          }
        );
        this.reloadUserData();
        return res;
      } catch (err) {
        errorHandler(err);
        this.error = "メモを編集できませんでした";
      } finally {
        this.closeEditForm();
        this.idToEdit = "";
      }
    },
    setIdToEdit(id) {
      this.idToEdit = id;
    },
    closeEditForm() {
      this.idToEdit = "";
      this.showEditForm = false;
    },
    async deleteMemo(id) {
      this.error = null;
      try {
        const res = await axios.delete(`/api/v1/memos/${id}`, {
          headers: {
            uid: window.localStorage.getItem("uid"),
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
          },
        });
        this.reloadUserData();
        this.closeDeleteDialog();
        console.log({ res });
        return res;
      } catch (err) {
        console.log({ err });
        errorHandler(err);
        this.error = "メモを削除できませんでした";
      } finally {
        this.closeDeleteDialog();
        this.idToDelete = "";
      }
    },
    setIdToDelete(id) {
      this.idToDelete = id;
    },
    closeDeleteDialog() {
      this.idToDelete = "";
      this.showDeleteDialog = false;
    },
    clickCallback(pageNum) {
      this.currentPage = Number(pageNum);
    },
    formatDate(date) {
      return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  computed: {
    reversedMemos: function () {
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
    this.reloadUserData();
  },
};
</script>

<style scoped lang="scss">
.MemoRoom {
  min-width: 400px;
  color: white;
  &_Grid {
    display: grid;
    gap: 5px;
    justify-content: center;
    grid-template-columns: repeat(4, minmax(300px, 1fr));
  }
  @media screen and (max-width: 1630px) {
    &_Grid {
      grid-template-columns: repeat(3, minmax(300px, 1fr));
    }
  }
  @media screen and (max-width: 1250px) {
    &_Grid {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
    }
  }
  @media screen and (max-width: 900px) {
    &_Grid {
      grid-template-columns: repeat(1, minmax(300px, 1fr));
    }
  }
  &_Memos {
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
  &_CreateAt {
    font-size: 0.875rem;
    line-height: 1.25rem;
    position: absolute;
    bottom: 1rem;
    right: 1.5rem;
  }
  .error {
    text-align: center;
    font-size: 1rem;
  }
}
</style>
