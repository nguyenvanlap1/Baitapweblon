<template>
  <div style="width: 100%; display: block;">
    <v-form @submit.prevent="handleSubmit">
      <div class="form-grid">
        <v-text-field 
          :disabled="isUpdate" 
          v-model="form._id" 
          label="Mã Sách" 
          required>
        </v-text-field>
        <v-text-field v-model="form.tensach" label="Tên Sách" required></v-text-field>
        <v-text-field v-model="form.dongia" label="Đơn Giá" type="number" required></v-text-field>
        <v-text-field v-model="form.soquyen" label="Số Quyển" type="number" required></v-text-field>
        <v-text-field v-model="form.namxuatban" label="Năm Xuất Bản" type="number" required></v-text-field>
        
        <!-- Sử dụng v-autocomplete cho manxb -->
        <v-autocomplete
          v-model="form.manhaxuatban"
          :items="publishers"
          item-value="id"
          item-text="name"
          label="Mã Nhà Xuất Bản"
          required
          clearable
          outlined
          dense
        ></v-autocomplete>

        <v-text-field v-model="form.nguongoc_tacgia" label="Nguồn Gốc/Tác Giả" required></v-text-field>
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
import nxbService from '../services/nxb.service';
export default {
  name: "SachForm",
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
        tensach: "",
        dongia: "",
        soquyen: "",
        namxuatban: "",
        manhaxuatban: "",
        nguongoc_tacgia: ""
      })
    }
  },
  components: {
    MyButton,
  },
  data() {
    return {
      publishers: []
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.form); // Emit the submit event with form data
    },
    cancel() {
      this.$emit('cancel'); // Emit the cancel event
    }
  },
  async mounted () {
    this.publishers = (await nxbService.findAll()).map(item => item._id);
  }
};
</script>


<style scoped>
/* Add any additional styles if needed */
.small-width { 
  max-width: 100px; /* Adjust field width */ 
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Hai cột, mỗi cột chiếm 50% */
  gap: 10px; /* Khoảng cách giữa các trường */
  width: 100%;
}

.button-container {
  display: flex; 
  justify-content: flex-start; 
  gap: 10px; /* Khoảng cách giữa các nút */
  margin-top: 20px; /* Khoảng cách giữa form và nút */
}
</style>
