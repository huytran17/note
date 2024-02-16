import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.SERVER_URL + "/note",
});

export default axiosInstance;
