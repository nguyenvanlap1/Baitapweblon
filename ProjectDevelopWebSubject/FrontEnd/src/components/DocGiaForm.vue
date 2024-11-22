<template>
  <div style="width: 100%; display: block;">
    <v-form @submit.prevent="handleSubmit">
      <div class="form-horizontal" width="100%">
        <v-text-field 
          :disabled="isUpdate" 
          v-model="form._id" 
          label="Mã Độc Giả" 
          required 
          class="small-width">
        </v-text-field>
        <v-text-field v-model="form.holot" label="Họ Lót" required></v-text-field>
        <v-text-field v-model="form.ten" label="Tên" required></v-text-field>
        <v-text-field type="date" v-model="form.ngaysinh" label="Ngày Sinh" required></v-text-field>
        <v-select 
          v-model="form.phai" 
          :items="['Nam', 'Nữ']" 
          label="Phái" 
          required>
        </v-select>
        <v-text-field v-model="form.diachi" label="Địa Chỉ" required></v-text-field>
        <v-text-field v-model="form.dienthoai" label="Điện Thoại" required></v-text-field>
        <v-text-field v-if="!isUpdate"
          v-model="form.password" 
          label="Mật khẩu" 
          type="password" 
          required>
        </v-text-field>
        <MyButton type="submit" color="primary">Gửi</MyButton>
        <MyButton @click="cancel">Hủy</MyButton>
      </div>
    </v-form>
  </div>
</template>


<script>
import MyButton from './MyButton.vue';
export default {
  name: "DocGiaForm",
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
        madocgia: "",
        holot: "",
        ten: "",
        ngaysinh: "",
        phai: "",
        diachi: "",
        dienthoai: "",
        password: "" // Thêm trường password
      })
    }
  },
  components: {
    MyButton,
  },
  methods: {
    handleSubmit() {
      this.form.madocgia = this.form._id;
      this.$emit('submit', this.form); // Phát sự kiện submit cùng với dữ liệu form
    },
    cancel() {
      this.$emit('cancel'); // Phát sự kiện cancel
    }
  }
};
</script>


<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
  .form-horizontal {
  display: flex; 
  flex-direction: row; 
  gap: 5px; /* Khoảng cách giữa các trường */ 
  align-items: center; /* Căn giữa theo chiều dọc */ 
  width: 100%;
} 
  .small-width { max-width: 100px; /* Điều chỉnh chiều rộng */ }
</style>