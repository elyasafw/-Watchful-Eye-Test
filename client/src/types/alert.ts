export type Priority = "Low" | "Medium" | "High" | "Critical";
export type Arena = "North" | "South" | "Center";
export type Status = "Active" | "Handled";

export interface Alert {
    _id: string;
    displayName: string;
    description: string;
    priority: Priority;
    arena: Arena;
    status: Status;
    lon: number;
    lat: number;
    createdAt: number;
}

export type NewAlert = Omit<Alert, "_id" | "createdAt">;
export type UpdateAlert = Partial<NewAlert>;
