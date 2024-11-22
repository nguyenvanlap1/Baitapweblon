class NhaXuatBanService {
    constructor(client) {
        this.NhaXuatBan = client.db().collection('nhaxuatban');
    }

    // Phương thức trích xuất dữ liệu và kiểm tra tính hợp lệ
    extractNhaXuatBanData(payload) {
        // Kiểm tra nếu thiếu bất kỳ thuộc tính bắt buộc nào
        if (!payload._id || !payload.tennxb || !payload.diachi) {
            throw new Error("Missing required fields: '_id', 'tennxb', and/or 'diachi'");
        }

        const nhaxuatban = {
            _id: payload._id, // Sử dụng _id trực tiếp
            tennxb: payload.tennxb,
            diachi: payload.diachi,
        };

        return nhaxuatban;
    }

    async create(payload) {
        try {
            const nhaxuatban = this.extractNhaXuatBanData(payload);

            const result = await this.NhaXuatBan.findOneAndUpdate(
                { _id: nhaxuatban._id }, // Sử dụng _id
                { $set: nhaxuatban },
                { returnDocument: 'after', upsert: true }
            );
            return result;
        } catch (error) {
            throw new Error(`Failed to create: ${error.message}`);
        }
    }

    async find(filter) {
        const cursor = await this.NhaXuatBan.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            tennxb: { $regex: new RegExp(name), $options: 'i' }
        });
    }

    async findById(id) {
        return await this.find({
            _id: id, // Sử dụng _id
        });
    }

    async update(id, payload) {
        try {
            // Kiểm tra id hợp lệ
            if (!id) {
                throw new Error("Invalid 'id' format");
            }

            const filter = { _id: id }; // Sử dụng _id
            const update = this.extractNhaXuatBanData(payload);

            const result = await this.NhaXuatBan.findOneAndUpdate(
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
        const result = await this.NhaXuatBan.findOneAndDelete(filter);
        return result;
    }

    async deleteAll() {
        const result = await this.NhaXuatBan.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = NhaXuatBanService;
