import { getDb, ObjectId } from "../helpers/mongo.helper.js";

export const createGenericRepository = (collectionName) => {
    return {
        insertOne: async (item) => {
            try {
                const db = await getDb();
                const result = await db.collection(collectionName).insertOne(item);
                return result.insertedId.toString();
            } catch (error) {
                throw new Error(`Error creating users: ${error.message}`);
            }
        },
        getAll: async () => {
            try {
                const db = await getDb();
                const items = await db.collection(collectionName).find().project({ password: 0 }).toArray(); // if there are no items, return an empty array
                items.forEach((x) => {
                    x._id = x._id.toString();
                });
                return items;
            } catch (error) {
                throw new Error(`Error retrieving users: ${error.message}`);
            }
        },

        getOneById: async (id) => {
            try {
                const db = await getDb();
                const item = await db.collection(collectionName).findOne({ _id: ObjectId.createFromHexString(id) }); // if not found, return null
                item._id = item._id.toString();
                return item;
            } catch (error) {
                throw new Error(`Error retrieving user: ${error.message}`);
            }
        },

        updateOne: async (item) => {
            try {
                const db = await getDb();
                const result = await db.collection(collectionName).updateOne({ _id: ObjectId.createFromHexString(item.id) }, { $set: item });
                return result.matchedCount;
            } catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
        },

        deleteOneById: async (id) => {
            try {
                const db = await getDb();
                const result = await db.collection(collectionName).deleteOne({ _id: ObjectId.createFromHexString(id) });
                return result.deletedCount;
            } catch (error) {
                throw new Error(`Error deleting user: ${error.message}`);
            }
        },
    };
};
