import axios from "axios";
import { dbConfig } from "../config";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = `${dbConfig.REACT_APP_API_HOST}:${dbConfig.API_PORT}`;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
