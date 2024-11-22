<template>
  <v-container fluid>
    <v-card >
      <v-card-title class="headline background-gradient">Danh Sách Độc Giả</v-card-title>
      <v-card-text>
        <v-btn small color="primary" @click="isAdding = !isAdding" v-if="!isAdding">Thêm hoặc cập nhật</v-btn>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Mã Độc Giả</th>
              <th class="text-left">Họ Lót</th>
              <th class="text-left">Tên</th>
              <th class="text-left">Ngày Sinh</th>
              <th class="text-left">Phái</th>
              <th class="text-left">Địa Chỉ</th>
              <th class="text-left">Điện Thoại</th>
              <th class="text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isAdding">
              <td colspan="8">
                <DocGiaForm :form="form" @cancel="isAdding=false" @submit="create"></DocGiaForm>
              </td>
            </tr>
            <template v-for="docgia in docgias" :key="docgia._id">
              <tr>
                <td class="text-left">{{ docgia._id }}</td>
                <td class="text-left">{{ docgia.holot }}</td>
                <td class="text-left">{{ docgia.ten }}</td>
                <td class="text-left">{{ docgia.ngaysinh }}</td>
                <td class="text-left">{{ docgia.phai }}</td>
                <td class="text-left">{{ docgia.diachi }}</td>
                <td class="text-left">{{ docgia.dienthoai }}</td>
                <td class="text-left">
                  <v-btn small color="primary" @click="deleteDocGia(docgia._id)">Xóa</v-btn>
                  <v-btn small color="primary" @click="editDocGia(docgia._id)">Chỉnh sửa</v-btn>
                </td>
              </tr>
              <tr v-if="editingId === docgia._id">
                <td colspan="8">
                  <DocGiaForm :form="docgia" :isUpdate="true" @cancel="editingId=null" @submit="updateDocGia"></DocGiaForm>
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
import docGiaService from '../services/docgia.service';
import MyButton from '../components/MyButton.vue';
import DocGiaForm from '../components/DocGiaForm.vue';

export default {
  data() {
    return {
      isAdding: false,
      editingId: null,
      docgias: [],
      form: {
        _id: "",
        madocgia: "",
        holot: "",
        ten: "",
        ngaysinh: "",
        phai: "",
        diachi: "",
        dienthoai: ""
      }
    };
  },
  components: {
    MyButton,
    DocGiaForm,
  },
  methods: {
    async create() {
      try {
        await docGiaService.create(this.form);
        this.docgias = await docGiaService.findAll();
        this.isAdding = false;
      } catch (error) {
        console.error('Lỗi khi thêm độc giả:', error);
      }
    },
    async deleteDocGia(_id) {
      try {
        await docGiaService.delete(_id);
        this.docgias = await docGiaService.findAll();
      } catch (error) {
        console.error('Lỗi khi xóa độc giả:', error);
      }
    },
    editDocGia(_id) {
      this.editingId = _id;
    },
    async updateDocGia(updatedForm) {
      try {
        await docGiaService.update(updatedForm._id, updatedForm);
        this.docgias = await docGiaService.findAll();
        this.editingId = null;
      } catch (error) {
        console.error('Lỗi khi cập nhật độc giả:', error);
      }
    }
  },
  async mounted() {
    try {
      this.docgias = await docGiaService.findAll();
    } catch (error) {
      console.error('Lỗi khi tải danh sách độc giả:', error);
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
