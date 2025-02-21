import MD from "./module.js";
import fs from "node:fs"
import Readline from "node:readline";

const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question("Passe o caminho do markdown: ", path => {
    fs.readFile(path, "utf-8", (err, data) => {
        if(err) {
            console.log(err)
            return; 
        }
    
        const md = new MD(data);
        console.log(md.convertTOHTML())
    })
})
