<template>
  <div style="width: 100%; display: block">
    <v-form @submit.prevent="handleSubmit">
      <div class="form-horizontal">
        <!-- Ngày Mượn -->
        <v-text-field
          type="date"
          v-model="form.ngaymuon"
          label="Ngày Mượn"
          required
        ></v-text-field>

        <!-- Ngày Trả -->
        <v-text-field
          type="date"
          v-model="form.ngaytra"
          label="Ngày Trả"
          required
        ></v-text-field>

        <!-- Các nút hành động -->
        <MyButton type="submit" color="primary">Gửi</MyButton>
        <MyButton @click="cancel">Hủy</MyButton>
      </div>
    </v-form>
  </div>
</template>

<script>
import MyButton from "./MyButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "MuonTraForm",
  props: {
    form: {
      type: Object,
      required: true,
      default: () => ({
        ngaymuon: "",
        ngaytra: "",
      }),
    },
  },
  components: {
    MyButton,
  },
  methods: {
    handleSubmit() {
      // Gửi dữ liệu form thông qua sự kiện submit
      this.$emit("submit", this.form);
    },
    cancel() {
      // Phát sự kiện hủy
      this.$emit("cancel");
    },
  },
  computed: {
    ...mapGetters(["getAuth"]),
  },
};
</script>

<style scoped>
/* Tùy chỉnh CSS */
.form-horizontal {
  display: flex;
  flex-direction: row;
  gap: 10px; /* Khoảng cách giữa các trường */
  align-items: center;
  width: 100%;
}
</style>
