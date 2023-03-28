import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  origin: "*",
  optionsSuccessStatus: 200,
  allowedHeaders: [
    "X-CSRF-Token",
    "X-Requested-With",
    "Accept",
    "Accept-Version",
    "Content-Length",
    "Content-MD5",
    "Content-Type",
    "Date",
    "X-Api-Version",
    "Authorization",
  ],
  credentials: true,
};
