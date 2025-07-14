const bcrypt = require("bcryptjs");
const MongoDB = require("../utils/mongodb.util");
const NhanVienService = require("../services/nhanvien.service");

async function ensureAdminAccountExists() {
  const nhanVienService = new NhanVienService(MongoDB.client);

  const admins = await nhanVienService.find({
    role: "admin",
  });

  if (admins.length === 0) {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const adminData = {
      hotennv: "Quản trị viên",
      username: "admin",
      password: hashedPassword,
      role: "admin",
      email: "admin@example.com",
      chucvu: "Quản trị viên",
      diachi: "123 Admin Street",
      sodienthoai: "0123456789",
      _id: "001",
    };

    await nhanVienService.create(adminData);
    console.log(
      "✅ Admin account created: id=001, username=admin, password=admin123"
    );
  } else {
    console.log("✅ Admin account already exists.");
  }
}

module.exports = ensureAdminAccountExists;
