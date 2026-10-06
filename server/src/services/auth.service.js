import { checkPassword, createToken, toPublicUser } from "./authLogic.js";

export function createAuthService(usersService) {
    async function login(username, password) {
        const user = await usersService.getByUsername(username);
        const isValidUser = await checkPassword(user, password);

        if (!isValidUser) {
            const err = new Error("שם משתמש או סיסמה שגויים");
            err.status = 401;
            throw err;
        }

        const token = createToken(user);
        return { token, user: toPublicUser(user) };
    }

    return { login };
}
