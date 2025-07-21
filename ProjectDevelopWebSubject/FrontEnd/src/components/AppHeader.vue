<template>
  <v-app-bar :elevation="2" class="background-gradient" app>
    <v-app-bar-nav-icon @click="handlClick"></v-app-bar-nav-icon>
    <v-app-bar-title><v-btn to="/">Quản Lý mượn sách</v-btn></v-app-bar-title>
    <v-spacer></v-spacer>
    <button
      class="text-white font-bold w-fit border mr-2 p-2 rounded-lg bg-blue-500 hover:scale-105 hover:bg-blue-700 transition"
      text
      v-if="!auth._id"
      @click="registerForm = true"
    >
      Đăng Ký
    </button>

    <button
      class="text-white font-bold w-fit border mr-2 p-2 rounded-lg bg-blue-500 hover:scale-105 hover:bg-blue-700 transition"
      text
      v-if="!auth._id"
      @click="dialog = true"
    >
      Đăng Nhập
    </button>

    <span
      v-if="auth._id"
      class="mr-4 text-white font-weight-bold text-subtitle-1"
    >
      Xin chào, {{ auth.ten || auth.hotennv }}
    </span>
    <!-- Thêm đăng ký -->
    <button
      class="text-white font-bold w-fit border mr-2 p-2 rounded-lg bg-blue-500 hover:scale-105 hover:bg-blue-700 transition"
      v-if="auth._id"
      @click="logout"
    >
      Đăng Xuất
    </button>
  </v-app-bar>

  <v-dialog v-model="dialog" max-width="500px">
    <v-card class="p-0 rounded-xl overflow-hidden">
      <v-card-title class="text-center pt-4 pb-0">Đăng nhập</v-card-title>
      <v-card-text class="px-4 pt-2 pb-6">
        <Login @submit="handleLoginSuccess" />
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="registerForm" max-width="500px">
    <v-card class="p-0 rounded-xl overflow-hidden">
      <v-card-title class="text-center pt-4 pb-0"
        >Đăng ký tài khoản</v-card-title
      >
      <v-card-text class="px-4 pt-2 pb-6">
        <Register @submit="handleRegisterSuccess" />
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- Dialog xác nhận đăng xuất -->
  <v-dialog v-model="confirmLogoutDialog" max-width="400px">
    <v-card class="p-3 rounded-xl">
      <v-card-title class="text-h6">Xác nhận đăng xuất</v-card-title>
      <v-card-text>Bạn có chắc chắn muốn đăng xuất không?</v-card-text>
      <v-card-actions class="justify-end">
        <v-btn text @click="confirmLogoutDialog = false">Hủy</v-btn>
        <v-btn
          color="red"
          variant="flat"
          class="rounded-xl text-white font-semibold p-2"
          @click="confirmLogout"
        >
          Đăng xuất
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    timeout="3000"
    location="top center"
    class="text-white font-semibold"
  >
    {{ snackbarMessage }}
  </v-snackbar>
</template>

<script>
import authService from "../services/auth.service";
import { mapGetters } from "vuex";
import Login from "./Login.vue";
import Register from "./Register.vue";

export default {
  name: "AppBar",
  components: {
    Login,
    Register,
  },
  data() {
    return {
      dialog: false,
      registerForm: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
      confirmLogoutDialog: false,
    };
  },
  computed: {
    ...mapGetters(["getAuth"]),
    auth() {
      return this.getAuth;
    },
  },
  methods: {
    handlClick() {
      this.$emit("turnDrawer");
    },
    logout() {
      // Khi nhấn nút đăng xuất, chỉ hiện dialog
      this.confirmLogoutDialog = true;
    },
    async confirmLogout() {
      try {
        await authService.logout();
        this.$store.commit("setAuth", {});
        this.snackbarMessage = "Đã đăng xuất thành công!";
        this.snackbarColor = "success";
        this.snackbar = true;
      } catch (error) {
        console.error("Logout failed:", error);
        this.snackbarMessage = "Có lỗi xảy ra khi đăng xuất.";
        this.snackbarColor = "error";
        this.snackbar = true;
      } finally {
        this.confirmLogoutDialog = false;
      }
    },
    handleRegisterSuccess(result) {
      if (result?.success) {
        this.registerForm = false;
        this.snackbarMessage = "Đăng ký thành công!";
        this.snackbarColor = "success";
      } else {
        this.snackbarMessage = result?.message || "Đăng ký thất bại!";
        this.snackbarColor = "error";
      }
      this.snackbar = true;
    },
    handleLoginSuccess(result) {
      if (result?.success) {
        this.dialog = false;
        this.snackbarMessage = "Đăng nhập thành công!";
        this.snackbarColor = "success";
      } else {
        this.snackbarMessage = result?.message || "Đăng nhập thất bại!";
        this.snackbarColor = "error";
      }
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.background-gradient {
  background: linear-gradient(135deg, #0a2496, #656ddc);
  color: white;
}
</style>
