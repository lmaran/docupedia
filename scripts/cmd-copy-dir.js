#!/usr/bin/env node

/*
Example: 
    package.json: "scripts.copy-files": "node ./scripts/cmd-copy-dir.js src dist"
    bash: npm run copy-files
*/
import process from 'node:process';
import { promises as fs } from 'node:fs';

if(process.argv.length < 4) { 
    console.log("You are missing the source or destination folder!"); 
    process.exit(1); 
}

let source = process.argv[2];
let destination = process.argv[3];
try {
    await fs.cp(source, destination, {recursive: true});
    console.log(`Successfully copied from ${source} to ${destination}!`);
} catch (error) {
    console.error(error.message);
}









