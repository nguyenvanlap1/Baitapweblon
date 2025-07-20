<template>
  <div style="width: 100%; display: block">
    <v-card class="pa-4 elevation-2">
      <v-form @submit.prevent="handleSubmit">
        <v-row dense>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="isUpdate"
              v-model="form._id"
              label="Mã Sách"
              outlined
              dense
              required
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.tensach"
              label="Tên Sách"
              outlined
              dense
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.dongia"
              label="Đơn Giá"
              type="number"
              outlined
              dense
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.soquyen"
              label="Số Quyển"
              type="number"
              outlined
              dense
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.namxuatban"
              label="Năm Xuất Bản"
              type="number"
              outlined
              dense
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.manhaxuatban"
              :items="publishers"
              item-text="name"
              item-value="_id"
              label="Mã Nhà Xuất Bản"
              outlined
              dense
              clearable
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.nguongoc_tacgia"
              label="Nguồn Gốc/Tác Giả"
              outlined
              dense
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-file-input
              label="Hình ảnh (jpg/png)"
              accept="image/*"
              prepend-icon="mdi-camera"
              outlined
              dense
              clearable
              @change="onFileChange"
            />
            <v-img
              v-if="previewImage"
              :src="previewImage"
              max-height="150"
              max-width="150"
              class="mt-2 rounded mx-auto"
              contain
            />
          </v-col>

          <v-col cols="12" class="text-right">
            <MyButton type="submit" color="primary">
              <v-icon left>mdi-content-save</v-icon> Gửi
            </MyButton>
            <MyButton @click="cancel" color="error">
              <v-icon left>mdi-cancel</v-icon> Hủy
            </MyButton>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import MyButton from "./MyButton.vue";
import nxbService from "../services/nxb.service";
export default {
  name: "SachForm",
  props: {
    isUpdate: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      required: true,
    },
  },
  components: {
    MyButton,
  },
  data() {
    return {
      publishers: [],
      previewImage: "",
    };
  },
  methods: {
    onFileChange(event) {
      const file = event?.target?.files?.[0];

      if (!file) {
        this.previewImage = "";
        this.form.image = null;
        return;
      }

      if (!(file instanceof File)) {
        console.warn("Không phải File hợp lệ!");
        return;
      }

      this.previewImage = URL.createObjectURL(file);
      this.form.image = file;
    },

    handleSubmit() {
      console.log("Dữ liệu gửi đi:", this.form.image);
      console.log("Kiểu:", typeof this.form.image);

      this.$emit("submit", this.form); // Emit the submit event with form data
    },
    cancel() {
      this.$emit("cancel"); // Emit the cancel event
    },
  },
  async mounted() {
    this.publishers = (await nxbService.findAll()).map((item) => item._id);
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
.small-width {
  max-width: 100px; /* Adjust field width */
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Hai cột, mỗi cột chiếm 50% */
  gap: 10px; /* Khoảng cách giữa các trường */
  width: 100%;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.button-container {
  display: flex;
  justify-content: flex-start;
  gap: 10px; /* Khoảng cách giữa các nút */
  margin-top: 20px; /* Khoảng cách giữa form và nút */
}
</style>
