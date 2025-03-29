import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// TODO: UPDATE BASEURL SO THAT IT WORKS IN THE DEPLOYMENT AS WELL
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})