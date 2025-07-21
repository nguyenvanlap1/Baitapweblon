<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="headline background-gradient"
        >Danh Sách Sách</v-card-title
      >
      <v-card-text>
        <!-- <v-btn
          small
          color="primary"
          @click="isAdding = !isAdding"
          v-if="!isAdding && this.getAuth.chucvu"
          >Thêm hoặc cập nhật</v-btn
        >
        <SachForm
          v-if="this.getAuth.chucvu && isAdding"
          :form="form"
          :isAdding="true"
          @cancel="editingId = null"
          @submit="create"
        ></SachForm> -->
        <div class="masonry-container">
          <div class="masonry-item" v-for="sach in sachs" :key="sach._id">
            <v-card outlined class="mb-4">
              <v-img
                v-if="sach.image"
                :src="sach.image"
                max-height="200"
                cover
              ></v-img>
              <v-card-title class="text-h6">{{ sach.tensach }}</v-card-title>
              <v-card-subtitle>Mã Sách: {{ sach._id }}</v-card-subtitle>
              <v-card-text>
                <div>Đơn Giá: {{ sach.dongia }}</div>
                <div>Số Quyển: {{ sach.soquyen }}</div>
                <div>Năm Xuất Bản: {{ sach.namxuatban }}</div>
                <div>Mã NXB: {{ sach.manhaxuatban }}</div>
                <div>Nguồn Gốc/Tác Giả: {{ sach.nguongoc_tacgia }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  small
                  color="primary"
                  v-if="this.getAuth.chucvu"
                  @click="editSach(sach._id)"
                  >Chỉnh sửa</v-btn
                >
                <v-btn
                  small
                  color="error"
                  v-if="this.getAuth.chucvu"
                  @click="deleteSach(sach._id)"
                  >Xóa</v-btn
                >
                <v-btn
                  small
                  color="primary"
                  v-if="this.getAuth._id && !this.getAuth.chucvu"
                  @click="muonSach(sach._id)"
                  >Mượn sách</v-btn
                >
              </v-card-actions>
              <v-expand-transition>
                <v-card-text v-if="editingId === sach._id">
                  <SachForm
                    v-if="this.getAuth.chucvu"
                    :form="sach"
                    :isUpdate="true"
                    @cancel="editingId = null"
                    @submit="updateSach"
                  ></SachForm>
                  <MuonTraForm
                    v-if="!this.getAuth.chucvu"
                    :form="formMuonSach"
                    @cancel="editingId = null"
                    @submit="dangKyMuonSach"
                  ></MuonTraForm>
                </v-card-text>
              </v-expand-transition>
            </v-card>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import sachService from "../services/sach.service";
import MyButton from "../components/MyButton.vue";
import SachForm from "../components/SachForm.vue";
import { mapGetters } from "vuex";
import MuonTraForm from "../components/MuonTraForm.vue";
import theodoimuonsachService from "../services/theodoimuonsach.service";
export default {
  data() {
    return {
      isAdding: false,
      editingId: null,
      sachs: [],
      form: {
        _id: "",
        tensach: "",
        dongia: "",
        soquyen: "",
        namxuatban: "",
        manhaxuatban: "",
        nguongoc_tacgia: "",
        image: "",
      },
      formMuonSach: {
        ngaymuon: "",
        ngaytra: "",
      },
    };
  },
  components: {
    MyButton,
    SachForm,
    MuonTraForm,
  },
  methods: {
    async create() {
      try {
        await sachService.create(this.form);
        this.sachs = await sachService.findAll();
        this.isAdding = false;
      } catch (error) {
        console.error("Lỗi khi thêm sách:", error);
      }
    },
    async deleteSach(_id) {
      try {
        await sachService.delete(_id);
        this.sachs = await sachService.findAll();
      } catch (error) {
        console.error("Lỗi khi xóa sách:", error);
      }
    },
    editSach(_id) {
      this.editingId = _id;
    },
    muonSach(_id) {
      this.editingId = _id;

      // ✅ Reset lại form mượn sách mỗi lần chọn sách mới
      this.formMuonSach = {
        ngaymuon: "",
        ngaytra: "",
      };
    },

    async dangKyMuonSach(form) {
      const { ngaymuon, ngaytra } = form;
      const payload = {
        ngaymuon,
        ngaytra,
        masach: this.editingId,
        ngaymuon,
        ngaytra,
        madocgia: this.getAuth._id,
      };
      try {
        console.log(await theodoimuonsachService.create(payload));
        alert("đã đăng ký thành công");
        this.editingId = null;
      } catch (error) {
        console.log(error);
      }
    },

    async updateSach(updatedForm) {
      try {
        await sachService.update(updatedForm._id, updatedForm);
        this.sachs = await sachService.findAll();
        this.editingId = null;
      } catch (error) {
        console.error("Lỗi khi cập nhật sách:", error);
      }
    },
  },
  async mounted() {
    try {
      this.sachs = await sachService.findAll();
    } catch (error) {
      console.error("Lỗi khi tải danh sách sách:", error);
    }
  },
  computed: {
    ...mapGetters(["getAuth"]), // Truy cập biến auth từ Vuex store
  },
};
</script>
<style scoped>
.masonry-container {
  column-count: 3;
  column-gap: 1rem;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1rem;
}

.masonry-container {
  column-count: 1;
  column-gap: 1rem;
}

@media (min-width: 600px) {
  .masonry-container {
    column-count: 2;
  }
}

@media (min-width: 960px) {
  .masonry-container {
    column-count: 3;
  }
}
</style>
