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
const BLOCK_QUOTE_NAME = "citation";
const TABLE_NAME = "table";
const TABLE_NAME_TO_EXCLUDE = "table-id";
const HR_NAME = "hr";
const CALC_OPEN_AND_MIDDLE = "$$"
const CALC_CLOSE = "$$$"
const CODE_OPEN_AND_MIDDLE = "open-code"
const CODE_CLOSE = "close-code"
const LINK_NAME = "linka"
const IMG_NAME = "img"
const OPEN_TAG_STAND = "<"

function matchElementsSobreposition(string, pattern, quantSobreposition) {
    const matches = [];
    let match;
    while((match = pattern.exec(string)) !== null) {
        matches.push(match[1]);
        pattern.lastIndex-=quantSobreposition;
    }

    return matches; 
}

class MD {
    constructor(text) {
        this.text = text;
        this.texts = new Texts(this.text);
        this.linesMod = this.texts.listOfLines("\n");
        this.allLines = this.linesMod.removeItemsInLines(["\n", "\r"]);
        this.identifierLines = [];
        this.posOfPartOfTableToExclude = [];
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
        const boldFormat = /\*{2}(.*?)\*{2}/g;

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

    putCode(line, idx, codeTagOpen, codeTagClose) {
        const codeFormat = /(`{1,2})(?!`)(.*?)\1(?!`)/g;

        return line.replace(codeFormat, (_, crase, content) => {
            this.identifierLines[idx] = this.identifierLines[idx] ?? NORMAL_TEXT
            return codeTagOpen + content + codeTagClose;
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

    doLists(pattern, line, index, openListTag, closeListTag, openPosElement, closePoselement, id) {
        const match = line.match(pattern);
        if(match) {
            this.identifierLines[index] = id;
            const isFirst = this.identifierLines[index-1] != id || index === 0
            let newLine =  `${isFirst ? openListTag : ""}${openPosElement}${match[1]}${closePoselement}`;
            
            let nextElement = this.allLines[index+1]
            if(nextElement) {
                const matchNextElement = nextElement.match(pattern)
                if(!matchNextElement) {
                    newLine+=closeListTag
                }
            }
            return newLine
        }

        return line 
    }

    doNoOrdenerdList(line, index, openListTag, closeListTag, openPosElement, closePoselement) {
        const pattern = /^-\s([\s\S]*)/
        return this.doLists(pattern, line, index, openListTag, closeListTag, openPosElement, closePoselement, LIST_NO_ORDER_NAME)
    }

    doOrderedLists(line, index, openListTag, closeListTag, openPosElement, closePoselement) {
        const pattern = /^\d+\.\s([\s\S]*)/
        return this.doLists(pattern, line, index, openListTag, closeListTag, openPosElement, closePoselement, LIST_ORDER_NAME)
    }

    doBlockQuote(line, index, openBlockQuoteTag, closeBlockQuoteTag) {
        const pattern = /^>([\s\S]*)/
        return this.doLists(pattern, line, index, "", "",openBlockQuoteTag, closeBlockQuoteTag, BLOCK_QUOTE_NAME, false)
    }

    doTable(line, index, openTagTable, closeTagTable, headerTagOpen, headerTagClose, lineTagOpen, lineTagClose, dataTagOpen, dataTagClose) {
        const patternObrigatory = /(\|\s-{3,}\s(?=\|))/g
        const patternHeaderAndBody = /\|\s([^\|]+)\s(?=\|)/g
        const match = matchElementsSobreposition(line, patternObrigatory, 1);
        if(match.length > 0 && index !== 0) {
            this.identifierLines[index] = TABLE_NAME_TO_EXCLUDE
            this.posOfPartOfTableToExclude.push(index);
            const before = this.allLines[index-1]
            const matchBefore = matchElementsSobreposition(before, patternHeaderAndBody, 1);
            if(matchBefore.length > 0) {
                if(matchBefore.length === match.length) {
                    this.identifierLines[index-1] = TABLE_NAME;
                    this.allLines[index-1] = openTagTable+lineTagOpen + matchBefore.map((element) => {
                        return headerTagOpen+element+headerTagClose;
                    }).join("") + lineTagClose
                }
            }

            return line
        }

        const matchBody = matchElementsSobreposition(line,patternHeaderAndBody, 1);
        if(matchBody.length > 0 && (this.identifierLines[index-1] === TABLE_NAME_TO_EXCLUDE || this.identifierLines[index-1] === TABLE_NAME)) {
            this.identifierLines[index] = TABLE_NAME;
            let result = lineTagOpen + matchBody.map((element) => {
                return dataTagOpen+element+dataTagClose;
            }).join("") + lineTagClose
            const nextLine = this.allLines[index+1];
            if(nextLine) {
                const matchNext = matchElementsSobreposition(nextLine, patternHeaderAndBody, 1);
                if(matchNext.length === 0) {
                    result+=closeTagTable
                }
            }

            return result 
        }

        return line 
    }

    doHr(line, index) {
        const pattern = /^-{3,}$/
        const match = line.match(pattern);
        if(match) {
            this.identifierLines[index] = HR_NAME
            return `<hr>`
        }
        return line 
    }

    removeElementsUnNecessari() {
        this.allLines = this.allLines.filter((_, pos) => !this.posOfPartOfTableToExclude.includes(pos))
    }

    doSectionOfSomething(line, index, tagOpenForTag, tagForCloseTag, id, idClose, pattern, patternToClose, takeFirstElementAsClassFunc) {
        const match = line.match(pattern);
        if(match && this.identifierLines[index-1] !== id) {
            this.identifierLines[index] = id;
            if(takeFirstElementAsClassFunc) {
                return takeFirstElementAsClassFunc(match[1]);
            }

            return tagOpenForTag;
        }

        const matchClose = line.match(patternToClose);
        if(matchClose && this.identifierLines[index-1] === id) {
            this.identifierLines[index] = idClose;
            return tagForCloseTag;
        }

        if(this.identifierLines[index-1] === id) {
            this.identifierLines[index] = id
            return `${line}`
        }

        return line; 
    }   

    doCodeBlock(line, index) {
        return this.doSectionOfSomething(line, index, "<pre>", "</pre>", CODE_OPEN_AND_MIDDLE, CODE_CLOSE, /^`{3}([\s\S]*)/, /^`{3}/, (element) => {
            if(element) {
                return `<pre class="code code-${element}">`
            }

            return "</pre>"
        })
    }

    doMathBlock(line, index) {
        return this.doSectionOfSomething(line, index, '<div class="math">', "</div>", CALC_OPEN_AND_MIDDLE, CALC_CLOSE, /^\${2}/, /^\${2}/, null)
    }

    putLinksExternal(line, index, tagLinkOpenWithoutCloseFirstPart, tagLinkClose, linkPlace) {
        const pattern = /^\[([\s\S]*)\]\(([\s\S]*)\)/ 
        const match = line.match(pattern);
        if(match && match?.length >= 2) {
            this.identifierLines[index] = LINK_NAME;
            return `${tagLinkOpenWithoutCloseFirstPart} ${linkPlace}="${match[2]}" rel="external">${match[1]}${tagLinkClose}`
        }

        return line 
    }
    
    putInternalLinks(line, index, tagLinkOpenWithoutCloseFirstPart, tagLinkClose, linkPlace) {
        const pattern = /^\[\[([\s\S]*?)(?:\|([\s\S]*))?\]\]/ 
        const match = line.match(pattern);
        if(match && match?.length >= 2) {
            this.identifierLines[index] = LINK_NAME;
            return `${tagLinkOpenWithoutCloseFirstPart} ${linkPlace}="${match[1]}" rel="next">${match[2] ?? match[1]}${tagLinkClose}`
        }

        return line 
    }

    putImgsExternal(line, index, tagImgOpenWithoutCloseFirstPart, srcPlace) {
        const pattern = /^!\[([\s\S]*)\]\(([\s\S]*)\)/ 
        const match = line.match(pattern);
        if(match && match?.length >= 2) {
            this.identifierLines[index] = IMG_NAME;
            return `${tagImgOpenWithoutCloseFirstPart} ${srcPlace}="${match[2]}" alt="${match[1]}">`
        }
        
        return line;
    }

    putImgsInternal(line, index, tagImgOpenWithoutCloseFirstPart, srcPlace) {
        const pattern = /^!\[\[([\s\S]*?)(?:\|([\s\S]*))?\]\]/ 
        const match = line.match(pattern);
        if(match && match?.length >= 2) {
            this.identifierLines[index] = IMG_NAME;
            return `${tagImgOpenWithoutCloseFirstPart} ${srcPlace}="${match[1]}" alt="${match[2] ?? ""}">`
        }

        return line 
    }

    putParagrafoWhereCan(line, index) {
        if((line[0] !== OPEN_TAG_STAND && !this.identifierLines[index]) || this.identifierLines[index] === NORMAL_TEXT) {
            this.identifierLines[index] = NORMAL_TEXT;
            return `<p>${line}</p>`
        }

        return line 
    }

    convertTOHTML() {
        this.allLines = this.doFuncionsAboutLine([
            (l, i) => this.emptyStringIsBr(l, i),
            (l, i) => this.putHeaders(l, i, 1, 6, "#"),
            (l, i) => this.putBold(l, i, "<strong>", "</strong>"),
            (l, i) => this.putItalic(l, i, "<em>", "</em>"),
            (l, i) => this.putCode(l, i, "<code>", "</code>"),
            (l, i) => this.doNoOrdenerdList(l, i, "<ul>", "</ul>", "<li>", "<li>"),
            (l, i) => this.doOrderedLists(l, i, "<ol>", "</ol>", "<li>", "<li>"),
            (l, i) => this.doBlockQuote(l, i, "<blockquote>", "</blockquote>"),
            (l, i) => this.doTable(l, i, "<table>", "</table>", "<th>", "</th>", "<tr>", "</tr>", "<td>", "</td>"),
            (l, i) => this.doHr(l, i),
            (l, i) => this.doCodeBlock(l, i),
            (l, i) => this.doMathBlock(l, i),
            (l, i) => this.putLinksExternal(l, i, "<a", "</a>", "href"),
            (l, i) => this.putInternalLinks(l, i, "<a", "</a>", "href"),
            (l, i) => this.putImgsExternal(l, i, "<img", "src"),
            (l, i) => this.putImgsInternal(l, i, "<img", "src"),
            (l, i) => this.putParagrafoWhereCan(l, i)
        ]);

        this.removeElementsUnNecessari()

        const result = this.allLines.join("\n")

        return result; 
    }
}



export default MD;