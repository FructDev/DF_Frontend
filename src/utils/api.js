import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `https://df-backend-u6yp.onrender.com/api`, // Cambia esto a la URL de tu API
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
