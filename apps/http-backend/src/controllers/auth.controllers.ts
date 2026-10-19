import { Request, Response, RequestHandler } from "express";
import { asyncHandler } from "../utils/async-handler";
import { signinSchema, signupSchema } from "@repo/common/schema";
import { signin, signup } from "../services/auth.services";
import { COOKIE_NAME, cookieOptions } from "../utils/cookie";

export const signupController: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = signupSchema.parse(req.body);

    const { user, token } = await signup(data);

    res.cookie(COOKIE_NAME, token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  },
);

export const signinController: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = signinSchema.parse(req.body);

    const { user, token } = await signin(data);

    res.cookie(COOKIE_NAME, token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
    });
  },
);

export const logoutController: RequestHandler = asyncHandler(
  async (req: Request, res: Response) => {
    res.clearCookie(COOKIE_NAME, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  },
);
