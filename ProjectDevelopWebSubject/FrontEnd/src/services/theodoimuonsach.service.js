// File: services/theodoimuonsach.service.js
import createApiClient from "./api.service";

class MuonSach {
  constructor(baseUrl = "http://localhost:3000/api/theodoimuonsach") {
    this.api = createApiClient(baseUrl);
  }

  handleError(error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message || "An unknown error occurred");
    }
  }

  async findAll(data) {
    try {
      return (await this.api.get("/", { data })).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(data) {
    try {
      return (await this.api.post("/", data)).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id, data) {
    try {
      return (await this.api.put(`/${id}`, data)).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(id) {
    try {
      return (await this.api.delete(`/${id}`)).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findByMadocgia(madocgia) {
    const data = { madocgia };
    try {
      return (await this.api.post(`/docgia`, data)).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findByMasach(masach) {
    try {
      return (await this.api.get(`/masach/${masach}`)).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findByManhanvien(manhanvien) {
    try {
      return (await this.api.get(`/manhanvien/${manhanvien}`)).data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

export default new MuonSach();
