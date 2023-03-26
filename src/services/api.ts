import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

export const api = axios.create({
  baseURL: isProduction
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000",
});

export const setToken = (token: string) => {
  api.defaults.headers.Authorization = token;
};
