import MD from "./module.js";
import fs from "node:fs"

fs.readFile('./md-test.md', "utf-8", (err, data) => {
    if(err) {
        console.log(err)
        return; 
    }

    const md = new MD(data);
    console.log(md.convertTOHTML())
})