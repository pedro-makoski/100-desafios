enum UpperCases {
    ALL_UPPER = "all-upper",
    ALL_LOWER = "all-lower",
    CAN_VARIATE = "can-variate"
}

type Rules = {
    AceeptedNumbers: number[]
    AceeptedChars: string[],
    AccepetedSimbols: string[]
    quantCharsThatCan: number,
    quantNumbersThatCan: number
    QuantDigit: number,
    QuantSimbolsThatCan: number,
    canSequency: boolean,
    quantRepat: number
    canRepeatBeforeValue: boolean
    upperForm: UpperCases 
}

type ChangeWhat = {
    silabas: boolean,
    consoantes: boolean,
    numeros: boolean
}

type StringOuInteiro = string | number
type ListaDeStringOuInteiros = StringOuInteiro[]
type KeyValueSubstituir = {[key: string]: string}