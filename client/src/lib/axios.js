import axios from "axios";

// TODO: UPDATE BASEURL SO THAT IT WORKS IN THE DEPLOYMENT AS WELL
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})