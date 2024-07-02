import axios from "axios";

const baseUrl = "http://localhost:8080/";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.reload();
      // hace un reload si el token no es valido para que te redireccione a login
    }
    return Promise.reject(error);
  }
);
