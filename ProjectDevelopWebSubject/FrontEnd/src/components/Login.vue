<template>
  <v-container>
    <h1 class="text-center text-2xl font-bold mb-4">Đăng nhập</h1>
    <v-form
      @submit.prevent="handleSubmit"
      class="max-w-md mx-auto bg-white rounded-xl"
    >
      <div class="flex flex-col gap-2">
        <v-text-field
          v-model="_id"
          label="Nhập Id"
          variant="outlined"
          required
        ></v-text-field>

        <v-text-field
          label="Nhập mật khẩu"
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
          required
        ></v-text-field>
      </div>

      <div class="mt-2 flex justify-center">
        <button
          type="submit"
          class="border min-w-[150px] rounded-xl px-3 py-2 bg-blue-500 text-white hover:scale-105 hover:bg-blue-700 transition"
        >
          Đăng nhập
        </button>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import MyButton from "../components/MyButton.vue";
import authService from "../services/auth.service";

export default {
  components: {
    MyButton,
  },
  data() {
    return {
      _id: "",
      password: "",
      visible: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await authService.login({
          _id: this._id,
          password: this.password,
        });

        this.$emit("login-success", { success: true, user: response });
      } catch (error) {
        this.$emit("login-success", {
          success: false,
          message: "Tài khoản hoặc mật khẩu không đúng.",
        });
      }
    },
  },
};
</script>

<style scoped></style>
