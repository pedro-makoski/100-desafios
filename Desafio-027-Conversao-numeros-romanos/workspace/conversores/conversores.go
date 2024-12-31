package conversores

import (
	"numeros-romanos/estruturas"
	"numeros-romanos/romanos"
	"strings"
	"numeros-romanos/decimals"
)

func DecimalParaRomano(decimal int) structs.Numero {
	res := structs.Numero{ValorDecimal: decimal, ValorRomano: decimals.DecimalParaRomanoCalc(decimal)}
	return res
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