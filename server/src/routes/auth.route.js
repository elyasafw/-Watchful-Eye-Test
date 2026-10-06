import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";
import { validateRegister } from "../middleware/validatations.js";

const authRouter = Router();

authRouter.post(
    "/register",
    authMiddleware,
    requireRole("admin"),
    validateRegister,
    register,
);

export default authRouter;
