import { createApp } from "./app.js";
import { PORT } from "./config.js";

createApp().listen(PORT, () => {
    console.log(`Server on -> https://localhost:${PORT}`);
});
