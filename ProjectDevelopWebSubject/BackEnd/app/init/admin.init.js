const bcrypt = require("bcryptjs");
const MongoDB = require("../utils/mongodb.util");
const NhanVienService = require("../services/nhanvien.service");

async function ensureAdminAccountExists() {
  const nhanVienService = new NhanVienService(MongoDB.client);

  const admins = await nhanVienService.find({
    chucvu: "admin",
  });
  if (admins.length === 0) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminData = {
      _id: "admin1",
      hotennv: "Quản trị viên",
      username: "admin",
      password: hashedPassword,
      chucvu: "admin",
      diachi: "123 Admin Street",
      sodienthoai: "0123456789",
      email: "admin@example.com",
    };

    await nhanVienService.create(adminData);
    console.log("✅ Admin account created: id=admin1, password=admin123");
  } else {
    console.log("✅ Admin account already exists.");
  }
}

module.exports = ensureAdminAccountExists;
