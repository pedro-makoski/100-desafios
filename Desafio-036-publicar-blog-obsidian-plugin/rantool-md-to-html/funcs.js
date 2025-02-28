const MDToHTML = require("./mdToHTMLFile.js");
const replaceItens = require("./replace-items.js");
const configs = require("./configs.js");
const fs = require("fs")
const path = require("path");
const { spawn } = require("child_process");

function readFile(path) {
    try {
        const data = fs.readFileSync(path, "utf-8")
        return data 
    } catch {
        return null 
    }
}

function copyAllFiles(beforePath, newPath, exceptsExts) {
    try {
        const files = fs.readdirSync(beforePath);

        files.forEach((pathOfFolder) => {
            if(exceptsExts.includes(path.extname(pathOfFolder))) {
                return
            }

            const beforePathOfFile = path.join(beforePath, pathOfFolder);
            const newPathOfFile = path.join(newPath, pathOfFolder);

            const status = fs.statSync(beforePathOfFile);
            if(status.isFile()) {
                fs.copyFileSync(beforePathOfFile, newPathOfFile)
            } else if(status.isDirectory()) {
                fs.mkdirSync(newPathOfFile, {recursive:true})
                copyAllFiles(beforePathOfFile, newPathOfFile, exceptsExts)
            }
        })
    } catch {
        throw new Error("Erro ao copiar os arquivos")
    }
}

function addToJSON(obj, path) {
    const jsonOfBlogstxt = readFile(path);
    const jsonOfBlogs = JSON.parse(jsonOfBlogstxt);
    jsonOfBlogs.push(obj)
    const newJsonOfBlogs = JSON.stringify(jsonOfBlogs);
    fs.writeFileSync(path, newJsonOfBlogs, (err) => {
        if(err) throw new Error("Erro ao criar o JSON");
    })
}

async function commitAndPush(branch, nameBlog, pathGit) {
    const executarComando = (comando, args) => {
        return new Promise((resolve, reject) => {
            const processo = spawn(comando, args, { cwd: pathGit });

            let erroData = '';

            processo.stderr.on('data', (data) => {
                erroData += data.toString();
            });

            processo.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Erro ao executar ${comando} ${args.join(' ')}: ${erroData}`));
                }
            });
        });
    };

    return executarComando('git', ['checkout', branch])
        .then(() => executarComando('git', ['add', '.']))
        .then(() => executarComando('git', ['commit', '-m', `Criação do blog ${nameBlog}`]))
        .then(() => executarComando('git', ['push', '-u', 'origin', branch]))
        .catch((erro) => {
            throw erro; 
        });
}

function postNewBlog(name, area, imagemHeaderPath, pathToCopy, markdownPath, originPath, description, autors, keywords) {
    const md = readFile(markdownPath);
    const pathGit = configs["path-git"];
    const jsonPlace = configs["json-place"];
    const fullJsonPlace = path.join(pathGit, jsonPlace);
    const nameFile = replaceItens(name, [" "], ["-"]);
    const areaName = replaceItens(area, [" "], ["-"]);
    const pathBlogs = path.join(pathGit, configs["path-blogs"]);
    const folderPath = path.join(pathBlogs, areaName, nameFile)
    const pathOfTheBlogRelative = path.join(configs["path-blogs"], areaName, nameFile)
    const nameImage = path.basename(imagemHeaderPath)
    const newImagePath = path.join(pathOfTheBlogRelative, nameImage);
    const nameFileChangeExt = `index.html`
    const htmlNameFile = path.join(folderPath, nameFileChangeExt)
    const htmlNameFileRelative = path.join(pathOfTheBlogRelative, nameFileChangeExt)

    if(md) {
        fs.mkdirSync(folderPath, {recursive:true})
        const mdtohtml = new MDToHTML(path.join(originPath, "./template.html"), markdownPath);
        mdtohtml.putTitle(name)
        mdtohtml.putKeyWords(keywords)
        mdtohtml.putAutors(autors)
        mdtohtml.putDescription(description)
        mdtohtml.writeHTML("#root", htmlNameFile);
        copyAllFiles(pathToCopy, folderPath, [".md"]);
        addToJSON({
            nome:name,
            area:area,
            imagem:newImagePath,
            local:htmlNameFileRelative
        }, fullJsonPlace)
        commitAndPush(configs["branch"], nameFile, pathGit)
        return; 
    }

    throw new Error("Aconteceu algum erro")
}

module.exports = postNewBlog