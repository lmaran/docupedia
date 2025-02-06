// const mongoHelper = require("../helpers/mongo.helper");
// const { ObjectId } = require("mongodb");
import { getDb } from "../helpers/mongo.helper.js";
const collection = "roleDefinitions";

export const getRoleDefinitionsByRoleNames = async (roleNames) => {
    const db = await getDb();
    return db
        .collection(collection)
        .find({ roleName: { $in: roleNames } })
        .toArray();
};
