// axios instance needed to call server endpoints - comparable to fetch
import axios from "axios";

// axios method to define baseURL - change URL after deployment
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

// Add token from session storage to header of every request sent
axiosInstance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(sessionStorage.getItem("accessToken")) || "";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
