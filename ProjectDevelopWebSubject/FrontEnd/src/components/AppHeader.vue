<template>
  <v-app-bar :elevation="2" class="background-gradient">
    <v-app-bar-nav-icon @click="handlClick"></v-app-bar-nav-icon>
    <v-app-bar-title><v-btn to="/">Quản Lý mượn sách</v-btn></v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/">Home</v-btn>
    <v-btn text v-if="!auth._id" @click="dialog = true">Đăng Nhập</v-btn>
    <v-btn text v-if="!auth._id" @click="registerForm = true">Đăng Ký</v-btn>
    <!-- Thêm đăng ký -->
    <v-btn text v-if="auth._id" @click="logout">Đăng Xuất</v-btn>
  </v-app-bar>

  <v-dialog v-model="dialog" width="50%">
    <v-card
      title="Đăng nhập"
      class="flex justify-center mx-auto p-2 rounded-xl w-full h-[700px] max-w-md"
    >
      <v-card-text>
        <Login @submit="dialog = false"></Login>
      </v-card-text>
    </v-card>
  </v-dialog>

  <v-dialog v-model="registerForm" width="50%">
    <v-card
      class="flex justify-center items-center mx-auto p-2 rounded-xl w-full h-[700px] max-w-md"
    >
      <v-card-title>Đăng ký tài khoản</v-card-title>
      <v-card-text class="p-1">
        <Register @submit="registerForm = false" />
      </v-card-text>
    </v-card>
  </v-dialog>
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
    };
  },
  computed: {
    ...mapGetters(["getAuth"]),
    auth() {
      return this.getAuth;
    },
  },
  methods: {
    async logout() {
      try {
        console.log(await authService.logout());
        this.$store.commit("setAuth", { a: null }); // Reset auth
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
    handlClick() {
      this.$emit("turnDrawer");
    },
  },
};
</script>

<style scoped>
.background-gradient {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
}
</style>
