<template>
  <div style="width: 100%; display: block;">
    <v-form @submit.prevent="handleSubmit">
      <div class="form-grid">
        <v-text-field 
          :disabled="isUpdate" 
          v-model="form._id" 
          label="Mã Nhân Viên" 
          required>
        </v-text-field>
        <v-text-field v-model="form.hotennv" label="Họ Tên Nhân Viên" required></v-text-field>
        <v-text-field v-model="form.chucvu" label="Chức Vụ" required></v-text-field>
        <v-text-field v-model="form.diachi" label="Địa Chỉ" required></v-text-field>
        <v-text-field v-model="form.sodienthoai" label="Số Điện Thoại" required></v-text-field>
        <v-text-field v-if="!isUpdate" v-model="form.password" label="Mật Khẩu" :type="'password'" required></v-text-field>
      </div>
      <div class="button-container">
        <MyButton type="submit" color="primary">Gửi</MyButton>
        <MyButton @click="cancel">Hủy</MyButton>
      </div>
    </v-form>
  </div>
</template>


<script>
import MyButton from './MyButton.vue';

export default {
  name: "NhanVienForm",
  props: {
    isUpdate: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      required: true,
      default: () => ({
        _id: "",
        hotennv: "",
        chucvu: "",
        diachi: "",
        sodienthoai: "",
        password: ""
      })
    }
  },
  components: {
    MyButton,
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.form); // Phát sự kiện submit với dữ liệu form
    },
    cancel() {
      this.$emit('cancel'); // Phát sự kiện cancel
    }
  }
};
</script>

<style scoped>
.form-horizontal {
  display: flex;
  flex-direction: column;
  gap: 5px; /* Giảm khoảng cách giữa các trường */
  width: 100%;
  margin: 0;
  padding: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Hai cột, mỗi cột chiếm 50% */
  gap: 10px; /* Khoảng cách giữa các trường */
  width: 100%;
  margin: 0;
  padding: 0;
}

.button-container {
  display: flex; 
  justify-content: flex-start; 
  gap: 5px; /* Khoảng cách giữa các nút */
  margin-top: 20px; /* Khoảng cách giữa form và nút */
}
</style>

