import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("alumni_user");
  if (raw) {
    const { token } = JSON.parse(raw);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
