<template>
  <v-app :key="appKey">
    <AppHeader @turnDrawer="turnDrawer" @refreshApp="refreshApp" />
    <v-main :key="appKey">
      <NavigationDrawer :drawnerOut="drawner" :key="appKey">
        <router-view width="100%" :key="appKey" />
      </NavigationDrawer>
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import NavigationDrawer from "./components/NavigationDrawer.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    AppHeader,
    NavigationDrawer,
  },
  data() {
    return {
      drawner: true,
      appKey: 0,
    };
  },
  methods: {
    turnDrawer() {
      this.drawner = !this.drawner;
    },
    refreshApp() {
      console.log("refesh");
      this.appKey += 1; // Thay đổi key để re-render toàn bộ ứng dụng
    },
  },
  computed: {
    ...mapGetters(["getAuth"]), // Truy cập biến auth từ Vuex store
  },
  async mounted() {
    try {
      await this.$store.dispatch("fetchAuth"); // Gọi action để fetch auth
      console.log("Auth:", this.getAuth); // Kiểm tra auth trong console
    } catch (error) {
      console.error("Lỗi khi lấy auth:", error);
    }
  },
};
</script>

<style scoped>
.main-content-scrollable {
  overflow-y: auto;
  height: 100vh;
  padding: 16px;
}
</style>
