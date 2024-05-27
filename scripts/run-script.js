#!/usr/bin/env node

// A cleaner approach is to promisify the spawn() function and then await
import path from 'path';
import { fileURLToPath} from 'url';
import process from 'node:process';
import { spawnPromise } from  './spawnPromise.js';


if(process.argv.length < 3) { 
    console.log("You are missing the script name! Left the extension empty if you want to run both versions: '.bat' or '.sh', depending on detected platform."); 
    process.exit(1); 
}

// In the "scripts" section of package.json is suppose to have 
// "deploy-demo": "node ./scripts/run-script.js deploy-demo"
let scriptName = process.argv[2]; // ex: "deploy-demo" (with/without extension)

// Add file extension if not present. If not present, it's suppose we have both versions (.bat and .sh) in "scripts" folder
if (scriptName.lastIndexOf(".") == -1) {
    let extension = (process.platform === "win32") ? "bat" : "sh";
    scriptName = `${scriptName}.${extension}`;
}

// Get the path to script
const thisFileName = fileURLToPath(import.meta.url);
const scriptFolder = path.dirname(thisFileName); // the runner script file and the scripts themselves are în the same folder (/scripts).
const pathToScript = path.resolve(scriptFolder, scriptName);

// Confirm we execute the right file on the right platform
console.log(`Run ${pathToScript} on ${process.platform}`);

// In macOS/Linux the script must have execution permission. This step must be completed before executing the shell script.
if (process.platform != "win32") await spawnPromise("chmod", ["+x", pathToScript]); 

// In Windows we have to run the script inside a shell (we don't have executables for 'dir', 'md' etc as we have in macOS/Linux)
let options = (process.platform === "win32") ? { shell: true } : {};
await spawnPromise(pathToScript, options); 






