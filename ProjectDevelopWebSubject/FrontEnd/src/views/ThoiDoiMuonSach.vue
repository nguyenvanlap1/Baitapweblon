<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="headline background-gradient"
        >Danh Sách Mượn Sách</v-card-title
      >
      <v-card-text>
        <v-btn
          small
          color="primary"
          class="my-4"
          @click="toggleAddForm"
          v-if="!isAdding"
        >
          Thêm hoặc cập nhật
        </v-btn>

        <v-table>
          <thead>
            <tr>
              <th class="text-left">Mã Độc Giả</th>
              <th class="text-left">Mã Sách</th>
              <th class="text-left">Ngày Mượn</th>
              <th class="text-left">Ngày Trả</th>
              <th class="text-left">Mã Nhân Viên</th>
              <th class="text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isAdding">
              <td colspan="7">
                <MuonSachForm
                  :form="form"
                  @cancel="cancelAdd"
                  @submit="create"
                />
              </td>
            </tr>

            <template v-for="muonsach in muonsachs" :key="muonsach._id">
              <tr>
                <td class="text-left">{{ muonsach.madocgia }}</td>
                <td class="text-left">{{ muonsach.masach }}</td>
                <td class="text-left">{{ muonsach.ngaymuon }}</td>
                <td class="text-left">{{ muonsach.ngaytra }}</td>
                <td class="text-left">{{ muonsach.manhanvien || "-" }}</td>
                <td class="text-left">
                  <v-btn small color="error" @click="deleteMuonSach(muonsach)"
                    >Xóa</v-btn
                  >
                  <v-btn
                    small
                    color="primary"
                    @click="editMuonSach(muonsach._id)"
                    >Chỉnh sửa</v-btn
                  >
                  <v-btn
                    small
                    color="success"
                    @click="duyetMuonSach(muonsach)"
                    v-if="!muonsach.manhanvien"
                    >Duyệt</v-btn
                  >
                </td>
              </tr>

              <tr v-if="editingId === muonsach._id">
                <td colspan="7">
                  <MuonSachForm
                    :form="muonsach"
                    :isUpdate="true"
                    @cancel="editingId = null"
                    @submit="updateMuonSach"
                  />
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
import muonSachService from "../services/theodoimuonsach.service";
import MyButton from "../components/MyButton.vue";
import MuonSachForm from "../components/TheoDoiMuonSachForm.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isAdding: false,
      editingId: null,
      muonsachs: [],
      form: {
        _id: "",
        madocgia: "",
        masach: "",
        ngaymuon: "",
        ngaytra: "",
        manhanvien: "",
      },
    };
  },
  components: {
    MyButton,
    MuonSachForm,
  },
  methods: {
    toggleAddForm() {
      this.resetForm();
      this.isAdding = true;
    },
    cancelAdd() {
      this.isAdding = false;
      this.resetForm();
    },
    resetForm() {
      this.form = {
        _id: "",
        madocgia: "",
        masach: "",
        ngaymuon: "",
        ngaytra: "",
        manhanvien: "",
      };
    },
    validateDate() {
      const muon = new Date(this.form.ngaymuon);
      const tra = new Date(this.form.ngaytra);
      return muon < tra;
    },
    async create() {
      try {
        if (!this.validateDate()) {
          alert("Ngày mượn phải trước ngày trả!");
          return;
        }
        await muonSachService.create(this.form);
        this.muonsachs = await muonSachService.findAll();
        this.cancelAdd();
      } catch (error) {
        console.error("Lỗi khi thêm mượn sách:", error.message);
      }
    },
    async deleteMuonSach(muonsach) {
      try {
        // const homNay = new Date();
        // const ngayMuon = new Date(muonsach.ngaymuon);

        // if (homNay > new Date(ngayMuon.getTime() + 86400000)) {
        //   alert("Không thể xóa bản ghi đã mượn quá 1 ngày.");
        //   return;
        // }

        const confirmDelete = confirm(
          "Bạn có chắc chắn muốn xóa bản ghi mượn sách này?"
        );
        if (!confirmDelete) return;

        await muonSachService.delete(muonsach._id);
        this.muonsachs = await muonSachService.findAll();
      } catch (error) {
        console.error("Lỗi khi xóa mượn sách:", error);
      }
    },
    editMuonSach(id) {
      this.editingId = id;
    },
    async updateMuonSach(updatedForm) {
      try {
        const muon = new Date(updatedForm.ngaymuon);
        const tra = new Date(updatedForm.ngaytra);
        if (muon >= tra) {
          alert("Ngày trả phải lớn hơn ngày mượn!");
          return;
        }
        await muonSachService.update(updatedForm._id, updatedForm);
        this.muonsachs = await muonSachService.findAll();
        this.editingId = null;
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error.message);
      }
    },
    async duyetMuonSach(muonsach) {
      try {
        await muonSachService.update(muonsach._id, {
          ...muonsach,
          manhanvien: this.getAuth._id,
        });
        this.muonsachs = await muonSachService.findAll();
      } catch (error) {
        console.error("Lỗi duyệt mượn sách:", error.message);
      }
    },
  },
  async mounted() {
    try {
      this.muonsachs = await muonSachService.findAll();
    } catch (error) {
      console.error("Lỗi khi tải danh sách mượn sách:", error.message);
    }
  },
  computed: {
    ...mapGetters(["getAuth"]),
  },
};
</script>

<style scoped>
.background-gradient {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
}
</style>
