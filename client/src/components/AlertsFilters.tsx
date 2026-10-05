import { useState, type FormEvent } from "react";
import type { Arena, Priority } from "../types/alert";

export interface AlertsFiltersProps {
    search: string;
    arena: Arena | "";
    priority: Priority | "";
    onSearchChange: (search: string) => void;
    onArenaChange: (arena: Arena | "") => void;
    onPriorityChange: (priority: Priority | "") => void;
}

export default function AlertsFilters({
    search,
    arena,
    priority,
    onSearchChange,
    onArenaChange,
    onPriorityChange,
}: AlertsFiltersProps) {
    const [searchInput, setSearchInput] = useState(search);

    function handleSearchSubmit(e: FormEvent) {
        e.preventDefault();
        onSearchChange(searchInput);
    }

    return (
        <div>
            <form onSubmit={handleSearchSubmit}>
                <input
                    placeholder="חיפוש לפי שם"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit">חיפוש</button>
            </form>

            <select
                value={arena}
                onChange={(e) => onArenaChange(e.target.value as Arena | "")}
            >
                <option value="">כל הזירות</option>
                <option value="North">צפון</option>
                <option value="South">דרום</option>
                <option value="Center">מרכז</option>
            </select>

            <select
                value={priority}
                onChange={(e) =>
                    onPriorityChange(e.target.value as Priority | "")
                }
            >
                <option value="">כל הסיווגים</option>
                <option value="Low">נמוך</option>
                <option value="Medium">סביר</option>
                <option value="High">גבוה</option>
                <option value="Critical">קריטי</option>
            </select>
        </div>
    );
}
