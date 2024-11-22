import createApiClient from "./api.service";

class NhanVien {
    constructor(baseUrl = "http://localhost:3000/api/nhanvien") {
        // Pass 'true' to enable credentials
        this.api = createApiClient(baseUrl);
    }

    // Utility function for handling API errors
    handleError(error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message || "Unknown error occurred");
        }
    }

    // Find all NhanVien records
    async findAll() {
        try {
            return (await this.api.get("/", {})).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Create a new NhanVien record
    async create(data) {
        try {
            return (await this.api.post("/", data)).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Update an existing NhanVien record by ID
    async update(id, data) {
        try {
            return (await this.api.put(`/${id}`, data)).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Delete a NhanVien record by ID
    async delete(id) {
        try {
            return (await this.api.delete(`/${id}`)).data;
        } catch (error) {
            this.handleError(error);
        }
    }
}

export default new NhanVien();