import type { SigninInput, SignupInput } from "@repo/common/schema";
import { prismaClient } from "@repo/db/client";
import { AppError } from "../utils/app-error.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";

// SIGNUP
export const signup = async (data: SignupInput) => {
  const { name, email, password, photo } = data;


  const existing = await prismaClient.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new AppError("Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  let user;

  try {
    user = await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        photo,
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
      },
    });
  } catch (error) {
    if (
      error !== null &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "P2002"
    ) {
      throw new AppError("Email already registered", 409);
    }

    throw error;
  }

  const token = generateToken(user.id);

  return { user, token };
};

// SIGNIN
export const signin = async (data: SigninInput) => {
  const { email, password } = data;

  const user = await prismaClient.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    },
    token,
  };
};
