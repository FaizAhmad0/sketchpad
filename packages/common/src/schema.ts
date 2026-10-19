import { minLength, trim, z } from "zod";

export const signupSchema = z.strictObject({
  name: z.string().trim().min(3).max(20),
  email: z.email().trim().lowercase(),
  password: z.string().min(4).max(100),
  photo: z.url(),
});

export const signinSchema = z.strictObject({
  email: z.email().trim().lowercase(),
  password: z.string().min(4).max(100),
});

export const createRoomSchema = z.strictObject({
  slug: z
    .string()
    .trim()
    .min(3)
    .max(50)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers or hyphens",
    ),
});

export const createChatSchema = z.strictObject({
  roomId: z.number().int().positive(),

  message: z.string().trim().min(1).max(2000),
});
