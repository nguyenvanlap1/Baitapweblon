import axios from "axios";

const createSachApiClient = (baseURL) => {
  return axios.create({
    baseURL,
    withCredentials: true, // Nếu dùng cookie/session
    // ❌ Không set Content-Type mặc định ở đây
  });
};

export default createSachApiClient;
