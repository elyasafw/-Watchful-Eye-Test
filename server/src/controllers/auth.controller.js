import { usersCol } from "../db.js";
import { createRepository } from "../repository/db.repo.js";
import { createAuthService } from "../services/auth.service.js";
import { createUsersService } from "../services/users.service.js";

const usersRepository = createRepository(usersCol);
const usersService = createUsersService(usersRepository);
const authService = createAuthService(usersService);

export async function register(req, res) {
    const userId = await usersService.createNew(req.body);

    res.status(201).json({
        success: true,
        message: "משתמש נוצר בהצלחה",
        data: { userId },
    });
}

export async function login(req, res) {
    const { username, password } = req.body;
    const result = await authService.login(username, password);

    res.json({ success: true, ...result });
}

export async function getMe(req, res) {
    const user = await usersService.getById(req.user.userId);

    res.json({ success: true, data: user });
}

export async function getAllUsers(req, res) {
    const users = await usersService.getAll();

    res.json({ success: true, data: users });
}

export async function deleteUser(req, res) {
    await usersService.remove(req.params.id);

    res.json({ success: true, message: "משתמש נמחק בהצלחה" });
}
