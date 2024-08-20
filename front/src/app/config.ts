import dotenv from "dotenv";

dotenv.config();

export const API = process.env['API'] || "http://localhost:5000";
