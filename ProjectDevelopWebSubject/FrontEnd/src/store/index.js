import { createStore } from "vuex";
import authService from "../services/auth.service";

const store = createStore({
  state: {
    auth: {},
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
        console.log("Du lieu nhan duoc khi dang nhap", auth);
      } catch (error) {
        console.error("Lỗi khi fetch auth:", error);
        commit("setAuth", {}); // Nếu lỗi, reset auth
      }
    },
    async updateAuth({ commit }) {
      try {
        //Du lieu tu dong gan qua do 	Session ID
        const updated = await authService.getProfile();
        commit("setAuth", updated);
      } catch (error) {
        console.error("Không thể cập nhật lại auth:", error);
      }
    },
  },
  getters: {
    getAuth: (state) => state.auth,
  },
});

export default store;
