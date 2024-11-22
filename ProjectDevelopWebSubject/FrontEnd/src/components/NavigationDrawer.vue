<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        v-model="drawner" 
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        theme="dark"
        permanent
      >
        <v-list nav>
          <v-list-item v-if="this.getAuth._id && this.getAuth.chucvu" :to="'/theodoimuonsach'" prepend-icon="mdi-book-check" title="Theo dõi mượn sách"></v-list-item>
          <v-list-item v-if="this.getAuth._id && this.getAuth.chucvu" :to="'/docgia'" prepend-icon="mdi-account-multiple" title="Độc giả"></v-list-item>
          <v-list-item v-if="this.getAuth._id" :to="'/sach'" prepend-icon="mdi-book" title="Sách"></v-list-item>
          <v-list-item v-if="this.getAuth._id && !this.getAuth.chucvu" :to="'/muonsach'" prepend-icon="mdi-book-check" title="mượn sách"></v-list-item>
          <v-list-item v-if="this.getAuth._id && this.getAuth.chucvu" :to="'/nxb'" prepend-icon="mdi-library" title="Nhà xuất bản"></v-list-item>
          <v-list-item v-if="this.getAuth._id && this.getAuth.chucvu" :to="'/nhanvien'" prepend-icon="mdi-account-supervisor" title="Nhân viên"></v-list-item>
          <v-list-item v-if="this.getAuth._id" :to="'/clockin'" prepend-icon="mdi-clock-start" title="Clock-in"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main min-height="100vh" width="100%">
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "NavigationDrawer",
  props: {
    drawnerOut: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      drawner: this.drawnerOut // Khởi tạo giá trị drawner từ prop drawnerOut
    }
  },
  watch: {
    // Theo dõi khi prop drawnerOut thay đổi
    drawnerOut(newValue) {
      this.drawner = newValue;
    },
    // Theo dõi khi drawner thay đổi từ trong component
    drawner(newValue) {
      this.$emit('update:drawnerOut', newValue); // Emit giá trị mới ra ngoài component cha
    }
  },
  computed: {
    ...mapGetters(['getAuth']), // Truy cập biến auth từ Vuex store
  },
};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
</style>
