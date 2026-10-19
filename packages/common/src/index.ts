import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config({
  path: fileURLToPath(new URL("../.env", import.meta.url)),
});

export const JWT_SECRET = process.env.JWT_SECRET;
