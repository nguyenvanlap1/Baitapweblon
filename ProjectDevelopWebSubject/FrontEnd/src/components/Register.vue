<template>
  <v-container>
    <v-form
      @submit.prevent="handleSubmit"
      class="max-w-xl mx-auto bg-white rounded-xl p-3"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <v-text-field
          v-model="_id"
          label="Mã độc giả"
          variant="outlined"
          required
        ></v-text-field>
        <v-text-field
          v-model="holot"
          label="Họ lót"
          variant="outlined"
          required
        ></v-text-field>
        <v-text-field
          v-model="ten"
          label="Tên"
          variant="outlined"
          required
        ></v-text-field>
        <v-text-field
          v-model="ngaysinh"
          label="Ngày sinh"
          variant="outlined"
          type="date"
          required
        ></v-text-field>
        <v-select
          v-model="phai"
          :items="['Nam', 'Nữ']"
          label="Phái"
          variant="outlined"
          required
        ></v-select>
        <v-text-field
          v-model="diachi"
          label="Địa chỉ"
          variant="outlined"
          required
        ></v-text-field>
        <v-text-field
          v-model="dienthoai"
          label="Điện thoại"
          variant="outlined"
          required
        ></v-text-field>
        <v-text-field
          label="Mật khẩu"
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          placeholder="Nhập mật khẩu"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          required
        ></v-text-field>
      </div>

      <div class="mt-6 flex gap-4 justify-center">
        <MyButton type="submit" color="blue">Đăng ký</MyButton>
      </div>

      <!-- Snackbar -->
      <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        timeout="3000"
        location="top center"
        rounded
      >
        {{ snackbarMessage }}
      </v-snackbar>
    </v-form>
  </v-container>
</template>

<script>
import MyButton from "../components/MyButton.vue";
import docgiaService from "../services/docgia.service";

export default {
  components: {
    MyButton,
  },
  data() {
    return {
      _id: "",
      holot: "",
      ten: "",
      ngaysinh: "",
      phai: "",
      diachi: "",
      dienthoai: "",
      password: "",
      visible: false,

      // Snackbar state
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },
  methods: {
    async handleSubmit() {
      const docgia = {
        _id: this._id,
        holot: this.holot,
        ten: this.ten,
        ngaysinh: this.ngaysinh,
        phai: this.phai,
        diachi: this.diachi,
        dienthoai: this.dienthoai,
        password: this.password,
      };

      try {
        const response = await docgiaService.create(docgia);
        this.snackbarMessage = "Đăng ký thành công!";
        this.snackbarColor = "success";
        this.snackbar = true;

        this.$emit("submit", { success: true });
      } catch (error) {
        this.$emit("submit", {
          success: false,
          message: "Đăng ký thất bại. Vui lòng thử lại.",
        });
      }
    },
  },
};
</script>

<style scoped>
/* CSS tùy chỉnh nếu cần */
</style>
