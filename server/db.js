import { MongoClient } from "mongodb";
import { DB_NAME, MONGO_URI } from "./config";

let db = null;

export async function connectDB() {
    const client = new MongoClient(MONGO_URI);

    await client.connect();
    db = client.db(DB_NAME);

    console.log("Connected to MongoDB");
}

export const alertsCol = () => db.collection("alerts");
