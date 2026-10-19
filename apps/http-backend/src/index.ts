import express from "express";
const app = express();

import { JWT_SECRET } from "@repo/common/config";
import { Client } from "@repo/db/client";
import { user } from "@repo/common/schema";
console.log(user);


console.log(JWT_SECRET);
app.listen(5000);
