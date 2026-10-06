import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export function validateCredentils(username, password) {
    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        username.trim().length < 2 ||
        password.length < 8
    ) {
        const err = new Error("שם משתמש חייב להיות 2+ תווים וסיסמה 8+ תווים");
        err.status = 400;
        throw err;
    }
}

export async function checkPassword(user, password) {
    if (!user) return false;
    return bcrypt.compare(password, user.password);
}

export function createToken(user) {
    const { _id, username, role, assignedArena } = user;
    const payload = { userId: _id.toString(), username, role, assignedArena };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" });
}

export function toPublicUser(user) {
    const { _id, username, role, assignedArena } = user;
    return { userId: _id.toString(), username, role, assignedArena };
}
