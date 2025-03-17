import * as fileHelper from "../helpers/file.helper.js";

export const getAppMeta = async () => {
    return await fileHelper.getJson(`../db/apps/app.json`);
};
