import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import { JWT_SECRET } from "@repo/common/config";
import { prismaClient } from "@repo/db/client";
import { signinSchema, createRoomSchema } from "@repo/common/schema";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRoutes } from "./routes/auth.routes";
import { AppError } from "./utils/app-error";
import { ZodError } from "zod";

const PORT = process.env.PORT || 5000;
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Sketchpad API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.issues,
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(PORT, () => {
  console.log(`http-server is running at ${PORT}`);
});
