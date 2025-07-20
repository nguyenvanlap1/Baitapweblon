<template>
  <v-container>
    <v-card>
      <v-card-title class="headline">Sách bạn đã đăng ký mượn</v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th>Tên Sách</th>
              <th>Ngày Mượn</th>
              <th>Ngày Trả</th>
              <th>Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in muonSachList" :key="item._id">
              <td>{{ item.tensach }}</td>
              <td>{{ item.ngaymuon }}</td>
              <td>{{ item.ngaytra }}</td>
              <td>
                <span v-if="item.manhanvien"
                  >Đã duyệt bởi {{ item.manhanvien }}</span
                >
                <span v-else>Chưa duyệt</span>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import theodoimuonsachService from "../services/theodoimuonsach.service";
import sachService from "../services/sach.service";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      muonSachList: [],
    };
  },
  computed: {
    ...mapGetters(["getAuth"]),
  },
  async mounted() {
    if (!this.getAuth._id) return;

    try {
      const all = await theodoimuonsachService.findByMadocgia(this.getAuth._id);
      console.log(all);
      const sachs = await sachService.findAll();

      // Lọc theo người dùng hiện tại
      const filtered = all.filter((item) => item.madocgia === this.getAuth._id);

      // Gắn thêm tên sách
      this.muonSachList = filtered.map((item) => {
        const sach = sachs.find((s) => s._id === item.masach);
        return {
          ...item,
          tensach: sach ? sach.tensach : "(Không tìm thấy)",
        };
      });
    } catch (err) {
      console.error("Lỗi khi tải danh sách mượn sách:", err);
    }
  },
};
</script>
