import { getDb, ObjectId } from "../helpers/mongo.helper.js";
import { createGenericService } from "./generic.service.js";

const collectionName = "users";
const genericService = createGenericService(collectionName);

export const userService = {
    ...genericService,

    getOneByEmail: async (email) => {
        const db = await getDb();
        return db.collection(collectionName).findOne({ email: email.toLowerCase() });
    },

    getOneBySignupCode: async (signupCode) => {
        const db = await getDb();
        return db.collection(collectionName).findOne({ signupCode });
    },

    getOneByResetPasswordCode: async (resetPasswordCode) => {
        const db = await getDb();
        return db.collection(collectionName).findOne({ resetPasswordCode });
    },

    getOneByIdWithoutPsw: async (id) => {
        const db = await getDb();
        return db.collection(collectionName).findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
    },

    resetPassword: async (userIdAsString, modifiedFields, removedFields) => {
        const db = await getDb();
        return db.collection(collectionName).updateOne({ _id: new ObjectId(userIdAsString) }, { $set: modifiedFields, $unset: removedFields });
    },
};
