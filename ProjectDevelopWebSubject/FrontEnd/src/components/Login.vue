<template>
  <v-container>
    <v-form
      @submit.prevent="handleSubmit"
      class="max-w-md mx-auto bg-white rounded-xl p-4"
    >
      <div class="flex flex-col gap-4">
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

      <div class="mt-6 flex justify-center">
        <MyButton type="submit" color="blue">Đăng nhập</MyButton>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import MyButton from "../components/MyButton.vue"; // Đảm bảo bạn đã import đúng
import authService from "../services/auth.service";

export default {
  components: {
    MyButton, // Đăng ký component MyButton ở đây
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
        // Thực hiện đăng nhập với thông tin _id và password
        const response = await authService.login({
          _id: this._id,
          password: this.password,
        });

        await this.$store.dispatch("fetchAuth");
        console.log(response); // Kiểm tra phản hồi từ server
        this.$emit("submit", { success: true });
      } catch (error) {
        this.$emit("submit", {
          success: false,
          message: "Tài khoản hoặc mật khẩu không đúng.",
        });
      }
    },
  },
};
</script>

<style scoped>
/* CSS tùy chỉnh nếu cần */
</style>
