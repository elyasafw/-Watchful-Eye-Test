import { usersCol } from "../db.js";
import { createRepository } from "../repository/db.repo.js";
import { createUsersService } from "../services/users.service.js";

const usersRepository = createRepository(usersCol);
const usersService = createUsersService(usersRepository);

export async function register(req, res) {
    const userId = await usersService.createNew(req.body);

    res.status(201).json({ success: true, data: { userId } });
}
