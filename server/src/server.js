import { createApp } from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

await connectDB();

createApp().listen(PORT, () => {
    console.log(`Server on -> https://localhost:${PORT}`);
});
