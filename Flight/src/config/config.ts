import dotenv from "dotenv";

dotenv.config();

export const config = Object.freeze({
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
});
