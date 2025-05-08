import { MongoClient, ObjectId } from "mongodb";
import config from "../config/config.js";

if (!config.mongo_uri) {
    throw new Error("Nu este definit un connection string pentru Mongo.");
}
if (!config.mongo_dbName) {
    throw new Error("Nu este definit numele bazei de date.");
}

let clientPromise;
export function getClientPromise() {
    if (!clientPromise) {
        const client = new MongoClient(config.mongo_uri);
        clientPromise = client.connect();
    }
    return clientPromise;
}

let client;
export async function getDb(dbName) {
    if (!client) {
        client = await getClientPromise();
    }
    return client.db(dbName || config.mongo_dbName);
}

export { ObjectId };

// Graceful shutdown to avoid potential memory leaks or other issues.
process.on("SIGINT", gracefulShutdown).on("SIGTERM", gracefulShutdown);

async function gracefulShutdown() {
    if (client) {
        await client.close();
    }
    process.exit(0);
}
