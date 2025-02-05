// utils/api.ts
import axios from "axios";
const apiurl = process.env.NEXT_PUBLIC_API_URL2
const api = axios.create({
  baseURL: apiurl, 
  withCredentials: true, 
});

export default api;
