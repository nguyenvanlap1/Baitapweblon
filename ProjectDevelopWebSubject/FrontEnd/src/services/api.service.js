import axios from 'axios';

const createApiClient = (baseURL) => {
  return axios.create({
    baseURL,
    withCredentials: true, // Thêm dòng này nếu cần gửi cookie với yêu cầu
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export default createApiClient;
