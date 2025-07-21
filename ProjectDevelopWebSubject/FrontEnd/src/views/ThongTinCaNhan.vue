<template>
  <div
    v-if="getAuth._id && !getAuth.chucvu"
    class="w-[90%] mx-auto mt-2 grid grid-cols-1 md:grid-cols-3 gap-3"
  >
    <!-- Khoi thong tin ca nhan -->
    <div class="md:col-span-2 border p-3 rounded-lg shadow-md">
      <h2
        class="text-xl px-2 py-1 rounded-lg mb-4 text-white headline background-gradient"
      >
        Thông tin cá nhân
      </h2>
      <form @submit.prevent="updateProfile">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block font-semibold">Họ lót:</label>
            <input
              v-model="profile.holot"
              class="w-full border px-3 py-2 rounded"
              type="text"
            />
          </div>

          <div>
            <label class="block font-semibold">Tên:</label>
            <input
              v-model="profile.ten"
              class="w-full border px-3 py-2 rounded"
              type="text"
            />
          </div>

          <div class="col-span-2">
            <label class="block font-semibold">Giới tính:</label>
            <select
              v-model="profile.phai"
              class="w-full border px-3 py-2 rounded"
            >
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>

          <div class="col-span-2">
            <label class="block font-semibold">Ngày sinh:</label>
            <input
              v-model="profile.ngaysinh"
              class="w-full border px-3 py-2 rounded"
              type="date"
            />
          </div>

          <div class="col-span-2">
            <label class="block font-semibold">Địa chỉ:</label>
            <input
              v-model="profile.diachi"
              class="w-full border px-3 py-2 rounded"
              type="text"
            />
          </div>

          <div class="col-span-2">
            <label class="block font-semibold">Điện thoại:</label>
            <input
              v-model="profile.dienthoai"
              class="w-full border px-3 py-2 rounded"
              type="text"
            />
          </div>
        </div>

        <div class="mt-6 flex justify-center">
          <button
            type="submit"
            class="bg-[#1967C0] hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>

    <!-- Khoi mat khau -->
    <div class="border p-3 rounded-lg shadow-md">
      <form @submit.prevent="changePassword">
        <!-- Form đổi mật khẩu -->
        <h2
          class="text-xl px-2 py-1 rounded-lg mb-4 text-white headline background-gradient"
        >
          Đổi mật khẩu
        </h2>
        <div class="grid gap-4">
          <div>
            <label class="block font-semibold">Mật khẩu cũ:</label>
            <input
              v-model="passwords.oldPassword"
              class="w-full border px-3 py-2 rounded"
              type="password"
              placeholder="Nhập mật khẩu cũ"
            />
          </div>
          <div>
            <label class="block font-semibold">Mật khẩu mới:</label>
            <input
              v-model="passwords.newPassword"
              class="w-full border px-3 py-2 rounded"
              type="password"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div>
            <label class="block font-semibold">Nhập lại mật khẩu mới:</label>
            <input
              v-model="passwords.confirmPassword"
              class="w-full border px-3 py-2 rounded"
              type="password"
              placeholder="Xác nhận mật khẩu mới"
            />
          </div>
        </div>

        <div class="mt-4 flex justify-center">
          <button
            type="submit"
            class="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg"
          >
            Đổi mật khẩu
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import DocGia from "../services/docgia.service";
import { mapGetters } from "vuex";
import store from "../store/index";
export default {
  name: "UserProfile",
  data() {
    return {
      profile: {
        _id: "",
        holot: "",
        ten: "",
        phai: "Nam",
        ngaysinh: "",
        diachi: "",
        dienthoai: "",
      },
      passwords: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getAuth"]),
  },
  mounted() {
    if (this.getAuth) {
      this.profile = { ...this.getAuth };
    }
  },
  methods: {
    async updateProfile() {
      try {
        const res = await DocGia.update(this.profile._id, this.profile);
        if (res?.success || res) {
          await store.dispatch("updateAuth");
          alert("Cập nhật thành công!");
        } else {
          alert("Cập nhật thất bại.");
        }
      } catch (error) {
        console.error(error);
        alert("Đã xảy ra lỗi.");
      }
    },
    async changePassword() {
      if (
        !this.passwords.oldPassword ||
        !this.passwords.newPassword ||
        !this.passwords.confirmPassword
      ) {
        alert("Vui lòng nhập đầy đủ các trường mật khẩu.");
        return;
      }

      if (this.passwords.newPassword !== this.passwords.confirmPassword) {
        alert("Mật khẩu mới và xác nhận không khớp.");
        return;
      }

      try {
        const res = await DocGia.changePassword(
          this.profile._id,
          this.passwords.oldPassword,
          this.passwords.newPassword
        );

        alert(res.message || "Đổi mật khẩu thành công!");

        // Xóa mật khẩu sau khi đổi
        this.passwords.oldPassword = "";
        this.passwords.newPassword = "";
        this.passwords.confirmPassword = "";
      } catch (error) {
        alert("Lỗi: " + error.message);
      }
    },
  },
};
</script>

<style scoped>
input,
select {
  transition: border 0.2s;
}
input:focus,
select:focus {
  outline: none;
  border-color: #3b82f6;
}
.background-gradient {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
}
</style>
