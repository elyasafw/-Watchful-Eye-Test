import { Router } from "express";
import {
    deleteUser,
    getAllUsers,
    getMe,
    login,
    register,
} from "../controllers/auth.controller.js";
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

authRouter.get("/users", authMiddleware, requireRole("admin"), getAllUsers);

authRouter.delete(
    "/users/:id",
    authMiddleware,
    requireRole("admin"),
    deleteUser,
);

export default authRouter;
