function getRandomNumberInt(min:number, max:number):number {
    return Math.floor((Math.random()*(max-min+1))+min)
}

const alphabet: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

const MAX_CICLES:number = 100

const NUMBER_NAME = "number"
const CHAR_NAME = "char"
const SIMBOL_NAME = "simbol"

class Password {
    allChars: ListaDeStringOuInteiros
    rules: Rules
    repeatableValues: object 
    quantChars: number
    quantNumbers: number
    PassWordActual: string
    quantSimbols: number
    partsEnviased: string[]
    valuesEnviased: ListaDeStringOuInteiros

    constructor(rules: Rules) {
        this.allChars = [...rules.AceeptedChars, ...rules.AceeptedNumbers, ...rules.AccepetedSimbols]
        this.rules = rules
        this.repeatableValues = {}
        this.quantChars = 0; 
        this.quantNumbers = 0;
        this.quantSimbols = 0;  
        this.partsEnviased = [];
        this.valuesEnviased = [];

        if(this.allChars.length === 0) {
            throw new Error("Nenhum caractere disponivel");
        }
    }

    changeAllChars(password: string) {
        this.allChars = []
        if(!this.partsEnviased.includes(NUMBER_NAME)) {
            this.allChars.push(...this.rules.AceeptedNumbers)
        }
        if(!this.partsEnviased.includes(CHAR_NAME)) {
            this.allChars.push(...this.rules.AceeptedChars)
        }
        if(!this.partsEnviased.includes(SIMBOL_NAME)) {
            this.allChars.push(...this.rules.AccepetedSimbols)
        }
        
        this.allChars = this.allChars.filter((value) => !this.valuesEnviased.includes(value) && !this.valuesEnviased.includes(value.toString()))
        
        if(this.allChars.length === 0 && password.length < this.rules.QuantDigit) {
            throw new Error("A quantidade que cada elemento pode ter é incopátivel com a quantidade total")
        }
    }

    verifyChar(char: string, allText:string, actualPos: number): boolean {
        this.repeatableValues[char] = (this.repeatableValues[char] ?? 0)+1;
        if(this.repeatableValues[char] > this.rules.quantRepat && this.rules.quantRepat !== -1) {
            this.valuesEnviased.push(char)  
            this.changeAllChars(allText)
            return false
        }
        
        let beforeValue:string = allText[actualPos-1] as string
        let numberChar:number = parseInt(char)
        if(beforeValue) {
            if(!this.rules.canRepeatBeforeValue) {
                if(beforeValue === char) {
                    return false
                }
            }

            if(!this.rules.canSequency) {
                let beforeNumberChar: number = parseInt(beforeValue)

                if(!isNaN(numberChar) && !isNaN(beforeNumberChar)) {
                    if(beforeNumberChar+1 === numberChar) {
                        return false 
                    }
                } else if(isNaN(numberChar) && isNaN(beforeNumberChar)) {
                    let numberCharEquivalent:number = alphabet.indexOf(char)
                    let beforeNumberCharEquivalent:number = alphabet.indexOf(beforeValue)

                    if(numberCharEquivalent !== -1 && beforeNumberCharEquivalent !== -1) {
                        if(beforeNumberCharEquivalent+1 === numberCharEquivalent) {
                            return false 
                        }
                    }
                }                
            }
        }

        if(!isNaN(numberChar)) {
            this.quantNumbers++

            if(this.quantNumbers > this.rules.quantNumbersThatCan && this.rules.quantNumbersThatCan !== -1) {
                if(!this.partsEnviased.includes(NUMBER_NAME)) {
                    this.valuesEnviased.push(char)
                    this.changeAllChars(allText)
                }

                return false
            }

            return true 
        }

        if(this.rules.AccepetedSimbols.includes(char)) {
            this.quantSimbols++
        } else {
            this.quantChars ++
        }
        
        if(this.quantChars > this.rules.quantCharsThatCan && this.rules.quantCharsThatCan !== -1 && !this.partsEnviased.includes(CHAR_NAME)) {
            this.partsEnviased.push(CHAR_NAME)
            this.changeAllChars(allText)
            return false; 
        }
        if(this.quantSimbols > this.rules.QuantSimbolsThatCan && this.rules.QuantSimbolsThatCan !== -1 && !this.partsEnviased.includes(SIMBOL_NAME)) {
            this.partsEnviased.push(SIMBOL_NAME)
            this.changeAllChars(allText)
            return false; 
        }

        return true 
    }

    genatePassword() : string {
        let password: string = ""

        for(let i:number = 0; i < this.rules.QuantDigit; i++) {
            let value:string;
            let cicles = 0; 
            let randomNumber:number 
            do {
                let init = 0; 
                let end = this.allChars.length-1;
                randomNumber = getRandomNumberInt(init, end)
                
                value = this.allChars[randomNumber]?.toString()
                if(this.rules.upperForm === UpperCases.CAN_VARIATE) {
                    let stateRandom = getRandomNumberInt(0, 1)
                    value = stateRandom === 0 ? value.toLowerCase() : value.toUpperCase()
                }

                if(this.rules.upperForm === UpperCases.ALL_UPPER) {
                    value = value.toUpperCase()
                }

                if(this.rules.upperForm === UpperCases.ALL_LOWER) {
                    value = value.toLowerCase()
                }

                if(!value) {
                    throw new Error("Falta de elementos possíveis")
                }
                
                cicles += 1
                if(cicles >= MAX_CICLES) {
                    throw new Error("A quantidade de ciclos passou dos limites, tente novamente, ou restrinja menos as regras. Desculpa o incomodo")
                }
            } while(!this.verifyChar(value.toLowerCase(), password, i))

            password += value
        }

        this.PassWordActual = password
        return password
    }
}

function escapeRegExp(texto: string): string {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
}

function getPosOfElements(text: string, keys: string[]): {[key: string]: number[]} {
    const res: {[key: string]: number[]} = {}
    keys.forEach(key => {
        const poses = []

        Array.from(text).forEach((char, index) => {
            if(char === key) {
                poses.push(index)
            }
        })

        res[key] = poses
    })

    return res 
}

function generateNewPasswordOnOtherBase(baseText: string, changeSubstituir: KeyValueSubstituir, originals: KeyValueSubstituir):string {
    let password = baseText

    const keys = Object.keys(changeSubstituir)
    const values = Object.values(changeSubstituir)

    const placesToReplace = getPosOfElements(password, Object.keys(originals))

    keys.forEach((key, index) => {
        password = password.replace(key, values[index])
    })

    const keysChangeNext = Object.keys(placesToReplace)
    const valuesChangeNext = Object.values(placesToReplace)

    const arrPassword = Array.from(password)
    keysChangeNext.forEach((key, index) => {
        const poses = valuesChangeNext[index]
        poses.forEach((pos) => {
            arrPassword[pos] = Object.values(originals)[index]
        })
    })

    password = arrPassword.join("")

    return password
}

const SILABAS = ["a", "e", "i", "o", "u"]
const CONSOANTES = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z"]
const NUMEROS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

function getNothingAndChangeForRandomPass(actual: KeyValueSubstituir, rules: Rules, min: number, max:number): KeyValueSubstituir {
    const newActual = {...actual}
    const newRules = {...rules}

    const keys = Object.keys(actual)
    const values = Object.values(actual) 

    values.forEach((value, index) => {
        if(value === "") {
            const length = getRandomNumberInt(min, max)
            newRules.QuantDigit = length

            const code = new Password(newRules)
            newActual[keys[index]] = code.genatePassword()
        }
    })

    return newActual
}

function genRandomKeyValue(changeSilabas: boolean, changeConsoantes: boolean, changeNumeros: boolean, rules: Rules, actual: KeyValueSubstituir, min: number, max:number): KeyValueSubstituir {
    const res: KeyValueSubstituir = {...getNothingAndChangeForRandomPass(actual, rules, min, max)}
    const newRules: Rules = {...rules}

    const MIN_LENGTH_TO_EACH = min 
    const MAX_LENGTH_TO_EACH = max 

    if(changeSilabas) {
       SILABAS.forEach((silabaNormal) => {
        const silabasAll = [silabaNormal.toLowerCase(), silabaNormal.toUpperCase()]
        silabasAll.forEach((silaba) => {
            const length = getRandomNumberInt(MIN_LENGTH_TO_EACH, MAX_LENGTH_TO_EACH)
            newRules.QuantDigit = length

            const code = new Password(newRules)
            if(!res[silaba]) {
                res[silaba] = code.genatePassword()
            }
        })
       }) 
    }

    if(changeConsoantes) {
       CONSOANTES.forEach((consoanteNormal) => {
        const consoanteAll = [consoanteNormal.toLowerCase(), consoanteNormal.toUpperCase()]
        consoanteAll.forEach((consoante) => {
            const length = getRandomNumberInt(MIN_LENGTH_TO_EACH, MAX_LENGTH_TO_EACH)
            newRules.QuantDigit = length

            const code = new Password(newRules)
            if(!res[consoante]) {
                res[consoante] = code.genatePassword()
            }
        })
       }) 
    }

    if(changeNumeros) {
       NUMEROS.forEach((numberAll) => {
        const length = getRandomNumberInt(MIN_LENGTH_TO_EACH, MAX_LENGTH_TO_EACH)
        newRules.QuantDigit = length

        const code = new Password(newRules)
        if(!res[numberAll]) {
            res[numberAll] = code.genatePassword()
        }
       }) 
    }


    return res 
}