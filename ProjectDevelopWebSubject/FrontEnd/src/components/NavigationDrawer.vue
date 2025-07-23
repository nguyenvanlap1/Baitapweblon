<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawner"
        class="custom-drawer"
        theme="light"
        app
        permanent
      >
        <v-list nav>
          <!-- Nếu chưa đăng nhập -->
          <v-list-item
            class="custom-list-item"
            v-if="!getAuth._id && !getAuth.chucvu"
            prepend-icon="mdi-information-outline"
            disabled
          >
            <v-list-item-content>
              <v-list-item-title class="wrap-message">
                Vui lòng đăng nhập để truy cập chức năng
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- Home -->
          <v-list-item
            class="custom-list-item"
            :to="'/'"
            prepend-icon="mdi-home"
            title="Trang chủ"
          ></v-list-item>

          <v-list-item
            v-if="getAuth._id && getAuth.chucvu"
            class="custom-list-item"
            :to="'/theodoimuonsach'"
            prepend-icon="mdi-book-check"
            title="Theo dõi mượn sách"
          ></v-list-item>

          <v-list-item
            class="custom-list-item"
            v-if="getAuth._id && getAuth.chucvu"
            :to="'/docgia'"
            prepend-icon="mdi-account-multiple"
            title="Độc giả"
          ></v-list-item>

          <v-list-item
            class="custom-list-item"
            v-if="getAuth._id"
            :to="'/sach'"
            prepend-icon="mdi-book"
            title="Sách"
          ></v-list-item>

          <v-list-item
            class="custom-list-item"
            to="/docgia/theo-doi"
            v-if="getAuth._id && !getAuth.chucvu"
            prepend-icon="mdi-history"
            title="Theo dõi sách đã mượn"
          >
          </v-list-item>

          <v-list-item
            class="custom-list-item"
            v-if="getAuth._id && getAuth.chucvu"
            :to="'/muonsach'"
            prepend-icon="mdi-book-check"
            title="Mượn sách"
          ></v-list-item>

          <!-- Các chức năng cho nhân viên -->
          <v-list-item
            class="custom-list-item"
            v-if="getAuth._id && getAuth.chucvu"
            :to="'/nxb'"
            prepend-icon="mdi-library"
            title="Nhà xuất bản"
          ></v-list-item>

          <v-list-item
            class="custom-list-item"
            v-if="getAuth._id && getAuth.chucvu"
            :to="'/nhanvien'"
            prepend-icon="mdi-account-supervisor"
            title="Nhân viên"
          ></v-list-item>

          <v-list-item
            class="custom-list-item"
            v-if="getAuth._id && !getAuth.chucvu"
            :to="'/thongtincanhan'"
            prepend-icon="mdi-account-circle"
            title="Thông tin cá nhân"
          ></v-list-item>

          <v-list-item
            class="custom-list-item"
            v-if="getAuth._id"
            :to="'/clockin'"
            prepend-icon="mdi-clock-start"
            title="Clock-in"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main min-height="100vh" width="100%">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavigationDrawer",
  props: {
    drawnerOut: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      drawner: this.drawnerOut,
    };
  },
  watch: {
    drawnerOut(newVal) {
      this.drawner = newVal;
    },
    drawner(newVal) {
      this.$emit("update:drawnerOut", newVal);
    },
  },
  computed: {
    ...mapGetters(["getAuth"]),
  },
};
</script>

<style scoped>
.wrap-message {
  white-space: normal !important;
  word-break: break-word;
  line-height: 1.4;
  font-size: 16px;
  color: #1f2937;
  font-weight: 500;
}

.custom-list-item ::v-deep(.v-icon) {
  font-size: 19px;
  color: #1f2937;
  margin-right: 1px; /* Giảm khoảng cách giữa icon và chữ */
}

.custom-list-item ::v-deep(.v-list-item-title) {
  font-size: 16px;
  color: #1f2937;
  font-weight: 500;
}

.custom-drawer {
  background-color: #e0e2e6 !important;
}
.v-navigation-drawer {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* ✅ Giảm khoảng cách giữa các mục */
.v-list-item {
  min-height: 40px !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}

/* ✅ Hover rõ nét hơn */
.v-list-item:hover {
  background-color: #cbd5e1 !important;
  font-weight: 600;
}
</style>
