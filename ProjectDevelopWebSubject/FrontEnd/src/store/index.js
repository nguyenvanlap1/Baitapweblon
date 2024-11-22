import { createStore } from 'vuex';
import authService from '../services/auth.service';

const store = createStore({
  state: {
    auth: {a:null}, // Biến auth dùng chung
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
        commit('setAuth', auth); // Lưu dữ liệu auth vào state
      } catch (error) {
        console.error('Lỗi khi fetch auth:', error);
      }
    },
  },
  getters: {
    getAuth: (state) => state.auth,
  },
});

export default store;
