import bcrypt from "bcrypt";
import { toPublicUser } from "./authLogic.js";

export function createUsersService(repository) {
    async function createNew(user) {
        const newUser = {
            ...user,
            password: await bcrypt.hash(user.password, 10),
            createdAt: new Date().toLocaleDateString(),
        };
        return repository.createDoc(newUser);
    }

    async function getAll() {
        const allUsers = await repository.getAllDocs();
        return allUsers.map(toPublicUser);
    }

    async function getById(id) {
        const user = await repository.getDocById(id);
        return toPublicUser(user);
    }

    function getByUsername(username) {
        return repository.getDocByField("username", username);
    }

    function remove(id) {
        return repository.deleteDoc(id);
    }

    return { createNew, getAll, getById, getByUsername, remove };
}
