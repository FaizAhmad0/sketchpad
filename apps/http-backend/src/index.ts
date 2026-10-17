import express from "express";
const app = express();

import { JWT_SECRET } from "@repo/common/config";
console.log(JWT_SECRET);
app.listen(5000);
