import { MongoClient, ObjectId } from "mongodb";
import config from "../config/config.js";

if (!config.mongo_uri) {
    throw new Error("Nu este definit un connection string pentru Mongo.");
}
if (!config.mongo_dbName) {
    throw new Error("Nu este definit numele bazei de date.");
}

let client;
let clientPromise;

if (!client) {
    client = new MongoClient(config.mongo_uri);
    clientPromise = client.connect();
}

export function getClientPromise() {
    return clientPromise;
}

let db;
export async function getDb(dbName) {
    if (!db) {
        const client = await clientPromise;
        db = client.db(dbName || config.mongo_dbName);
        return db;
    }
    return db;
}

export { ObjectId };
