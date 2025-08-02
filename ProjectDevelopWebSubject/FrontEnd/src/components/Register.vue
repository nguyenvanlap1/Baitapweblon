<template>
  <v-container>
    <h1 class="text-center text-2xl font-bold mb-4">Đăng ký tài khoản</h1>
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
          :rules="[rules.required, rules.dobValid]"
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

      <div class="mt-2 flex gap-4 justify-center">
        <button
          type="submit"
          class="border min-w-[150px] rounded-xl px-3 py-2 bg-blue-500 text-white hover:scale-105 hover:bg-blue-700 transition"
        >
          Đăng ký
        </button>
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
      phai: "Nam", // ✅ Mặc định là 'Nam'
      diachi: "",
      dienthoai: "",
      password: "",
      visible: false,
      rules: {
        required: (v) => !!v || "Trường này bắt buộc.",
        phone: (v) =>
          /^0\d{9}$/.test(v) ||
          "Số điện thoại phải bắt đầu bằng 0 và đủ 10 chữ số.",
        password: (v) =>
          (v && v.length >= 6) || "Mật khẩu phải ít nhất 6 ký tự.",
        dobValid: (v) => {
          if (!v) return "Ngày sinh là bắt buộc.";
          const today = new Date().toISOString().split("T")[0];
          return v <= today || "Ngày sinh không được lớn hơn hôm nay.";
        },
      },
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.validateForm()) return;

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
        this.$emit("register-submit", { success: true });
        this.resetForm();
      } catch (error) {
        this.snackbarMessage =
          error.message || "Đăng ký thất bại. Vui lòng thử lại.";
        this.snackbarColor = "error";
        this.snackbar = true;
        this.$emit("register-submit", { success: false });
      }
    },
    validateForm() {
      const fields = [
        { value: this._id, name: "Mã độc giả" },
        { value: this.holot, name: "Họ lót" },
        { value: this.ten, name: "Tên" },
        { value: this.ngaysinh, name: "Ngày sinh" },
        { value: this.phai, name: "Phái" },
        { value: this.diachi, name: "Địa chỉ" },
        { value: this.dienthoai, name: "Điện thoại" },
        { value: this.password, name: "Mật khẩu" },
      ];

      for (const field of fields) {
        if (!field.value) {
          this.snackbarMessage = `${field.name} không được để trống.`;
          this.snackbarColor = "error";
          this.snackbar = true;
          return false;
        }
      }

      // Kiểm tra ngày sinh
      const today = new Date().toISOString().split("T")[0];
      if (this.ngaysinh > today) {
        this.snackbarMessage = "Ngày sinh không được lớn hơn hôm nay.";
        this.snackbarColor = "error";
        this.snackbar = true;
        return false;
      }

      // Kiểm tra số điện thoại
      if (!/^0\d{9}$/.test(this.dienthoai)) {
        this.snackbarMessage =
          "Số điện thoại phải bắt đầu bằng 0 và đủ 10 chữ số.";
        this.snackbarColor = "error";
        this.snackbar = true;
        return false;
      }

      // Kiểm tra mật khẩu
      if (this.password.length < 6) {
        this.snackbarMessage = "Mật khẩu phải ít nhất 6 ký tự.";
        this.snackbarColor = "error";
        this.snackbar = true;
        return false;
      }

      return true;
    },
    resetForm() {
      this._id = "";
      this.holot = "";
      this.ten = "";
      this.ngaysinh = "";
      this.phai = "Nam";
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
