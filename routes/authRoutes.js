import { Router } from "express";
import {
  registeruser,
  loginuser,
  logoutuser,
} from "../Controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schemas/authSchema.js";


const router = Router();

router.post("/register",validate(registerSchema), registeruser);
router.post("/login",validate(loginSchema), loginuser);
router.post("/logout", logoutuser);

export default router;
