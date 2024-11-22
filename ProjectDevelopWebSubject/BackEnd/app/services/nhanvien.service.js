class NhanVienService {
    constructor(client) {
        this.NhanVien = client.db().collection('nhanvien');
    }

    // Định nghĩa các phương thức trích xuất dữ liệu nhân viên
    extractNhanVienData(payload) {
        // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
        if (!payload._id || !payload.hotennv || !payload.chucvu || !payload.diachi || !payload.sodienthoai) {
            throw new Error("Missing required fields: '_id', 'hotennv', 'chucvu', 'diachi', and/or 'sodienthoai'");
        }

        const nhanvien = {
            _id: payload._id, // Sử dụng trực tiếp _id
            hotennv: payload.hotennv,
            password: payload.password,
            chucvu: payload.chucvu,
            diachi: payload.diachi,
            sodienthoai: payload.sodienthoai,
        };

        return nhanvien;
    }

    async create(payload) {
        try {
            if (!payload.password) {
                throw new Error("Missing required field: password");
            }
            const nhanvien = this.extractNhanVienData(payload);

            const result = await this.NhanVien.findOneAndUpdate(
                { _id: nhanvien._id }, // Sử dụng _id
                { $set: nhanvien },
                { returnDocument: 'after', upsert: true }
            );
            return result;
        } catch (error) {
            throw new Error(`Failed to create: ${error.message}`);
        }
    }

    async find(filter) {
        const cursor = await this.NhanVien.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            hotennv: { $regex: new RegExp(name), $options: 'i' }
        });
    }

    async findById(id) {
        return await this.find({
            _id: id, // Sử dụng _id
        });
    }

    async update(id, payload) {
        try {
            if (!id) {
                throw new Error("Invalid 'id' format");
            }

            const filter = { _id: id }; // Sử dụng _id
            const update = this.extractNhanVienData(payload);

            const result = await this.NhanVien.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: 'after' }
            );
            return result;
        } catch (error) {
            throw new Error(`Failed to update: ${error.message}`);
        }
    }

    async delete(id) {
        const filter = {
            _id: id, // Sử dụng _id
        };
        const result = await this.NhanVien.findOneAndDelete(filter);
        return result;
    }

    async deleteAll() {
        const result = await this.NhanVien.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhanVienService;
