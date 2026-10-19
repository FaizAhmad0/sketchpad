import { Router } from "express";
import {
  logoutController,
  signinController,
  signupController,
} from "../controllers/auth.controllers";

export const router: Router = Router();

router.post("signup", signupController);
router.post("signin", signinController);
router.post("logout", logoutController);
