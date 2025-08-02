<template>
  <v-app-bar :elevation="2" class="background-gradient" app>
    <v-app-bar-nav-icon @click="handlClick"></v-app-bar-nav-icon>
    <div class="text-lg font-semibold text-white">
      <router-link to="/" class="hover:underline"
        >Quản Lý mượn sách</router-link
      >
    </div>
    <v-spacer></v-spacer>
    <button
      class="text-white font-bold w-fit border mr-2 py-2 px-3 rounded-xl bg-blue-500 hover:scale-105 hover:bg-blue-700 transition"
      text
      v-if="!auth._id"
      @click="registerForm = true"
    >
      Đăng Ký
    </button>

    <button
      class="text-white font-bold w-fit border mr-2 py-2 px-3 rounded-xl bg-blue-500 hover:scale-105 hover:bg-blue-700 transition"
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
      class="text-white font-bold w-fit border mr-2 py-2 px-3 rounded-xl bg-blue-500 hover:scale-105 hover:bg-blue-700 transition"
      v-if="auth._id"
      @click="logout"
    >
      Đăng Xuất
    </button>
  </v-app-bar>

  <v-dialog v-model="dialog" max-width="500px">
    <div class="rounded-xl overflow-hidden bg-white shadow-lg p-0">
      <Login @login-success="handleLoginSuccess" />
    </div>
  </v-dialog>

  <v-dialog v-model="registerForm" max-width="500px">
    <div class="rounded-xl overflow-hidden bg-white shadow-lg p-0">
      <Register @register-submit="handleRegisterSuccess" />
    </div>
  </v-dialog>

  <!-- Dialog xác nhận đăng xuất -->
  <v-dialog v-model="confirmLogoutDialog" max-width="400px">
    <div class="bg-white p-2 rounded-xl shadow-lg">
      <div class="text-center text-xl font-bold mb-2">Xác nhận</div>
      <div class="text-center text-gray-700 mb-4">
        Bạn có chắc chắn muốn đăng xuất không?
      </div>
      <div class="flex justify-end space-x-2">
        <button
          class="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          @click="confirmLogoutDialog = false"
        >
          Hủy
        </button>
        <button
          class="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-xl transition"
          @click="confirmLogout"
        >
          Đăng xuất
        </button>
      </div>
    </div>
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
  emits: ["turnDrawer", "refreshApp"],
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
    handleRegisterSuccess(resultRegister) {
      if (resultRegister.success) {
        this.registerForm = false;
        this.snackbarMessage = "Đăng ký thành công!";
        this.snackbarColor = "success";
        this.dialog = true;
      } else {
        this.snackbarMessage = resultRegister.message || "Đăng ký thất bại!";
        this.snackbarColor = "error";
      }
      this.snackbar = true;
    },
    handleLoginSuccess(resultLogin) {
      if (resultLogin.success === true) {
        this.$store.commit("setAuth", resultLogin.user);
        this.dialog = false;
        this.snackbarMessage = "Đăng nhập thành công!";
        this.snackbarColor = "success";
      } else {
        this.snackbarMessage = "Đăng nhập thất bại!";
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
