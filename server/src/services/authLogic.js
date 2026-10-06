import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../settings/config.js";

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
