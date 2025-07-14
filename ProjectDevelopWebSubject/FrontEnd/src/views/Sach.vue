<template>
  <v-container v-if="getAuth._id" fluid>
    <v-card>
      <v-card-title class="headline background-gradient"
        >Danh sách Sách</v-card-title
      >
      <v-card-text>
        <v-btn
          small
          color="primary"
          @click="isAdding = !isAdding"
          v-if="!isAdding && this.getAuth.chucvu"
          >Thêm hoặc cập nhật</v-btn
        >
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Mã Sách</th>
              <th class="text-left">Tên Sách</th>
              <th class="text-left">Đơn Giá</th>
              <th class="text-left">Số Quyển</th>
              <th class="text-left">Năm Xuất Bản</th>
              <th class="text-left">Mã Nhà Xuất Bản</th>
              <th class="text-left">Nguồn Gốc/Tác Giả</th>
              <th class="text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isAdding">
              <td colspan="8">
                <SachForm
                  :form="form"
                  @cancel="isAdding = false"
                  @submit="create"
                ></SachForm>
              </td>
            </tr>
            <template v-for="sach in sachs" :key="sach._id">
              <tr>
                <td class="text-left">{{ sach._id }}</td>
                <td class="text-left">{{ sach.tensach }}</td>
                <td class="text-left">{{ sach.dongia }}</td>
                <td class="text-left">{{ sach.soquyen }}</td>
                <td class="text-left">{{ sach.namxuatban }}</td>
                <td class="text-left">{{ sach.manhaxuatban }}</td>
                <td class="text-left">{{ sach.nguongoc_tacgia }}</td>
                <td class="text-left" v-if="this.getAuth.chucvu">
                  <v-btn small color="primary" @click="deleteSach(sach._id)"
                    >Xóa</v-btn
                  >
                  <v-btn small color="primary" @click="editSach(sach._id)"
                    >Chỉnh sửa</v-btn
                  >
                </td>
                <td class="text-left" v-if="!this.getAuth.chucvu">
                  <v-btn small color="primary" @click="muonSach(sach._id)"
                    >Muợn sách</v-btn
                  >
                </td>
              </tr>
              <tr v-if="editingId === sach._id && !this.getAuth.chucvu">
                <td colspan="8">
                  <MuonTraForm
                    :form="formMuonSach"
                    @cancel="editingId = null"
                    @submit="dangKyMuonSach"
                  ></MuonTraForm>
                </td>
              </tr>
              <tr v-if="editingId === sach._id && this.getAuth.chucvu">
                <td colspan="8">
                  <SachForm
                    :form="sach"
                    :isUpdate="true"
                    @cancel="editingId = null"
                    @submit="updateSach"
                  ></SachForm>
                </td>
              </tr>
            </template>
          </tbody>
        </v-table>
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

    async dangKyMuonSach(form) {
      const { ngaymuon, ngaytra } = form;
      const payload = {
        ngaymuon,
        ngaytra,
        masach: this.editingId,
        madocgia: this.getAuth._id,
      };
      try {
        console.log("🔎 Form chuẩn bị gửi:", payload);
        alert("đã đăng ký thành công");
        await theodoimuonsachService.create(payload);
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
      //console.log("Auth trong SachList:", this.getAuth);
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
