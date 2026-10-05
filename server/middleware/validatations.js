export function validateBody(...fields) {
    return (req, res, next) => {
        const body = req.body ?? {};

        const missingFields = fields.filter(
            (f) =>
                body[f] === undefined ||
                body[f] === null ||
                String(body[f]).trim() === "",
        );

        if (missingFields.length > 0) {
            return res
                .status(400)
                .json({ error: `${missingFields.join(", ")} :חסרים שדות` });
        }

        next();
    };
}
