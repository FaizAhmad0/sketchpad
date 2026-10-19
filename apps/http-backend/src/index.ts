import "dotenv/config";
import express from "express";
import { JWT_SECRET } from "@repo/common/config";
import { prismaClient } from "@repo/db/client";
import { signinSchema, createRoomSchema } from "@repo/common/schema";

const PORT = process.env.PORT || 5000;
const app = express();

console.log(JWT_SECRET);

app.listen(PORT, () => {
  console.log(`http-server is running at ${PORT}`);
});
