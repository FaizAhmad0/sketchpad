import jwt from "jsonwebtoken";
import { AppError } from "./app-error.js";
import { JWT_SECRET } from "@repo/common/config";

const getJwtSecret = (): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return JWT_SECRET;
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ sub: userId }, getJwtSecret(), {
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

export const verifyToken = (token: string): string => {
  const secret = getJwtSecret();

  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ["HS256"],
    });

    if (typeof decoded === "string" || typeof decoded.sub !== "string") {
      throw new Error("Invalid token payload");
    }

    return decoded.sub;
  } catch {
    throw new AppError("Invalid or expired token", 401);
  }
};
