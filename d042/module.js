class StringsConfig {
    constructor(text) {
        this.text = text;
        if(this.text) {
            this.arrayText = Array.from(this.text);
        }
    }

    inverterTexto() {
        const arrayFinal = [];

        if(this.arrayText) {
            for(let i = this.arrayText.length-1; i >= 0; i--) {
                arrayFinal.push(this.arrayText[i])
            }
        }

        return arrayFinal.join("")
    }

    capitalizar(doInpascalCase = false) {
        const arr = this.text.split(" ")
        return arr.map((text, index) => {
            return (doInpascalCase && index === 0 ? text[0].toLowerCase() : text[0].toUpperCase()) + text.substring(1).toLowerCase()
        }).join(" ")
    }

    alterarCaixa() {
        if(this.arrayText) {
            return this.arrayText.map((text) => {
                if(/[A-Z]/.test(text)) {
                    return text.toLowerCase()
                }

                if(/[a-z]/.test(text)) {
                    return text.toUpperCase()
                }

                return text
            }).join("")
        }

        return ""
    }

    alternar() {
        if(this.arrayText) {
            const posOfSpaces = (() => {
                const poses = []
                this.arrayText.forEach((letra, index) => {
                    if(letra === " ") {
                        poses.push(index)
                    }
                })

                return poses
            })() 

            const res =  this.arrayText.filter((el, index) => !posOfSpaces.includes(index)).map((letter, index) => {
                return index % 2 === 0 ? letter.toLowerCase() : letter.toUpperCase()
            })

            posOfSpaces.forEach(pos => {
                res.splice(pos, 0, " ")
            })

            return res.join("")
        }

        return ""
    }

    quantChars(withSpace = true) {
        return withSpace ? this.text.length : this.text.replaceAll(" ", "").length
    }

    quantPalavras() {
        return this.text.split(" ").filter((line) => line.replaceAll(" ", "").replaceAll("\n", "") !== "").length
    }

    quantLinhas(includeEmpty = true) {
        return includeEmpty ? this.text.split("\n").length : this.text.split("\n").filter((line) => line.replaceAll(" ", "").replaceAll("\n", "") !== "").length
    }

    quantFrases() {
        return this.text.split(/[\.\!\?](?!$|\n)|\n/).filter((line) => line.replaceAll(" ", "").replaceAll("\n", "") !== "")    .length
    }
}