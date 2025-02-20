class Texts {
    constructor(text) {
        this.text = text;
    }

    listOfLines(end) {
        const lines = [];

        let actual = [];
        Array.from(this.text).map(caracter => {
            if(caracter === end) {
                const text = actual.join("");
                actual = []; 
                lines.push(text);
            }

            actual.push(caracter)
        });

        return {
            lines:lines,
            removeItemsInLines: (elements) => {
                const newLines = lines.map((linha) => {
                    const array = Array.from(linha).filter((caracter) => !elements.includes(caracter));
                    return array.join("");
                })

                return newLines;
            }
        }
    }
}

class MD {
    constructor(text) {
        this.text = text;
        this.texts = new Texts(this.text);
        this.linesMod = this.texts.listOfLines("\n");
        this.allLines = this.linesMod.removeItemsInLines(["\n", "\r"]);
    }

    emptyStringIsBr() {
        const EMPTY_STRING = ''

        this.allLines = this.allLines.map((line) => {
            if(line === EMPTY_STRING) {
                return '<br>'
            }

            return line; 
        });
    };

    putHeaders(min, max, identifier) {
        const headerSet = new RegExp(`^(${identifier}{${min},${max}})\\s([\\s\\S]*)$`);
        this.allLines = this.allLines.map((line) => {
            const hashtags = line.match(headerSet);
            if(hashtags) {
                const hashtagsList = hashtags[1].split("");
                const text = hashtags[2]
                return `<h${hashtagsList.length}>${text}</h${hashtagsList.length}>`;
            }

            return line 
        })
    }

    putBoldAndItalic(boldTagOpen, boldTagClose, italicTagOpen, italicTagClose) {
        const boldFormat = /\*{2}(.+?)\*{2}/g;
        const italicFormat = /\*(.*?)\*/g;

        this.allLines = this.allLines.map((line) => {
            let newString = line.replace(boldFormat, (_, content) => {
                return boldTagOpen + content + boldTagClose;
            });
            newString = newString.replace(italicFormat, (_, content) => {
                return italicTagOpen + content + italicTagClose;
            });
            return newString;
        });
    }

    convertTOHTML() {
        this.emptyStringIsBr()
        this.putHeaders(1, 6, "#")
        this.putBoldAndItalic("<strong>", "</strong>", "<em>", "</em>"); 
        return this.allLines; 
    }
}

export default MD;