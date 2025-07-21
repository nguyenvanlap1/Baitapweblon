<template>
  <v-container fluid>
    <v-card>
      <v-card-title class="headline background-gradient"
        >Danh Sách Nhân Viên</v-card-title
      >
      <v-card-text>
        <v-btn
          small
          class="my-4"
          color="primary"
          @click="isAdding = !isAdding"
          v-if="!isAdding"
          >Thêm hoặc cập nhật</v-btn
        >
        <v-table>
          <thead>
            <tr>
              <th class="text-left">Mã Nhân Viên</th>
              <th class="text-left">Họ Tên</th>
              <th class="text-left">Chức Vụ</th>
              <th class="text-left">Địa Chỉ</th>
              <th class="text-left">Số Điện Thoại</th>
              <th class="text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isAdding">
              <td colspan="6">
                <EmployeeForm
                  :form="form"
                  @cancel="isAdding = false"
                  @submit="create"
                ></EmployeeForm>
              </td>
            </tr>
            <template v-for="nv in nhanviens" :key="nv._id">
              <tr>
                <td class="text-left">{{ nv._id }}</td>
                <td class="text-left">{{ nv.hotennv }}</td>
                <td class="text-left">{{ nv.chucvu }}</td>
                <td class="text-left">{{ nv.diachi }}</td>
                <td class="text-left">{{ nv.sodienthoai }}</td>
                <td class="text-left">
                  <v-btn small color="error" @click="deleteEmployee(nv._id)"
                    >Xóa</v-btn
                  >
                  <v-btn small color="primary" @click="editEmployee(nv._id)"
                    >Chỉnh sửa</v-btn
                  >
                </td>
              </tr>
              <tr v-if="editingId === nv._id">
                <td colspan="6">
                  <EmployeeForm
                    :form="nv"
                    :isUpdate="true"
                    @cancel="editingId = null"
                    @submit="updateEmployee"
                  ></EmployeeForm>
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
import employeeService from "../services/nhanvien.service";
import MyButton from "../components/MyButton.vue";
import EmployeeForm from "../components/NhanVienForm.vue";

export default {
  data() {
    return {
      isAdding: false,
      editingId: null,
      nhanviens: [],
      form: {
        _id: "",
        hotennv: "",
        chucvu: "",
        diachi: "",
        sodienthoai: "",
        password: "",
      },
    };
  },
  components: {
    MyButton,
    EmployeeForm,
  },
  methods: {
    async create() {
      try {
        await employeeService.create(this.form);
        this.nhanviens = await employeeService.findAll();
        this.isAdding = false;
      } catch (error) {
        console.error("Lỗi khi thêm nhân viên:", error);
      }
    },
    async deleteEmployee(_id) {
      try {
        await employeeService.delete(_id);
        this.nhanviens = await employeeService.findAll();
      } catch (error) {
        console.error("Lỗi khi xóa nhân viên:", error);
      }
    },
    editEmployee(_id) {
      this.editingId = _id;
    },
    async updateEmployee(updatedForm) {
      try {
        await employeeService.update(updatedForm._id, updatedForm);
        this.nhanviens = await employeeService.findAll();
        this.editingId = null;
      } catch (error) {
        console.error("Lỗi khi cập nhật nhân viên:", error);
      }
    },
  },
  async mounted() {
    try {
      this.nhanviens = await employeeService.findAll();
    } catch (error) {
      console.error("Lỗi khi tải danh sách nhân viên:", error);
    }
  },
};
</script>

<style scoped>
.form-horizontal {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}
.small-width {
  max-width: 200px;
}
.background-gradient {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: white;
}
</style>
