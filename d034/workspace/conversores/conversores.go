package conversores

import (
	"numeros-romanos/decimals"
	"numeros-romanos/estruturas"
	"numeros-romanos/romanos"
	"strings"
)

func DecimalParaRomano(decimal int) (structs.Numero, structs.Erro) {
	if decimal <= 0 || decimal > 3999 {
		return structs.Numero{}, structs.Erro{IsError: true, Message: "O valor não pode ser este"}
	}

	res := structs.Numero{ValorDecimal: decimal, ValorRomano: decimals.DecimalParaRomanoCalc(decimal)}
	return res, structs.Erro{} 
}

func RomanoParaDecimal(numeroRomano string) (structs.Numero, structs.Erro) {
	numeroRomanoFormated := strings.ToUpper(numeroRomano)
	numeroRomanoSlice := romans.ToNumbersRomanStringSlice(numeroRomanoFormated)

	isNotRoman, error, comparedValues := romans.VerifyIsNotRoman(numeroRomanoSlice)
	if isNotRoman {
		return structs.Numero{ValorDecimal: 0, ValorRomano: ""}, error
	}

	resultado := romans.ObterCalculoRomanoParaDecimal(numeroRomanoSlice, comparedValues)

	res := structs.Numero{ValorDecimal: resultado, ValorRomano: numeroRomanoFormated}
	return res, error
}