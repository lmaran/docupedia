// const mongoHelper = require("../helpers/mongo.helper");
// const { ObjectId } = require("mongodb");
import { getDb } from "../helpers/mongo.helper.js";
const collection = "roleAssignments";

export const getRolesBySubjectId = async (subjectId) => {
    const db = await getDb();
    return db.collection(collection).find({ subjectId: subjectId }).toArray();
};
