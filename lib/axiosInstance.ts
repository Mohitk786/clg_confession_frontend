import axios from "axios";


export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL as string || "http://localhost:3000/api",
  withCredentials: true,
});