const PRIORITY_VALUES = ["Low", "Medium", "High", "Critical"];
const ARENA_VALUES = ["North", "South", "Center"];
const STATUS_VALUES = ["Active", "Handled"];
const ALERT_FIELDS = [
    "displayName",
    "description",
    "priority",
    "arena",
    "status",
    "lon",
    "lat",
];

export function validateCreateAlert(req, res, next) {
    const body = req.body ?? {};
    const errors = [];

    const unknownFields = Object.keys(body).filter(
        (field) => !ALERT_FIELDS.includes(field),
    );
    if (unknownFields.length > 0) {
        errors.push(`שדות לא מוכרים: ${unknownFields.join(", ")}`);
    }

    if (!body.displayName || String(body.displayName).trim() === "") {
        errors.push("שם - שדה חובה");
    }

    if (!body.description || String(body.description).trim() === "") {
        errors.push("תיאור - שדה חובה");
    }

    if (!body.priority) {
        errors.push("סיווג - שדה חובה");
    } else if (!PRIORITY_VALUES.includes(body.priority)) {
        errors.push(
            `סיווג - ערך לא חוקי, אפשרי: ${PRIORITY_VALUES.join(", ")}`,
        );
    }

    if (!body.arena) {
        errors.push("זירה - שדה חובה");
    } else if (!ARENA_VALUES.includes(body.arena)) {
        errors.push(`זירה - ערך לא חוקי, אפשרי: ${ARENA_VALUES.join(", ")}`);
    }

    if (!body.status) {
        errors.push("סטטוס - שדה חובה");
    } else if (!STATUS_VALUES.includes(body.status)) {
        errors.push(`סטטוס - ערך לא חוקי, אפשרי: ${STATUS_VALUES.join(", ")}`);
    }

    if (body.lon === undefined || body.lon === null || body.lon === "") {
        errors.push("אורך - שדה חובה");
    } else if (Number.isNaN(Number(body.lon))) {
        errors.push("אורך - חייב להיות מספר");
    }

    if (body.lat === undefined || body.lat === null || body.lat === "") {
        errors.push("רוחב - שדה חובה");
    } else if (Number.isNaN(Number(body.lat))) {
        errors.push("רוחב - חייב להיות מספר");
    }

    if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(", ") });
    }

    next();
}

export function validateUpdateAlert(req, res, next) {
    const body = req.body ?? {};
    const errors = [];

    const unknownFields = Object.keys(body).filter(
        (field) => !ALERT_FIELDS.includes(field),
    );
    if (unknownFields.length > 0) {
        errors.push(`שדות לא מוכרים: ${unknownFields.join(", ")}`);
    }

    if (
        body.displayName !== undefined &&
        String(body.displayName).trim() === ""
    ) {
        errors.push("שם - לא יכול להיות ריק");
    }

    if (
        body.description !== undefined &&
        String(body.description).trim() === ""
    ) {
        errors.push("תיאור - לא יכול להיות ריק");
    }

    if (
        body.priority !== undefined &&
        !PRIORITY_VALUES.includes(body.priority)
    ) {
        errors.push(
            `סיווג - ערך לא חוקי, אפשרי: ${PRIORITY_VALUES.join(", ")}`,
        );
    }

    if (body.arena !== undefined && !ARENA_VALUES.includes(body.arena)) {
        errors.push(`זירה - ערך לא חוקי, אפשרי: ${ARENA_VALUES.join(", ")}`);
    }

    if (body.status !== undefined && !STATUS_VALUES.includes(body.status)) {
        errors.push(`סטטוס - ערך לא חוקי, אפשרי: ${STATUS_VALUES.join(", ")}`);
    }

    if (body.lon !== undefined && Number.isNaN(Number(body.lon))) {
        errors.push("אורך - חייב להיות מספר");
    }

    if (body.lat !== undefined && Number.isNaN(Number(body.lat))) {
        errors.push("רוחב - חייב להיות מספר");
    }

    if (errors.length > 0) {
        return res.status(400).json({ error: errors.join(", ") });
    }

    next();
}
