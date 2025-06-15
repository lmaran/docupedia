// import { getDb, ObjectId } from "../helpers/mongo.helper.js";
import { createGenericRepository } from "./generic.repository.js";

const collectionName = "users";
const genericRepository = createGenericRepository(collectionName);

export const authRepository = {
    ...genericRepository,

    // getOneByEmail: async (email) => {
    //     const db = await getDb();
    //     return db.collection(collectionName).findOne({ email: email.toLowerCase() });
    // },

    // getOneBySignupCode: async (signupCode) => {
    //     const db = await getDb();
    //     return db.collection(collectionName).findOne({ signupCode });
    // },

    // getOneByResetPasswordCode: async (resetPasswordCode) => {
    //     const db = await getDb();
    //     return db.collection(collectionName).findOne({ resetPasswordCode });
    // },

    // getOneByIdWithoutPsw: async (id) => {
    //     const db = await getDb();
    //     return db.collection(collectionName).findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
    // },

    // resetPassword: async (userIdAsString, modifiedFields, removedFields) => {
    //     const db = await getDb();
    //     return db.collection(collectionName).updateOne({ _id: new ObjectId(userIdAsString) }, { $set: modifiedFields, $unset: removedFields });
    // },
};
