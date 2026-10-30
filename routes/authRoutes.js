import { Router } from "express";
import {
  registeruser,
  loginuser,
  logoutuser,
  refreshhandler,
} from "../Controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, refreshSchema, registerSchema } from "../schemas/authSchema.js";


const router = Router();

router.post("/register",validate(registerSchema), registeruser);
router.post("/login",validate(loginSchema), loginuser);
router.post("/logout",validate(refreshSchema), logoutuser);
router.post("/refresh", validate(refreshSchema), refreshhandler);
export default router;
