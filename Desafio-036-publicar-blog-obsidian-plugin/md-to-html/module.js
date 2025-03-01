class Texts {
    constructor(text) {
        this.text = text;
    }

    listOfLines(end) {
        const lines = [];

        let actual = [];
        let array = Array.from(this.text)
        array.push(" ")
        array.map((caracter, index) => {
            if(caracter !== end) {
                actual.push(caracter)
            }

            if(caracter === end || index === array.length-1) {
                const text = actual.join("");
                actual = []; 
                lines.push(text);
            }
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
const LIST_NO_ORDER_NAME = "ul"
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
        this.identifierLinesIndicatedLists = {};
        this.posOfPartOfTableToExclude = [];
        this.openIdentControlLists = {}
        this.openIdentControlListsWithTagCloseValue = {}
    }

    emptyStringIsBr(line, index) {
        const EMPTY_STRING = ''

        if(line === EMPTY_STRING) {
            this.identifierLines[index] = WRAP_NAME;
            // this.posOfPartOfTableToExclude.push(index)
            return `<br>`
        }

        return line; 
    };

    putHeaders(line, index, min, max, identifier) {
        const headerSet = new RegExp(`^(${identifier}{${min},${max}})\\s([\\s\\S]*)$`);
        const hashtags = line.match(headerSet);
        if(hashtags) {
            const hashtagsList = hashtags[1].split("");
            const text = hashtags[2];
            this.identifierLines[index] = `${HEADER_NAEME}-${hashtagsList.length}`;
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

        return this.putItalicOtherForm(line, idx, italicTagOpen, italicTagClose).replace(italicFormat, (_, content) => {
            this.identifierLines[idx] = this.identifierLines[idx] ?? NORMAL_TEXT
            return italicTagOpen + content + italicTagClose;
        });
    }

    putDel(line, idx, delTagOpen, delTagClose) {
        const delFormat = /~~(.*?)~~/g;

        return line.replace(delFormat, (_, content) => {
            this.identifierLines[idx] = this.identifierLines[idx] ?? NORMAL_TEXT
            return delTagOpen + content + delTagClose;
        });
    }

    putItalicOtherForm(line, idx, italicTagOpen, italicTagClose) {
        const italicFormat = /__(.*?)__/g;

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
        this.allLines.map((_, idx) => {
            functionsWithLineAndIndexParamAndReturnValue.map((funcao) => {
                this.allLines[idx] = funcao(this.allLines[idx], idx)
            })
        })

        return this.allLines
    }

    doLists(pattern, line, index, openListTag, closeListTag, openPosElement, closePoselement, id, indexOfContent) {
        const match = line.match(pattern);
        if(match) {
            this.identifierLines[index] = id;
            const isFirst = ((this.identifierLines[index-1] != id || index === 0))
            let newLine =  `${isFirst ? openListTag : ""}${openPosElement}${match[indexOfContent]}${closePoselement}`;
            
            let nextElement = this.allLines[index+1]
            if(nextElement || nextElement === "") {
                const matchNextElement = nextElement.match(pattern)
                if(!matchNextElement) {
                    newLine+=closeListTag
                }
            }
            return newLine
        }

        return line 
    }

    closeAllLess(value) {
        if(!value && value !== 0) {
            return ""
        }

        const keys = Object.keys(this.openIdentControlListsWithTagCloseValue)
        const values = Object.values(this.openIdentControlListsWithTagCloseValue)

        let closes = "";
        values.map((valueNow, idx) => {
            if(this.openIdentControlLists[keys[idx]]) {
                if(value <= keys[idx]) {
                    closes += valueNow
                    this.openIdentControlLists[keys[idx]] = false
                }
            }
        }) 

        return closes;
    }

    closeAll() {
        const keys = Object.keys(this.openIdentControlListsWithTagCloseValue)
        const values = Object.values(this.openIdentControlListsWithTagCloseValue)

        let closes = ""
        values.map((valueNow, idx) => {
            if(this.openIdentControlLists[keys[idx]]) {
                closes += valueNow
                this.openIdentControlLists[keys[idx]] = false
            }
        })

        return closes
    }

    doListsWithTab(pattern, line, index, getOpenListTag, closeListTag, openPosElement, closePoselement, id, indexOfContent, otherPossiblePattern) {
        const match = line.match(pattern);
        if(match) {
            this.identifierLines[index] = id;
            this.identifierLinesIndicatedLists[index] = id;
            const isFirst = index === 0 || !this.openIdentControlLists[match[1].length] || this.identifierLines[index-1]!==id;
            let newLine =  `${isFirst ? getOpenListTag(match[2]) : ""}${openPosElement}${match[indexOfContent]}${closePoselement}`;
            if(isFirst) {
                this.openIdentControlLists[match[1].length] = true; 
                this.openIdentControlListsWithTagCloseValue[match[1].length] = closeListTag; 
            }
            
            let nextElement = this.allLines[index+1]
            if(nextElement || nextElement === "") {
                const matchNextElement = nextElement.match(pattern)
                const otherPossiblePatternMatch = nextElement.match(otherPossiblePattern);
                
                if(((!(matchNextElement || otherPossiblePatternMatch) || ((matchNextElement && match[1].length > matchNextElement[1].length)) || ((otherPossiblePatternMatch && match[1].length >= otherPossiblePatternMatch[1].length))) && this.openIdentControlLists[match[1].length])) {
                    this.openIdentControlLists[match[1].length] = false;
                    newLine+=closeListTag

                    if(!(matchNextElement || otherPossiblePatternMatch)) {
                        newLine+=this.closeAll()
                    }

                    if(otherPossiblePatternMatch) {
                        if((this.openIdentControlLists[otherPossiblePatternMatch[1].length])) {
                            newLine+=closeListTag 
                        }
                    }

                    if(((matchNextElement && match[1].length > matchNextElement[1].length))) {
                        newLine+=this.closeAllLess(matchNextElement[1].length)
                    } 
                    
                    if(((otherPossiblePatternMatch && match[1].length >= otherPossiblePatternMatch[1].length))) {
                        newLine+=this.closeAllLess(otherPossiblePatternMatch[1].length)
                    }
                }
            }
            return newLine
        }

        return line 
    }

    doNoOrdenerdList(line, index, openListTag, closeListTag, openPosElement, closePoselement) {
        const pattern = /^(\s*)-\s([\s\S]*)/
        const patternOl = /^(\s*)\d+\.\s([\s\S]*)/
        return this.doListsWithTab(pattern, line, index, () => `<ul>`, closeListTag, openPosElement, closePoselement, LIST_NO_ORDER_NAME, 2, patternOl, "</ol>", false)
    }

    doOrderedLists(line, index, openListTag, closeListTag, openPosElement, closePoselement) {
        const pattern = /^(\s*)(\d+)\.\s([\s\S]*)/
        const patternUl = /^(\s*)-\s([\s\S]*)/
        return this.doListsWithTab(pattern, line, index, (content) => {
            this.identifierLinesIndicatedLists[index] = content;
            return `<ol start="${content}">`
        }, closeListTag, openPosElement, closePoselement, LIST_ORDER_NAME, 3, patternUl, "</ul>", true)
    }

    doBlockQuote(line, index, openBlockQuoteTag, closeBlockQuoteTag) {
        const pattern = /^>([\s\S]*)/
        return this.doLists(pattern, line, index, "", "", openBlockQuoteTag, closeBlockQuoteTag, BLOCK_QUOTE_NAME, 1)
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
            if(nextLine || nextLine === "") {
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
        const pattern = /(?<!\!)\[([^\]]*)\]\(([\s\S]*)\)/
        const match = line.match(pattern);
        if(match && match?.length >= 2) {
            this.identifierLines[index] = LINK_NAME;
            return line.replace(pattern, (fullString, content, link) => `${tagLinkOpenWithoutCloseFirstPart} ${linkPlace}="${link}" rel="external" target="_blank">${content}${tagLinkClose}`)
        }

        return line 
    }
    
    putInternalLinks(line, index, tagLinkOpenWithoutCloseFirstPart, tagLinkClose, linkPlace) {
        const pattern = /(?<!\!)\[\[([\s\S]*?)(?:\|([\s\S]*))?\]\]/ 
        const match = line.match(pattern);
        if(match && match?.length >= 2) {
            this.identifierLines[index] = LINK_NAME;
            return line.replace(pattern, (fullString, link, content) => `${tagLinkOpenWithoutCloseFirstPart} ${linkPlace}="./${link}" rel="next" target="_blank">${content ?? link}${tagLinkClose}`)
        }

        return line 
    }

    putImgsExternal(line, index, tagImgOpenWithoutCloseFirstPart, srcPlace) {
        const pattern = /!\[([^\]]*)\]\(([\s\S]*)\)/
        const match = line.match(pattern);
        if(match && match?.length >= 2) {
            this.identifierLines[index] = IMG_NAME;
            return line.replace(pattern, (fullString, content, src) => `${tagImgOpenWithoutCloseFirstPart} ${srcPlace}="${src}" alt="${content}">`)
        }
        
        return line;
    }

    putImgsInternal(line, index, tagImgOpenWithoutCloseFirstPart, srcPlace) {
        const pattern = /!\[\[([\s\S]*?)(?:\|([\s\S]*))?\]\]/ 
        const match = line.match(pattern);
        if(match && match?.length >= 2) {
            this.identifierLines[index] = IMG_NAME;
            return line.replace(pattern, (fullString, src, content) => `${tagImgOpenWithoutCloseFirstPart} ${srcPlace}="./${src}" alt="${content ?? ""}">`)
        }

        return line 
    }

    putParagrafoWhereCan(line, index) {
        if((line[0] !== OPEN_TAG_STAND && !this.identifierLines[index]) || this.identifierLines[index] === NORMAL_TEXT || this.identifierLines[index] === LINK_NAME) {
            this.identifierLines[index] = NORMAL_TEXT;
            return `<p>${line}</p>`
        }

        return line 
    }

    convertTOHTML() {
        this.allLines = this.doFuncionsAboutLine([
            (l, i) => this.emptyStringIsBr(l, i),
            (l, i) => this.putBold(l, i, "<strong>", "</strong>"),
            (l, i) => this.putItalic(l, i, "<em>", "</em>"),
            (l, i) => this.putDel(l, i, "<del>", "</del>"),
            (l, i) => this.putCode(l, i, "<code>", "</code>"),
            (l, i) => this.putLinksExternal(l, i, "<a", "</a>", "href"),
            (l, i) => this.putInternalLinks(l, i, "<a", "</a>", "href"),
            (l, i) => this.putHeaders(l, i, 1, 6, "#"),
            (l, i) => this.putImgsExternal(l, i, "<img", "src"),
            (l, i) => this.putImgsInternal(l, i, "<img", "src"),
            (l, i) => this.doNoOrdenerdList(l, i, "<ul>", "</ul>", "<li>", "</li>"),
            (l, i) => this.doOrderedLists(l, i, "<ol>", "</ol>", "<li>", "</li>"),
            (l, i) => this.doBlockQuote(l, i, "<blockquote>", "</blockquote>"),
            (l, i) => this.doTable(l, i, `<div class="table"><table>`, "</table></div>", "<th>", "</th>", "<tr>", "</tr>", "<td>", "</td>"),
            (l, i) => this.doHr(l, i),
            (l, i) => this.doCodeBlock(l, i),
            (l, i) => this.doMathBlock(l, i),
            (l, i) => this.putParagrafoWhereCan(l, i)
        ]);

        this.removeElementsUnNecessari()

        const result = this.allLines.join("\n")

        return result; 
    }
}