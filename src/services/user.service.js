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
        return await db.collection(collectionName).find().project({ password: 0 }).toArray(); // if there are no items, return an empty array
    } catch (error) {
        throw new Error(`Error retrieving users: ${error.message}`);
    }
};

export const getOneById = async (id) => {
    try {
        const db = await getDb();
        return await db.collection(collectionName).findOne({ _id: ObjectId.createFromHexString(id) }); // if not found, return null
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

export const getOneByEmail = async (email) => {
    const db = await getDb();
    return db.collection(collectionName).findOne({ email: email.toLowerCase() });
};

export const getOneBySignupCode = async (signupCode) => {
    const db = await getDb();
    return db.collection(collectionName).findOne({ signupCode });
};

export const getOneByResetPasswordCode = async (resetPasswordCode) => {
    const db = await getDb();
    return db.collection(collectionName).findOne({ resetPasswordCode });
};

export const getOneByIdWithoutPsw = async (id) => {
    const db = await getDb();
    return db.collection(collectionName).findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
};

export const resetPassword = async (userIdAsString, modifiedFields, removedFields) => {
    const db = await getDb();
    return db.collection(collectionName).updateOne({ _id: new ObjectId(userIdAsString) }, { $set: modifiedFields, $unset: removedFields });
};
