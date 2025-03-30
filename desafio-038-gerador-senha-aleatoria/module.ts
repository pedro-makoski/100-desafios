function getRandomNumberInt(min:number, max:number):number {
    return Math.floor((Math.random()*(max-min))+min)
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

    constructor(rules: Rules) {
        this.allChars = [...rules.AceeptedChars, ...rules.AceeptedNumbers, ...rules.AccepetedSimbols]
        this.rules = rules
        this.repeatableValues = {}
        this.quantChars = 0; 
        this.quantNumbers = 0;
        this.quantSimbols = 0;  
        this.partsEnviased = [];
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
        if(this.allChars.length === 0 && password.length < this.rules.QuantDigit) {
            console.log(password, this.allChars, this.partsEnviased)
            throw new Error("A quantidade que cada elmento pode ter é incopátivel com a quantidade total")
        }
    }

    verifyChar(char: string, allText:string, actualPos: number): boolean {
        this.repeatableValues[char] = (this.repeatableValues[char] ?? 0)+1
        if(this.repeatableValues[char] >= this.rules.quantRepat && this.rules.quantRepat !== -1) {
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
            if(this.quantNumbers > this.rules.quantNumbersThatCan && this.rules.quantCharsThatCan !== -1 && !this.partsEnviased.includes(NUMBER_NAME)) {
                this.partsEnviased.push(NUMBER_NAME)
                this.changeAllChars(allText)
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

                if(!value) {
                    throw new Error("Falta de elementos possíveis")
                }
                
                cicles += 1
                if(cicles >= MAX_CICLES) {
                    throw new Error("A quantidade de ciclos passou dos limites, tente novamente, ou restrinja menos as regras. Desculpa o incomodo")
                }
            } while(!this.verifyChar(value, password, i))

            password += value
        }

        this.PassWordActual = password
        return password
    }
}