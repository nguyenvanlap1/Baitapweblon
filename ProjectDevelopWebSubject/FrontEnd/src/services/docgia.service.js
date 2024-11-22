import createApiClient from "./api.service";

class DocGia {
    constructor(baseUrl = "http://localhost:3000/api/docgia") {
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

    // Find all DocGia records
    async findAll() {
        try {
            return (await this.api.get("/", {})).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Create a new DocGia record
    async create(data) {
        try {
            return (await this.api.post("/", data)).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Update an existing DocGia record by ID
    async update(id, data) {
        try {
            return (await this.api.put(`/${id}`, data, { withCredentials: true })).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Delete a DocGia record by ID
    async delete(id) {
        try {
            return (await this.api.delete(`/${id}`)).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Find DocGia by name
    async findByName(name) {
        try {
            return (await this.api.get(`/name/${name}`)).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Login DocGia
    async login(credentials) {
        try {
            return (await this.api.post("/login", credentials, { withCredentials: true })).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Logout DocGia
    async logout() {
        try {
            return (await this.api.post("/logout", {}, { withCredentials: true })).data;
        } catch (error) {
            this.handleError(error);
        }
    }
}

export default new DocGia();
