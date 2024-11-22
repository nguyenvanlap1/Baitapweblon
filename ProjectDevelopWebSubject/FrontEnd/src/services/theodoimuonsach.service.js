import createApiClient from "./api.service";

class MuonSach {
    constructor(baseUrl = "http://localhost:3000/api/theodoimuonsach") {
        // Khởi tạo client API với baseUrl cho mượn sách
        this.api = createApiClient(baseUrl);
    }

    // Utility function to handle API errors
    handleError(error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message || "An unknown error occurred");
        }
    }

    // Lấy tất cả các bản ghi mượn sách
    async findAll(data) {
        try {
            return (await this.api.get("/", {data})).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Tạo mới một bản ghi mượn sách
    async create(data) {
        try {
            return (await this.api.post("/", data)).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Cập nhật thông tin mượn sách theo ID
    async update(id, data) {
        try {
            return (await this.api.put(`/${id}`, data, { withCredentials: true })).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Xóa bản ghi mượn sách theo ID
    async delete(id) {
        try {
            return (await this.api.delete(`/${id}`)).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Tìm mượn sách theo mã độc giả (madocgia)
    async findByMadocgia(madocgia) {
        console.log(madocgia);
        const data ={madocgia}
        console.log(data);
        try {
            return (await this.api.post(`/docgia`, data)).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Tìm mượn sách theo mã sách (masach)
    async findByMasach(masach) {
        try {
            return (await this.api.get(`/masach/${masach}`)).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Tìm mượn sách theo mã nhân viên (manhanvien)
    async findByManhanvien(manhanvien) {
        try {
            return (await this.api.get(`/manhanvien/${manhanvien}`)).data;
        } catch (error) {
            this.handleError(error);
        }
    }
}

export default new MuonSach();
