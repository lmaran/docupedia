import { getDb, ObjectId } from "../helpers/mongo.helper.js";

const collectionName = "users";

export const insertOne = async (item) => {
    try {
        const db = await getDb();
        const result = await db.collection(collectionName).insertOne(item);
        return result.insertedId;
    } catch (error) {
        throw new Error(`Error creating users: ${error.message}`);
    }
};

export const getAll = async () => {
    try {
        const db = await getDb();
        const items = await db.collection(collectionName).find().project({ password: 0 }).toArray();
        return items; // if there are no items, return an empty array
    } catch (error) {
        throw new Error(`Error retrieving users: ${error.message}`);
    }
};

export const getOneById = async (id) => {
    try {
        const db = await getDb();
        const result = await db.collection(collectionName).findOne({ _id: ObjectId.createFromHexString(id) });
        return result; // if not found, return null
    } catch (error) {
        throw new Error(`Error retrieving user: ${error.message}`);
    }
};

export const updateOne = async (id, updatedFields) => {
    try {
        const db = await getDb();
        const result = await db.collection(collectionName).updateOne({ _id: ObjectId.createFromHexString(id) }, { $set: updatedFields });
        return result.matchedCount;
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

export const deleteOneById = async (id) => {
    try {
        const db = await getDb();
        const result = await db.collection(collectionName).deleteOne({ _id: ObjectId.createFromHexString(id) });
        return result.deletedCount;
    } catch (error) {
        throw new Error(`Error deleting user: ${error.message}`);
    }
};
