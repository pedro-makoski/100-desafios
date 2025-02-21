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

const HEADER_NAEME = "header";
const WRAP_NAME = "wrap";
const LIST_ORDER_NAME = "ol";
const LIST_NO_ORDER_NAME = "ul";
const NORMAL_TEXT = "paragrafo";
const BLOCK_QUOTE_NAME = "citation"

class MD {
    constructor(text) {
        this.text = text;
        this.texts = new Texts(this.text);
        this.linesMod = this.texts.listOfLines("\n");
        this.allLines = this.linesMod.removeItemsInLines(["\n", "\r"]);
        this.identifierLines = [];
    }

    emptyStringIsBr(line, index) {
        const EMPTY_STRING = ''

        if(line === EMPTY_STRING) {
            this.identifierLines[index] = WRAP_NAME;
            return '<br>'
        }

        return line; 
    };

    putHeaders(line, index, min, max, identifier) {
        const headerSet = new RegExp(`^(${identifier}{${min},${max}})\\s([\\s\\S]*)$`);
        const hashtags = line.match(headerSet);
        if(hashtags) {
            const hashtagsList = hashtags[1].split("");
            const text = hashtags[2];
            this.identifierLines[index] = HEADER_NAEME;
            return `<h${hashtagsList.length}>${text}</h${hashtagsList.length}>`;
        }

        return line 
    }

    putBold(line, idx, boldTagOpen, boldTagClose) {
        const boldFormat = /\*{2}(.+?)\*{2}/g;

        return line.replace(boldFormat, (_, content) => {
            this.identifierLines[idx] = this.identifierLines[idx] ?? NORMAL_TEXT
            return boldTagOpen + content + boldTagClose;
        });
    }

    putItalic(line, idx, italicTagOpen, italicTagClose) {
        const italicFormat = /\*(.*?)\*/g;

        return line.replace(italicFormat, (_, content) => {
            this.identifierLines[idx] = this.identifierLines[idx] ?? NORMAL_TEXT
            return italicTagOpen + content + italicTagClose;
        });
    }

    doFuncionsAboutLine(functionsWithLineAndIndexParamAndReturnValue) {
        functionsWithLineAndIndexParamAndReturnValue.map((funcao) => {
            this.allLines.map((_, idx) => {
                this.allLines[idx] = funcao(this.allLines[idx], idx)
            })
        })

        return this.allLines
    }

    doLists(pattern, line, index, openListTag, closeListTag, openPosElement, closePoselement, id, doTabulations) {
        const match = line.match(pattern);
        if(match) {
            this.identifierLines[index] = id;
            const isFirst = this.identifierLines[index-1] != id || index === 0
            const wrap = doTabulations ? "\n" : ""
            let newLine =  `${doTabulations ? "\t" : ""}${isFirst ? openListTag+wrap : ""}${openPosElement}${match[1]}${closePoselement}`;
            
            let nextElement = this.allLines[index+1]
            if(nextElement) {
                const matchNextElement = nextElement.match(pattern)
                if(!matchNextElement) {
                    if(doTabulations) newLine += "\n"
                    newLine+=closeListTag
                }
            }
            return newLine
        }

        return line 
    }

    doNoOrdenerdList(line, index, openListTag, closeListTag, openPosElement, closePoselement) {
        const pattern = /^-\s([\s\S]*)/
        return this.doLists(pattern, line, index, openListTag, closeListTag, openPosElement, closePoselement, LIST_NO_ORDER_NAME, true)
    }

    doOrderedLists(line, index, openListTag, closeListTag, openPosElement, closePoselement) {
        const pattern = /^\d+\.\s([\s\S]*)/
        return this.doLists(pattern, line, index, openListTag, closeListTag, openPosElement, closePoselement, LIST_ORDER_NAME, true)
    }

    doBlockQuote(line, index, openBlockQuoteTag, closeBlockQuoteTag) {
        const pattern = /^>([\s\S]*)/
        return this.doLists(pattern, line, index, "", "",openBlockQuoteTag, closeBlockQuoteTag, BLOCK_QUOTE_NAME, false)
    }

    doTable(line, index) {
        const patternObrigatory = /(\|\s-{3,}\s(?=\|))/g
        const patternHeaderAndBody = /\|\s([^\|]+)\s(?=\|)/g
        const match = [...line.matchAll(patternObrigatory)];
        console.log(match)
        if(match && index !== 0) {
            const before = this.allLines[index-1]
            const matchBefore = [...before.matchAll(patternHeaderAndBody)].map(value => value[1]);
            // console.log(patternHeaderAndBody, before)
            if(matchBefore.length > 0) {
                if(matchBefore.length === match.length) {
                }
            }
        }

        return line 
    }

    convertTOHTML() {
        this.allLines = this.doFuncionsAboutLine([
            (l, i) => this.emptyStringIsBr(l, i),
            (l, i) => this.putHeaders(l, i, 1, 6, "#"),
            (l, i) => this.putBold(l, i, "<strong>", "</strong>"),
            (l, i) => this.putItalic(l, i, "<em>", "</em>"),
            (l, i) => this.doNoOrdenerdList(l, i, "<ul>", "</ul>", "<li>", "<li>"),
            (l, i) => this.doOrderedLists(l, i, "<ol>", "</ol>", "<li>", "<li>"),
            (l, i) => this.doBlockQuote(l, i, "<blockquote>", "</blockquote>"),
            (l, i) => this.doTable(l, i)
        ]);

        console.log(this.identifierLines)

        return this.allLines; 
    }
}

export default MD;