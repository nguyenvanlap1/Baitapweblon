<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="headline background-gradient"
        >Danh Sách Mượn Sách</v-card-title
      >
      <v-card-text>
        <v-btn
          small
          class="my-4"
          color="primary"
          @click="isAdding = !isAdding"
          v-if="!isAdding"
          >Thêm hoặc cập nhật</v-btn
        >
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Mã Độc Giả</th>
              <th class="text-left">Mã Sách</th>
              <th class="text-left">Ngày Mượn</th>
              <th class="text-left">Ngày Trả</th>
              <th class="text-left">Trang Thai</th>
              <th class="text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isAdding">
              <td colspan="7">
                <MuonSachForm
                  :form="form"
                  @cancel="isAdding = false"
                  @submit="create"
                ></MuonSachForm>
              </td>
            </tr>
            <template v-for="muonsach in muonsachs" :key="muonsach._id">
              <tr>
                <td class="text-left">{{ muonsach.madocgia }}</td>
                <td class="text-left">{{ muonsach.masach }}</td>
                <td class="text-left">{{ muonsach.ngaymuon }}</td>
                <td class="text-left">{{ muonsach.ngaytra }}</td>
                <td class="text-left">
                  {{ muonsach.manhanvien ? "đã duyệt" : "chưa duyệt" }}
                </td>
                <td class="text-left">
                  <v-btn
                    small
                    color="error"
                    @click="deleteMuonSach(muonsach._id)"
                    v-if="!muonsach.manhanvien"
                    >Xóa</v-btn
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
                  ></MuonSachForm>
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
import muonSachService from "../services/theodoimuonsach.service"; // Import service cho mượn sách
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
    async create() {
      try {
        await muonSachService.create(this.form);
        this.muonsachs = await muonSachService.findAll();
        this.isAdding = false;
      } catch (error) {
        console.error("Lỗi khi thêm mượn sách:", error);
      }
    },
    async deleteMuonSach(_id) {
      try {
        await muonSachService.delete(_id);
        this.muonsachs = await muonSachService.findByMadocgia("Lap");
      } catch (error) {
        console.error("Lỗi khi xóa mượn sách:", error);
      }
    },
    editMuonSach(_id) {
      this.editingId = _id;
    },
    async updateMuonSach(updatedForm) {
      try {
        await muonSachService.update(updatedForm._id, updatedForm);
        this.muonsachs = await muonSachService.findAll();
        this.editingId = null;
      } catch (error) {
        console.error("Lỗi khi cập nhật mượn sách:", error);
      }
    },
  },
  async mounted() {
    try {
      this.muonsachs = await muonSachService.findByMadocgia(this.getAuth._id);
    } catch (error) {
      console.error("Lỗi khi tải danh sách mượn sách:", error);
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
