export type Role = "arena_user" | "general_user" | "admin";
export type AssignedArena = "North" | "South" | "Center" | "All";

export interface User {
    userId: string;
    username: string;
    role: Role;
    assignedArena: AssignedArena;
}

export interface NewUser {
    username: string;
    password: string;
    email: string;
    role: Role;
    assignedArena: AssignedArena;
}
