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
}

export type NewAlert = Omit<Alert, "_id">;
export type UpdateAlert = Partial<NewAlert>;
