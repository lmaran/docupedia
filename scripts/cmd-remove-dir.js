#!/usr/bin/env node

/*
Example: 
    package.json: "scripts.clean": "node ./scripts/cmd-remove-dir.js dist"
    bash: npm run clean
*/
import { promises as fs } from "fs";
import process from "node:process";

if (process.argv.length < 3) {
    console.log("You are missing the folder path!");
    process.exit(1);
}

const folderPath = process.argv[2];
try {
    await fs.rm(folderPath, { recursive: true, force: true });
    console.log(`Successfully deleted ${folderPath}!`);
} catch (error) {
    console.error(error.message);
}
