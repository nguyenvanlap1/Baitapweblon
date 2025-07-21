<template>
  <v-card class="pa-4" elevation="3">
    <!-- Header Section -->
    <v-container class="text-center">
      <h1 class="text-h4 font-weight-bold">
        Giới Thiệu: Hệ Thống Theo Dõi Mượn Sách
      </h1>
      <p class="text-subtitle-1">
        Quản lý mượn và trả sách hiệu quả cho thư viện của bạn.
      </p>
    </v-container>

    <!-- Features Section -->
    <v-container v-if="this.getAuth.chucvu !== null">
      <v-row>
        <!-- Feature: Quản lý sách -->
        <v-col cols="12" md="4">
          <v-card class="elevation-1 text-center" to="/sach">
            <v-card-title class="justify-center">
              <v-icon size="40" color="primary">mdi-book</v-icon>
            </v-card-title>
            <v-card-subtitle class="font-weight-bold"
              >Quản Lý Sách</v-card-subtitle
            >
            <v-card-text>Danh sách các sách</v-card-text>
          </v-card>
        </v-col>

        <!-- Feature: Hạn trả sách -->
        <v-col cols="12" md="4">
          <v-card class="elevation-1 text-center" to="/theodoimuonsach">
            <v-card-title class="justify-center">
              <v-icon size="40" color="success">mdi-clock</v-icon>
            </v-card-title>
            <v-card-subtitle class="font-weight-bold"
              >Theo dõi mượn sách</v-card-subtitle
            >
            <v-card-text>Danh sách mượn sách</v-card-text>
          </v-card>
        </v-col>

        <!-- Feature: Quản lý độc giả -->
        <v-col cols="12" md="4">
          <v-card class="elevation-1 text-center" to="docgia">
            <v-card-title class="justify-center">
              <v-icon size="40" color="error">mdi-account-multiple</v-icon>
            </v-card-title>
            <v-card-subtitle class="font-weight-bold"
              >Quản Lý Độc Giả</v-card-subtitle
            >
            <v-card-text>Danh sách độc giả</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Call to Action Section -->
    <v-container class="text-center">
      <v-btn color="primary" dark large @click="scrollUp(-200)"
        >Bắt Đầu Sử Dụng</v-btn
      >
    </v-container>
  </v-card>

  <v-container fluid>
    <v-card>
      <v-card-title class="headline background-gradient"
        >Danh Sách Sách</v-card-title
      >
      <v-card-text>
        <v-btn
          small
          color="primary"
          @click="isAdding = !isAdding"
          v-if="!isAdding && this.getAuth.chucvu"
        >
          Thêm hoặc cập nhật
        </v-btn>

        <!-- Hiển thị danh sách sách dưới dạng thẻ bài -->
        <v-row>
          <template v-for="sach in sachs" :key="sach._id">
            <v-col cols="12" sm="6" md="4">
              <v-card class="mx-3" outlined>
                <v-card-title class="text-h6">{{ sach.tensach }}</v-card-title>
                <v-card-text>
                  <p><strong>Mã sách:</strong> {{ sach._id }}</p>
                  <p><strong>Đơn giá:</strong> {{ sach.dongia }} VND</p>
                  <p><strong>Số quyển:</strong> {{ sach.soquyen }}</p>
                  <p><strong>Năm xuất bản:</strong> {{ sach.namxuatban }}</p>
                  <p><strong>Nhà xuất bản:</strong> {{ sach.manhaxuatban }}</p>
                  <p>
                    <strong>Nguồn gốc/Tác giả:</strong>
                    {{ sach.nguongoc_tacgia }}
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    small
                    color="primary"
                    v-if="this.getAuth.chucvu"
                    @click="editSach(sach._id)"
                  >
                    Chỉnh sửa
                  </v-btn>
                  <v-btn
                    small
                    color="primary"
                    v-if="this.getAuth.chucvu"
                    @click="deleteSach(sach._id)"
                  >
                    Xóa
                  </v-btn>
                  <v-btn
                    small
                    color="primary"
                    v-if="!this.getAuth.chucvu"
                    @click="muonSach(sach._id)"
                  >
                    Mượn sách
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
        </v-row>
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
    },

    scrollUp(offset) {
      window.scrollBy({
        top: -offset, // Cuộn lên (âm)
        behavior: "smooth",
      });
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
.form-horizontal {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
}
.small-width {
  max-width: 100px; /* Điều chỉnh chiều rộng */
}
.background-gradient {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
}
</style>
