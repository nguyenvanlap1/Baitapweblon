import { createStore } from "vuex";
import authService from "../services/auth.service";

const store = createStore({
  state: {
    auth: {}, // ✅ auth ban đầu rỗng
  },
  mutations: {
    setAuth(state, authData) {
      state.auth = authData;
    },
  },
  actions: {
    async fetchAuth({ commit }) {
      try {
        const auth = await authService.checkLogin();
        console.log("Kiem tra dang nhap", auth);
        commit("setAuth", auth); // Cập nhật auth vào state
      } catch (error) {
        console.error("Lỗi khi fetch auth:", error);
        commit("setAuth", {}); // Nếu lỗi, reset auth
      }
    },
  },
  getters: {
    getAuth: (state) => state.auth,
  },
});

export default store;
