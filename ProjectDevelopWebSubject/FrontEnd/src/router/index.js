import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import NXB from "../views/NXB.vue";
import DocGia from "../views/DocGia.vue";
import Sach from "../views/Sach.vue";
import NhanVien from "../views/NhanVien.vue";
import TheoDoiMuonSach from "../views/ThoiDoiMuonSach.vue";
import MuonSach from "../views/MuonSach.vue";
import ThongTinCaNhan from "../views/ThongTinCaNhan.vue";
import TheoDoiSachDocGia from "../views/TheoDoiSachDocGia.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/nxb",
    name: "nxb",
    component: NXB,
  },
  {
    path: "/docgia",
    name: "docgia",
    component: DocGia,
  },
  {
    path: "/thongtincanhan",
    name: "thongtincanhan",
    component: ThongTinCaNhan,
  },
  {
    path: "/sach",
    name: "sach",
    component: Sach,
  },
  {
    path: "/nhanvien",
    name: "nhanvien",
    component: NhanVien,
  },
  {
    path: "/theodoimuonsach",
    name: "theodoimuonsach",
    component: TheoDoiMuonSach,
  },
  {
    path: "/muonsach",
    name: "muonsach",
    component: MuonSach,
  },
  {
    path: "/docgia/theo-doi",
    name: "TheoDoiSachDocGia",
    component: TheoDoiSachDocGia,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
