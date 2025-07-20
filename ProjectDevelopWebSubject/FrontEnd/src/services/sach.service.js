import createSachApiClient from "./apiClientSach";

class Sach {
  constructor(baseUrl = "http://localhost:3000/api/sach") {
    this.api = createSachApiClient(baseUrl);
  }

  handleError(error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message || "Unknown error occurred");
    }
  }

  async findAll() {
    try {
      return (await this.api.get("/")).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async create(formData) {
    try {
      return (
        await this.api.post("/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id, formData) {
    try {
      console.log("hi");
      console.log(formData);
      return (
        await this.api.put(`/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data;
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
}

export default new Sach();
