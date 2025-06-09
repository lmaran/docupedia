import { readFile } from "fs/promises";
import path from "path";
const __dirname = import.meta.dirname; // current folder

/**
[Usage]:
import * as fileHelper from "../helpers/file.helper.js";
const myJson =  await fileHelper.getJson(`../metadata/app.json`);
 */
export const getJson = async (filePath) => {
    const resultStr = await readFile(path.join(__dirname, filePath), "utf-8");
    return JSON.parse(resultStr);
};
