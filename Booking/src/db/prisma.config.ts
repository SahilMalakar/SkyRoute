import { defineConfig } from "prisma/config";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

console.log(
  `Loaded environment  ${process.env.DATABASE_URL ? "successfully" : "with errors"}`,
);

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL is not defined in environment variables");

  throw new Error("Missing DATABASE_URL in environment variables");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
