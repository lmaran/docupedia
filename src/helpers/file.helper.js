import { readFile } from "fs/promises";
import path from "path";
const __dirname = import.meta.dirname; // current folder

export const getJson = async (filePath) => {
    const resultStr = await readFile(path.join(__dirname, filePath), "utf-8");
    return JSON.parse(resultStr);
};
