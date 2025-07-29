<template>
  <v-container>
    <h1 class="text-center text-2xl mb-2">Đăng ký tài khoản</h1>
    <v-form
      @submit.prevent="handleSubmit"
      class="max-w-xl mx-auto bg-white rounded-xl"
    >
      <!-- Mã độc giả: riêng 1 hàng -->
      <v-text-field
        v-model="_id"
        label="Mã độc giả"
        variant="outlined"
        required
        :rules="[rules.required]"
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
        class="mb-4"
        :rules="[rules.required, rules.password]"
      ></v-text-field>

      <!-- Các trường còn lại: chia 2 cột -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <v-text-field
          v-model="holot"
          label="Họ lót"
          variant="outlined"
          :rules="[rules.required]"
          required
        ></v-text-field>
        <v-text-field
          v-model="ten"
          label="Tên"
          variant="outlined"
          :rules="[rules.required]"
          required
        ></v-text-field>
        <v-text-field
          v-model="ngaysinh"
          label="Ngày sinh"
          variant="outlined"
          :rules="[rules.required]"
          type="date"
          required
        ></v-text-field>
        <v-select
          v-model="phai"
          :items="['Nam', 'Nữ']"
          label="Phái"
          variant="outlined"
          :rules="[rules.required]"
          required
        ></v-select>
        <v-text-field
          v-model="diachi"
          label="Địa chỉ"
          variant="outlined"
          :rules="[rules.required]"
          required
        ></v-text-field>
        <v-text-field
          v-model="dienthoai"
          label="Điện thoại"
          variant="outlined"
          :rules="[rules.required, rules.phone]"
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
      rules: {
        required: (v) => !!v || "Trường này bắt buộc.",
        phone: (v) =>
          /^\d{10}$/.test(v) ||
          "Số điện thoại không hợp lệ (phải gồm đúng 10 chữ số).",
        password: (v) =>
          (v && v.length >= 6) || "Mật khẩu phải ít nhất 6 ký tự.",
      },
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
        this.$emit("register-submit", { success: true });
        this.resetForm();
      } catch (error) {
        this.$emit("register-submit", {
          success: false,
          message: error.message || "Đăng ký thất bại. Vui lòng thử lại.",
        });
      }
    },
    resetForm() {
      this._id = "";
      this.holot = "";
      this.ten = "";
      this.ngaysinh = "";
      this.phai = "";
      this.diachi = "";
      this.dienthoai = "";
      this.password = "";
      this.visible = false;
    },
  },
};
</script>

<style scoped>
/* CSS tùy chỉnh nếu cần */
</style>
