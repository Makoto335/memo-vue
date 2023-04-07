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
    </paginate>
    <div class="MemoRoom_Grid">
      <MemoForm @reloadUserData="reloadUserData" />
      <MemoList
        :memos="reversedMemos"
        @open-edit-form="openEditForm"
        @open-delete-dialog="openDeleteDialog"
      ></MemoList>
    </div>
    <div v-if="showEditForm">
      <EditForm
        :titleToEdit="titleToEdit"
        :contentToEdit="contentToEdit"
        @closeEditForm="closeEditForm"
        @editMemo="editMemo"
      />
    </div>
    <div v-if="showDeleteDialog">
      <DeleteDialog
        @closeDeleteDialog="closeDeleteDialog"
        @deleteMemo="deleteMemo(idToDelete)"
      />
    </div>
    <loading
      :active="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading>
  </div>
</template>

<script>
import Navbar from "../modules/NavBar";
import MemoForm from "../modules/MemoForm";
import MemoList from "../modules/MemoList.vue";
import axios from "axios";
import Paginate from "vuejs-paginate-next";
import EditForm from "../modules/EditForm";
import DeleteDialog from "../modules/DeleteDialog";
import errorHandler from "@/plugins/errorHandler";
import dayjs from "dayjs";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  components: {
    Navbar,
    MemoForm,
    Paginate,
    EditForm,
    DeleteDialog,
    MemoList,
    Loading,
  },
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
      isLoading: false,
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
      } catch (err) {
        errorHandler(err);
        this.error = "正しくデータを取得できませんでした";
      }
    },
    async editMemo(editedTitle, editedContent) {
      this.error = null;
      this.isLoading = true;
      try {
        await axios.put(
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
      } catch (err) {
        errorHandler(err);
        this.error = "メモを編集できませんでした";
      } finally {
        this.closeEditForm();
        this.idToEdit = "";
        this.isLoading = false;
      }
    },
    openEditForm({ id, title, content }) {
      this.showEditForm = true;
      this.idToEdit = id;
      this.titleToEdit = title;
      this.contentToEdit = content;
    },
    closeEditForm() {
      this.idToEdit = "";
      this.showEditForm = false;
    },
    async deleteMemo(id) {
      this.error = null;
      this.isLoading = true;
      try {
        await axios.delete(`/api/v1/memos/${id}`, {
          headers: {
            uid: window.localStorage.getItem("uid"),
            "access-token": window.localStorage.getItem("access-token"),
            client: window.localStorage.getItem("client"),
          },
        });
        this.reloadUserData();
        this.closeDeleteDialog();
      } catch (err) {
        errorHandler(err);
        this.error = "メモを削除できませんでした";
      } finally {
        this.closeDeleteDialog();
        this.idToDelete = "";
        this.isLoading = false;
      }
    },
    openDeleteDialog(id) {
      this.showDeleteDialog = true;
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
  min-width: 300px;
  color: white;
  &_Grid {
    display: grid;
    gap: 5px;
    justify-content: center;
    grid-template-columns: repeat(4, minmax(300px, 1fr));
  }
  .error {
    text-align: center;
    font-size: 1rem;
  }
}
@media screen and (max-width: 1630px) {
  .MemoRoom {
    &_Grid {
      grid-template-columns: repeat(3, minmax(300px, 1fr));
    }
  }
}
@media screen and (max-width: 1250px) {
  .MemoRoom {
    &_Grid {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
    }
  }
}
@media screen and (max-width: 900px) {
  .MemoRoom {
    &_Grid {
      grid-template-columns: repeat(1, minmax(300px, 1fr));
    }
  }
}
@media screen and (max-width: 400px) {
  .MemoRoom {
    &_Memos {
      width: 300px;
    }
  }
}
</style>
