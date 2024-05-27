// A cleaner approach is to promisify the spawn() function and then await
// https://kisaragi-hiu.com/nodejs-cmd

import { spawn } from  'child_process';
import process from 'node:process';


// We can call it with 1, 2 or 3 parameters:

// spawnPromise('ls'); // cmd
// spawnPromise('ls', ['-']); // cmd + args
// spawnPromise('echo', ['Somme message']); // cmd + args
// spawnPromise("chmod", ["+x", pathToScript]); // cmd + args
// spawnPromise(pathToScript, {shell: true}), // cmd + options
function spawnPromise(cmd, args, options) {
    // Craft the spawn method: spawn(command[, args][, options]) // cmd=string, args=array_of_string, args=object
    let p = spawn(cmd);
    if (args) {
        if(Array.isArray(args))
            if (options && typeof options == "object")
                p = spawn(cmd, args, options);
            else
                p = spawn(cmd, args);
        else if (typeof args == "object")
            p = spawn(cmd, options);
    } 

    // Promisify the spawn method
    return new Promise((resolveFunc) => {
        p.stdout.on("data", (x) => {
            process.stdout.write(x.toString());
        });
        p.stderr.on("data", (x) => {
            process.stderr.write(x.toString());
        });
        p.on("exit", (code) => {
            resolveFunc(code);
        });
    });
}

export { spawnPromise }