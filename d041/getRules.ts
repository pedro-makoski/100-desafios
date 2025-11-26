const elementInputs: { [key: string]: (HTMLInputElement) } = {
    canRepeat: new HTMLInputElement(),
    quantTotal: new HTMLInputElement(),
    isSequenci: new HTMLInputElement(),
    quantNumber: new HTMLInputElement(),
    quantChar: new HTMLInputElement(),
    quantSimbols: new HTMLInputElement(),
    allNumbers: new HTMLInputElement(),
    allChars: new HTMLInputElement(),
    allSimbols:new HTMLInputElement(),
    quantCanRepeatAValue: new HTMLInputElement(),
    upperCases: new HTMLInputElement(),
    lowerCases: new HTMLInputElement()
}

const none = "-"
const MAX_NUMBER = 2000
const MAX_DIGIT = 10
const MAX_QUANT_ALPHABET = alphabet.length

function getRange(elements: string[], numbers: Set<number>, maxDigit: number): number[] {
    for(let i = 0; i < elements.length; i++) {
        const beforeNumber = parseInt(elements[i-1])
        const actualNumber = parseInt(elements[i])

        if(beforeNumber > actualNumber) {
            continue;
        }

        for(let j = beforeNumber; j <= actualNumber; j++) {
            if(j >= maxDigit) {
                break; 
            }
            numbers.add(j)
        }
    }

    return Array.from(numbers)
}

function getNumbers(intervalo: string, maxDigit: number): number[] {
    const numbers = new Set<number>()
    const intervaloSemEspacos = intervalo.replaceAll(" ", "")
    const elements = intervaloSemEspacos.split(",")

    elements.forEach((element) => {
        const parts = element.split("-")
        if(parts.length === 1) {
            let number = parseInt(parts[0])
            if(number >= maxDigit) {
                return; 
            }

            numbers.add(number)
            return;
        }

        getRange(parts, numbers, maxDigit)
    })

    return Array.from(numbers)
}

function getChars(text: string): string[] {
    const texts = new Set<string>()

    let numberForm = text
    alphabet.forEach((letter, index) => {
        numberForm = numberForm.replaceAll(letter, index.toString())
    })
    
    const numbers = getNumbers(numberForm, MAX_QUANT_ALPHABET)
    numbers.forEach((number) => {
        texts.add(alphabet[number])
    })

    return Array.from(texts)
}

function getRules(): Rules {
    const valueTotal: number = elementInputs.quantTotal.valueAsNumber
    if(valueTotal > MAX_NUMBER) {
        throw new Error("Valor muito grande, insira algo menor")
    }

    const quants:{[key: string]: number} = {
        chars: parseInt(elementInputs.quantChar.value),
        numbers: parseInt(elementInputs.quantNumber.value),
        simbolos: parseInt(elementInputs.quantSimbols.value),
        repeatAll: parseInt(elementInputs.quantCanRepeatAValue.value)
    }

    const simbolos = Array.from(elementInputs.allSimbols.value)

    const valueNumbers = elementInputs.allNumbers.value
    const valueChars = elementInputs.allChars.value

    let allNumbers = valueNumbers === none  ? [] : (valueNumbers.trim() === "" ?  NUMEROS : getNumbers(valueNumbers, MAX_DIGIT))
    let allChars = valueChars === none ? [] : (valueChars.trim() === "" ? alphabet : getChars(valueChars))

    const isUpperCasesChecked = elementInputs.upperCases.checked
    const isLowerCasesChecked = elementInputs.lowerCases.checked
    const upperCases: UpperCases = isLowerCasesChecked && isUpperCasesChecked ? UpperCases.CAN_VARIATE : 
        isLowerCasesChecked ? UpperCases.ALL_LOWER : UpperCases.ALL_UPPER

    const rules: Rules = {
        AccepetedSimbols: elementInputs.allSimbols.value === none ? [] : (simbolos.length === 0 ? ["!", "@", "#", "$", "%", "&", "*", "(", ")", "-", "_", "+", "=", "/", ";", ":", "<", ">", `'`] : simbolos),
        AceeptedChars: allChars,
        AceeptedNumbers: allNumbers,
        canRepeatBeforeValue: elementInputs.isSequenci.checked,
        canSequency: elementInputs.canRepeat.checked,
        quantCharsThatCan: isNaN(quants.chars) ? -1 : quants.chars, 
        quantNumbersThatCan:isNaN(quants.numbers) ? -1 : quants.numbers,
        QuantSimbolsThatCan: isNaN(quants.simbolos) ? -1 : quants.simbolos,
        QuantDigit: valueTotal,
        quantRepat: isNaN(quants.repeatAll) ? -1 : quants.repeatAll,
        upperForm: upperCases
    }

    return rules
}

function getKeyAndValuesOfTwoColumnsTable(table: HTMLTableElement): KeyValueSubstituir {
    const keyValues: KeyValueSubstituir = {}

    const POS_OF_KEY = 0
    const POS_OF_VALUE = 1

    const trs = table.querySelectorAll("tr")
    trs.forEach((tr) => {
        const tds = tr.querySelectorAll("td")
        if(tds.length >= 2) {
            const key = tds[POS_OF_KEY].innerText
            const value = tds[POS_OF_VALUE].innerText

            if(value !== "") {
                keyValues[key] = value
            }
        }
    });

    return keyValues
}

const table = document.getElementById("table-key-value") as HTMLTableElement

function getRulesAndSubstituicao(): [KeyValueSubstituir, Rules, ChangeWhat, number, number, KeyValueSubstituir] {
    const infosToRules = {
        upperCases: document.getElementById("is-maiusculas-change-mode") as HTMLInputElement,
        lowerCases: document.getElementById("is-minsculas-change-mode") as HTMLInputElement
    }

    const isUpperCasesChecked = infosToRules.upperCases.checked
    const isLowerCasesChecked = infosToRules.lowerCases.checked
    const upperCases: UpperCases = isLowerCasesChecked && isUpperCasesChecked ? UpperCases.CAN_VARIATE : 
        isLowerCasesChecked ? UpperCases.ALL_LOWER : UpperCases.ALL_UPPER

    const rules: Rules = {
        AccepetedSimbols: ["!", "@", "#", "$", "%", "&", "*", "(", ")", "-", "_", "+", "=", "/", ";", ":", "<", ">", `'`],
        AceeptedChars: alphabet,
        AceeptedNumbers: NUMEROS,
        canRepeatBeforeValue: elementInputs.isSequenci.checked,
        canSequency: elementInputs.canRepeat.checked,
        quantCharsThatCan: -1, 
        quantNumbersThatCan: -1,
        QuantSimbolsThatCan: -1,
        QuantDigit: -1,
        quantRepat: -1,
        upperForm: upperCases
    }
    
    const keyValue: KeyValueSubstituir = {...getKeyAndValuesOfTwoColumnsTable(table)}
    const onlySaved = {...keyValue}

    const canSilaba = document.getElementById("can-silaba") as HTMLInputElement
    const canCosoante = document.getElementById("can-consoante") as HTMLInputElement
    const canNumero = document.getElementById("can-numero") as HTMLInputElement

    const changeWhat: ChangeWhat = {
        silabas: canSilaba.checked,
        consoantes: canCosoante.checked,
        numeros: canNumero.checked 
    }

    const minValue = document.getElementById("min-value-change") as HTMLInputElement
    const maxValue = document.getElementById("max-value-change") as HTMLInputElement

    return [keyValue, rules, changeWhat, minValue.valueAsNumber, maxValue.valueAsNumber, onlySaved]

}