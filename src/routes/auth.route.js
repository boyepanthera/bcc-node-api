import { Router } from "express";
import {
  LoginUserController,
  RegisterUserController,
} from "../controllers/majors/auth.controller";
export const router = Router();

router.route("/login").post(LoginUserController);
router.route("/signup").post(RegisterUserController);
