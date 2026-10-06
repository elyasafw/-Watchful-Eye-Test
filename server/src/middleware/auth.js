import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../settings/config.js";

export async function authMiddleware(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer")) {
        return res.status(401).json({ error: "חסר טוקן התחברות" });
    }

    const token = header.split(" ")[1];

    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ error: "טוקן לא תקין / פג תוקפו" });
    }
}

export function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "משתמש לא מחובר" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "למשתמש אין הרשאה מתאימה" });
        }

        next();
    };
}
