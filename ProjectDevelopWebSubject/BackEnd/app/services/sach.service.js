const NhaXuatBanService = require('./nhaxuatban.service');
const { ObjectId } = require('mongodb');
const MongoDB = require('../utils/mongodb.util');
const ApiError = require('../api-error');

class SachService {
    constructor(client) {
        this.Sach = client.db().collection('sach');
    }

    // Định nghĩa lại phương thức trích xuất dữ liệu sách
    async extractSachData(payload) {
        // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
        if (!payload._id || !payload.tensach || !payload.dongia || !payload.soquyen || !payload.namxuatban || !payload.manhaxuatban || !payload.nguongoc_tacgia) {
            console.log("here");
            throw new ApiError(400, "Missing required fields: '_id', 'tensach', 'dongia', 'soquyen', 'namxuatban', 'manhaxuatban', and/or 'nguongoc_tacgia'");
        }
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        if ((await nhaxuatbanService.findById(payload.manhaxuatban)).length === 0) {
            throw new ApiError(404, `NXB not found with id: ${payload.manhaxuatban}`);
        }

        // Xây dựng đối tượng sách
        const sach = {
            _id: payload._id, // Tự tạo _id từ client
            tensach: payload.tensach,
            dongia: payload.dongia,
            soquyen: payload.soquyen,
            namxuatban: payload.namxuatban,
            manhaxuatban: payload.manhaxuatban,
            nguongoc_tacgia: payload.nguongoc_tacgia
        };
        return sach;
    }

    async create(payload) {
        try {
            const sach = await this.extractSachData(payload);

            // Kiểm tra xem _id đã tồn tại chưa
            const existingSach = await this.Sach.findOne({ _id: sach._id });
            if (existingSach) {
                throw new ApiError(400, `Duplicate key error: _id "${sach._id}" already exists.`);
            }

            // Nếu không có _id, MongoDB sẽ tự động tạo
            const result = await this.Sach.insertOne(sach);
            return {
                _id: result.insertedId,
                ...sach,
            };
        } catch (error) {
            throw new ApiError(500, `Failed to create: ${error.message}`);
        }
    }


    async find(filter) {
        const cursor = await this.Sach.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            tensach: { $regex: new RegExp(name), $options: 'i' }
        });
    }

    async findById(id) {
        try {
            const objectId = id; // Không chuyển đổi sang ObjectId vì _id do client tự tạo
            return await this.find({
                _id: objectId
            });
        } catch (error) {
            throw new ApiError(400, "Invalid '_id' format");
        }
    }

    async update(id, payload) {
        try {
            const filter = { _id: id };
            const update = await this.extractSachData(payload); // Thêm 'await' để đợi hoàn tất
            const result = await this.Sach.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: 'after' }
            );
            return result; // Trả về tài liệu sau khi cập nhật
        } catch (error) {
            throw new ApiError(500, `Failed to update: ${error.message}`);
        }
    }

    async delete(id) {
        const filter = {
            _id: id // Sử dụng _id do client tự tạo
        };
        const result = await this.Sach.findOneAndDelete(filter);
        return result; // Trả về tài liệu bị xóa
    }

    async deleteAll() {
        const result = await this.Sach.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = SachService;
