// File: services/muonsach.service.js (BackEnd)
const { ObjectId } = require("mongodb");
const DocGiaService = require("./docgia.service");
const SachService = require("./sach.service");
const MongoDB = require("../utils/mongodb.util");

class MuonSachService {
  constructor(client) {
    this.MuonSach = client.db().collection("muonsach");
  }

  async extractMuonSachData(payload) {
    if (!payload.madocgia || !payload.masach || !payload.ngaymuon || !payload.ngaytra) {
      throw new Error("Thiếu các trường bắt buộc");
    }

    const docgiaService = new DocGiaService(MongoDB.client);
    const docgia = await docgiaService.findById(payload.madocgia);
    if (!docgia || docgia.length === 0) {
      throw new Error(`Không tìm thấy độc giả với ID: ${payload.madocgia}`);
    }

    const sachService = new SachService(MongoDB.client);
    const sach = await sachService.findById(payload.masach);
    if (!sach || sach.length === 0) {
      throw new Error(`Không tìm thấy sách với ID: ${payload.masach}`);
    }

    const ngayMuon = new Date(payload.ngaymuon);
    const ngayTra = new Date(payload.ngaytra);
    if (ngayMuon >= ngayTra) {
      throw new Error("Ngày trả phải lớn hơn ngày mượn");
    }

    return {
      madocgia: payload.madocgia,
      masach: payload.masach,
      ngaymuon: payload.ngaymuon,
      ngaytra: payload.ngaytra,
      manhanvien: payload.manhanvien,
    };
  }

  async create(payload) {
    const existingRecord = await this.MuonSach.findOne({
      madocgia: payload.madocgia,
      masach: payload.masach,
      ngaymuon: payload.ngaymuon,
    });
    if (existingRecord) {
      throw new Error("Sách đã được mượn trong khoảng thời gian này");
    }

    const muonsach = await this.extractMuonSachData(payload);
    const result = await this.MuonSach.insertOne(muonsach);
    return result;
  }

  async find(filter) {
    const cursor = await this.MuonSach.find(filter);
    return await cursor.toArray();
  }

  async findById(id) {
    return await this.find({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null });
  }

  async update(id, payload) {
    const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
    const update = await this.extractMuonSachData(payload);
    const result = await this.MuonSach.findOneAndUpdate(filter, { $set: update }, { returnDocument: "after" });
    return result;
  }

  async delete(id) {
    const record = await this.findById(id);
    if (!record || record.length === 0) throw new Error("Không tìm thấy bản ghi để xóa");

    // const ngayMuon = new Date(record[0].ngaymuon);
    // const today = new Date();
    // if ((today - ngayMuon) / (1000 * 3600 * 24) > 1) {
    //   throw new Error("Không thể xóa bản ghi đã qua ngày mượn hơn 1 ngày");
    // }

    const result = await this.MuonSach.deleteOne({ _id: new ObjectId(id) });
    return result;
  }

  async deleteAll() {
    const result = await this.MuonSach.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = MuonSachService;
