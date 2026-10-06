import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import {
    validateLogin,
    validateRegister,
} from "../middleware/validatations.js";

const authRouter = Router();

authRouter.post("/login", validateLogin, login);

authRouter.get("/me", authMiddleware, getMe);

authRouter.post(
    "/register",
    authMiddleware,
    requireRole("admin"),
    validateRegister,
    register,
);

export default authRouter;
