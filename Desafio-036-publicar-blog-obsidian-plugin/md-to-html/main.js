const { Plugin, Modal, Notice } = require("obsidian");
const path = require("path");

module.exports = class PostBlog extends Plugin {
    onload() {
        this.addCommand({
            title:"Postar novo blog post",
            context:"file",
            callback: () => {
                const activeFile = this.app.workspace.getActiveFile();
                if(activeFile) {
                    this.abrirPopup(activeFile)
                } else {
                    throw new Error("Erro ao encontrar o caminho")
                }
            }
        })
    }

    async abrirPopup(file) {
        let folder = file.path.split("/").slice(0, -1).join("/")
        const nameFile = file.name

        new Configs(this.app, folder, nameFile).open()
    }
}

class Configs extends Modal{
    constructor(app, folder, nameFile) {
        super(app)
        this.pathFiles = this.app.vault.adapter.basePath
        this.pathPlugin = path.join(this.app.vault.adapter.basePath, ".obsidian/plugins/rantool-md-to-html")
        this.folder = folder
        this.specificFolder = path.join(this.pathFiles, this.folder)
        this.nameFile = nameFile
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.createEl("h1", { text: "Vamos publicar o blog post"});

        const divNome = contentEl.createEl("div")
        const divArea = contentEl.createEl("div")
        const divHeader = contentEl.createEl("div")
        const divDesc = contentEl.createEl("div")
        const divAutors = contentEl.createEl("div")
        const divKeyWords = contentEl.createEl("div")

        const style = {
            padding:'10px',
            display:"flex",
            gap:"10px",
            alignItems:"center"
        }

        divNome.setCssStyles(style)
        divArea.setCssStyles(style)
        divHeader.setCssStyles(style)
        divDesc.setCssStyles(style)
        divAutors.setCssStyles(style)
        divKeyWords.setCssStyles(style)

        divNome.createEl("label", {"for":"nome", "text":"Digite o nome"})
        const nome = divNome.createEl('input', { type: 'text', placeholder: 'Nome do blog post', "id":"nome"})
        divArea.createEl("label", {"for":"area", "text":"Digite a área do blog"})
        const area = divArea.createEl('input', { type: 'text', placeholder: 'Área do blog post', id:"area"});
        divHeader.createEl("label", {"for":"header-img", "text":"Digite o caminho do header img"})
        const header = divHeader.createEl('input', { type: 'text', placeholder: 'Header do blog post caminho', id:"header-img"});
        divDesc.createEl("label", {"for":"description", "text":"Digite a meta description"})
        const desc = divDesc.createEl('input', { type: 'text', placeholder: 'Coloque aqui um resumo da página', id:"description"});
        divAutors.createEl("label", {"for":"autors", "text":"Digite os autores da página"})
        const autors = divAutors.createEl('input', { type: 'text', placeholder: 'Coloque aqui o autor da página', id:"autors"});
        divKeyWords.createEl("label", {"for":"keywords", "text":"Digite as palavras chaves de termos de busca"})
        const keywords = divKeyWords.createEl('input', { type: 'text', placeholder: 'Digite as palavras chaves de termos de busca', id:"keywords"});

        const botaoEnviar = contentEl.createEl('button', { text: 'Enviar' });
        botaoEnviar.onclick = () => {
            const nomeValue = nome.value;
            const areaValue = area.value;
            const headerValue = header.value;
            const descValue = desc.value;
            const autorsValue = autors.value;
            const keywordsValue = keywords.value;

            try {
                const postNewBlog  = require(path.join(this.pathPlugin, "funcs.js"));
                postNewBlog(nomeValue, areaValue, headerValue, this.specificFolder, path.join(this.specificFolder, this.nameFile), this.pathPlugin, descValue, autorsValue, keywordsValue);
                new Notice("Blog publicado");
            } catch(e) {
                new Notice(`Erro ao publicar: ${e}`);
            }
        }
    }
}