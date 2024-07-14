import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-assessment.steerhubs.com/api/",
});

export default axiosInstance;
