<template>
  <div style="width: 100%; display: block">
    <v-form @submit.prevent="handleSubmit">
      <div class="form-horizontal">
        <!-- Mã Độc Giả -->
        <v-autocomplete
          v-model="form.madocgia"
          :items="madocgias"
          item-value="id"
          item-text="name"
          label="Mã độc giả"
          required
          clearable
          outlined
          dense
        ></v-autocomplete>

        <!-- Mã Sách -->
        <v-autocomplete
          v-model="form.masach"
          :items="masachs"
          item-value="_id"
          item-text="title"
          label="Mã sách"
          required
          clearable
          outlined
          dense
        ></v-autocomplete>

        <!-- Ngày Mượn -->
        <v-text-field
          v-model="form.ngaymuon"
          label="Ngày Mượn"
          type="date"
          required
          class="default"
        ></v-text-field>

        <!-- Ngày Trả -->
        <v-text-field
          v-model="form.ngaytra"
          label="Ngày Trả"
          type="date"
          required
          class="default"
        ></v-text-field>

        <!-- Mã Nhân Viên -->
        <v-text-field
          :disabled="true"
          v-model="manhanvien"
          label="Mã Nhân Viên"
          required
          class="default"
        ></v-text-field>

        <div class="button-container">
          <MyButton type="submit" color="primary">Gửi</MyButton>
          <MyButton @click="cancel">Hủy</MyButton>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import MyButton from "./MyButton.vue";
import docgiaService from "../services/docgia.service";
import sachService from "../services/sach.service";
import { mapGetters } from "vuex";

export default {
  name: "MuonSachForm",
  props: {
    isUpdate: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      required: true,
      default: () => ({
        madocgia: "",
        masach: "",
        ngaymuon: "",
        ngaytra: "",
        manhanvien: "",
      }),
    },
  },
  data() {
    return {
      madocgias: [],
      masachs: [],
      manhanvien: "",
    };
  },
  components: {
    MyButton,
  },
  methods: {
    handleSubmit() {
      this.form.manhanvien = this.manhanvien;
      this.$emit("submit", this.form); // Emit the submit event with form data
    },
    cancel() {
      this.$emit("cancel"); // Emit the cancel event
    },
  },
  async mounted() {
    // Fetch data for madocgia and masach
    this.madocgias = (await docgiaService.findAll()).map((item) => item._id);
    this.masachs = (await sachService.findAll()).map((item) => item._id);

    // Set manhanvien based on isUpdate and auth
    if (this.isUpdate) {
      this.manhanvien = this.form.manhanvien;
    } else {
      this.manhanvien = this.$store.getters.getAuth._id; // Use the getter for auth._id
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
  gap: 10px;
  width: 100%;
}

.default {
  margin: 0;
  padding: 0;
}

.button-container {
  display: flex;
  flex-direction: column; /* Chuyển các nút xuống dòng */
  justify-content: flex-start;
  gap: 1px;
  margin-top: 0px; /* Tạo khoảng cách trên với các trường nhập liệu */
}
</style>
