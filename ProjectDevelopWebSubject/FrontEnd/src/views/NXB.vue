<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="headline background-gradient">Danh Sách Các Nhà Xuất Bản</v-card-title>
      <v-card-text>
        <v-btn small color="primary" @click="isAdding = !isAdding" v-if="!isAdding">Thêm hoặc cập nhật</v-btn>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Mã NXB</th>
              <th class="text-left">Tên NXB</th>
              <th class="text-left">Địa Chỉ</th>
              <th class="text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isAdding">
              <td colspan="4">
                <NXBForm :form="form" @cancel="isAdding=false" @submit="create"></NXBForm>
              </td>
            </tr>
            <template v-for="nxb in nxbs" :key="nxb._id">
              <tr>
                <td class="text-left">{{ nxb._id }}</td>
                <td class="text-left">{{ nxb.tennxb }}</td>
                <td class="text-left">{{ nxb.diachi }}</td>
                <td class="text-left">
                  <v-btn small color="primary" @click="deleteNxb(nxb._id)">Xóa</v-btn>
                  <v-btn small color="primary" @click="editNxb(nxb._id)">Chỉnh sửa</v-btn>
                </td>
              </tr>
              <tr v-if="editingId === nxb._id">
                <td colspan="4">
                  <NXBForm :form="nxb" :isUpdate="true" @cancel="editingId=null" @submit="updateNxb"></NXBForm>
                </td>
              </tr>
            </template>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import nxbService from '../services/nxb.service';
import MyButton from '../components/MyButton.vue';
import NXBForm from '../components/NXBForm.vue';

export default {
  data() {
    return {
      isAdding: false,
      editingId: null,
      nxbs: [],
      form: {
        _id: "", // Thay đổi manxb thành _id
        tennxb: "",
        diachi: ""
      },
    };
  },
  components: {
    MyButton,
    NXBForm,
  },
  methods: {
    async create() {
      try {
        await nxbService.create(this.form);
        this.nxbs = await nxbService.findAll();
        this.isAdding = false;
      } catch (error) {
        console.error('Lỗi khi thêm nhà xuất bản:', error);
      }
    },
    async deleteNxb(_id) {
      try {
        await nxbService.delete(_id);
        this.nxbs = await nxbService.findAll();
      } catch (error) {
        console.error('Lỗi khi xóa nhà xuất bản:', error);
      }
    },
    editNxb(_id) {
      this.editingId = _id;
    },
    async updateNxb(updatedForm) {
      try {
        await nxbService.update(updatedForm._id, updatedForm);
        this.nxbs = await nxbService.findAll();
        this.editingId = null;
      } catch (error) {
        console.error('Lỗi khi cập nhật nhà xuất bản:', error);
      }
    }
  },
  async mounted() {
    try {
      this.nxbs = await nxbService.findAll();
    } catch (error) {
      console.error('Lỗi khi tải danh sách nhà xuất bản:', error);
    }
  }
};
</script>

<style scoped>
.form-horizontal {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
}
.small-width { max-width: 100px; /* Điều chỉnh chiều rộng */ }
.background-gradient {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
}
</style>
