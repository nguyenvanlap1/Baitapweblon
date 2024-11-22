<template>
  <div style="width: 100%; display: block;">
    <v-form @submit.prevent="handleSubmit">
      <div class="form-horizontal" width="100%"> 
        <v-text-field :disabled="isUpdate" v-model="form._id" label="Mã NXB" required class="small-width"></v-text-field> 
        <v-text-field v-model="form.tennxb" label="Tên NXB" required ></v-text-field> 
        <v-text-field v-model="form.diachi" label="Địa Chỉ" required ></v-text-field> 
        <MyButton type="submit" color="primary">Gửi</MyButton> 
        <MyButton @click="cancel">Hủy</MyButton> 
      </div>
    </v-form>
  </div>
</template>

<script>
import MyButton from './MyButton.vue';

export default {
  name: "NXBForm",
  props: {
    isUpdate: {
        default: () => (false),
    },
    form: {
      type: Object,
      required: true,
      default: () => ({
        _id: "", 
        tennxb: "", 
        diachi: ""
      }),
    }
  },
  components: {
    MyButton,
  },
  methods: {
    handleSubmit() {
      this.form.manxb=this.form._id;
      this.$emit('submit', this.form); // Phát sự kiện submit cùng với dữ liệu form
    },
    cancel(){
        this.$emit('cancel');
    }
  },
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
