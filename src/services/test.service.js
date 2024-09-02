import { getDb } from "../helpers/mongo.helper.js";

const collection = "users";

export async function getAll() {
    const db = await getDb();
    return db.collection(collection).find().toArray();
}
