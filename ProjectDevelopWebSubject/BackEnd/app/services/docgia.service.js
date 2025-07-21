const bcrypt = require("bcryptjs");

class DocGiaService {
  constructor(client) {
    this.DocGia = client.db().collection("docgia");
  }

  // Định nghĩa các phương thức trích xuất dữ liệu độc giả
  extractDocGiaData(payload) {
    // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
    if (
      !payload._id ||
      !payload.holot ||
      !payload.ten ||
      !payload.ngaysinh ||
      !payload.phai ||
      !payload.diachi ||
      !payload.dienthoai
    ) {
      throw new Error(
        "Missing required fields: '_id', 'holot', 'ten', 'ngaysinh', 'phai', 'diachi', 'dienthoai', and/or 'password'"
      );
    }

    const docgia = {
      _id: payload._id,
      holot: payload.holot,
      ten: payload.ten,
      ngaysinh: payload.ngaysinh,
      phai: payload.phai,
      diachi: payload.diachi,
      dienthoai: payload.dienthoai,
    };

    if (payload.password) {
      docgia.password = payload.password; // Thêm trường password (chưa hash)
    }

    return docgia;
  }

  async hashPassword(password) {
    const saltRounds = 10; // Độ mạnh của salt
    return await bcrypt.hash(password, saltRounds);
  }

  async create(payload) {
    try {
      const docgia = this.extractDocGiaData(payload); // Trích xuất dữ liệu đã kiểm tra tính hợp lệ

      // Hash password trước khi lưu
      docgia.password = await this.hashPassword(docgia.password);

      const result = await this.DocGia.findOneAndUpdate(
        { _id: docgia._id }, // Sử dụng _id làm khóa chính
        { $set: docgia },
        { returnDocument: "after", upsert: true }
      );
      return result;
    } catch (error) {
      throw new Error(`Failed to create: ${error.message}`);
    }
  }

  async update(id, payload) {
    try {
      if (!id) {
        throw new Error("Invalid 'id' format");
      }

      const filter = { _id: id }; // Sử dụng _id làm khóa chính
      const update = this.extractDocGiaData(payload);

      // Hash password nếu nó được cập nhật
      if (update.password) {
        update.password = await this.hashPassword(update.password);
      }

      const result = await this.DocGia.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
      );
      return result;
    } catch (error) {
      throw new Error(`Failed to update: ${error.message}`);
    }
  }

  async verifyPassword(id, password) {
    try {
      const docgia = await this.DocGia.findOne({ _id: id });

      if (!docgia || !docgia.password) {
        throw new Error("User not found or password not set");
      }

      // Kiểm tra mật khẩu
      const isMatch = await bcrypt.compare(password, docgia.password);
      return isMatch;
    } catch (error) {
      throw new Error(`Failed to verify password: ${error.message}`);
    }
  }

  // Các phương thức khác không cần thay đổi
  async find(filter) {
    const cursor = await this.DocGia.find(filter);
    return await cursor.toArray();
  }

  async findByName(name) {
    return await this.find({
      ten: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    return await this.find({
      _id: id, // Sử dụng _id để tìm kiếm
    });
  }

  async delete(id) {
    const filter = {
      _id: id, // Sử dụng _id để xóa
    };
    const result = await this.DocGia.findOneAndDelete(filter);
    return result;
  }

  async deleteAll() {
    const result = await this.DocGia.deleteMany({});
    return result.deletedCount;
  }

  async changePassword(id, oldPassword, newPassword) {
    try {
      const user = await this.DocGia.findOne({ _id: id });

      if (!user || !user.password) {
        throw new Error("User not found or password not set");
      }

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        throw new Error("Old password is incorrect");
      }

      const hashedPassword = await this.hashPassword(newPassword);
      const result = await this.DocGia.findOneAndUpdate(
        { _id: id },
        { $set: { password: hashedPassword } },
        { returnDocument: "after" }
      );

      return result;
    } catch (error) {
      throw new Error(`Failed to change password: ${error.message}`);
    }
  }
}

module.exports = DocGiaService;
