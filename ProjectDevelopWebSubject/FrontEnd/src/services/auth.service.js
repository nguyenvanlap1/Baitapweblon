import createApiClient from "./api.service";

class AuthService {
    constructor(baseUrl = "http://localhost:3000/api/auth") {
        this.api = createApiClient(baseUrl);
    }
    handleError(error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error(error.message || "Unknown error occurred");
        }
    }

    // Logout function
    async logout() {
        try {
            return (await this.api.post("/logout", {}, { withCredentials: true })).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Check login status
    async checkLogin() {
        try {
            return (await this.api.post("/checklogin", {}, { withCredentials: true })).data;
        } catch (error) {
            this.handleError(error);
        }
    }

    // Login function with credentials
    async login(data) {
        try {
            return (await this.api.post("/login", data, { withCredentials: true })).data;
        } catch (error) {
            this.handleError(error);
        }
    }
}

export default new AuthService();
