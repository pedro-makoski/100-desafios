package romans

import (
	"numeros-romanos/estruturas"
	"numeros-romanos/listSlices"
	"strings"
)


func distanceIsEqual0(number []string, compared string, partida int) int{
	var lastValue string = "0"; 
	
	for i:=partida; i < len(number); i++ {
		if(number[i] == lastValue && compared[i] == '0') {
			return i
		}
		
		lastValue = number[i]
	}

	return 0
}

func VerifyIsNotRoman(number []string) (bool, structs.Erro, string) {
	var repetidos []int = make([]int, len(structs.CharsRoman))
	var repetidosSubtraintes []int = make([]int, len(structs.CharsRoman))
	comparedValues := compareValues(number)

	for i := 0; i < len(number); i++ {
		caractere := number[i]
		if !listSlices.StrigSliceContains(structs.CharsRoman, caractere) {
			return true, structs.Erro{IsError: true, Message: "O valor informado não é um número romano"}, ""
		}


		indexNow := listSlices.FindIndex(structs.CharsRoman, caractere)

		if comparedValues[i]=='0' || distanceIsEqual0(number, comparedValues, i)>0{
			repetidosSubtraintes[indexNow]++
		} else if(comparedValues[i]=='1') {
			repetidos[indexNow]++
		} 

		if i != 0 && comparedValues[i]=='1' {
			indexBefore := listSlices.FindIndex(structs.CharsRoman, number[i-1])
			if comparedValues[i-1] == '0' {
				valueNow := structs.RomansEquivalentNumber[indexNow]
				valueBefore := structs.RomansEquivalentNumber[indexBefore]
				
				if !(valueNow/10==valueBefore || valueNow/5==valueBefore) {
					return true, structs.Erro{IsError: true, Message: "O valor informado não é um número romano corretamente ordenado"}, ""	
				}
			}	
		} else if repetidos[indexNow] > structs.RepetidosQuantPode[indexNow] && comparedValues[i]=='1' {
			return true, structs.Erro{IsError: true, Message: "O valor informado não é um número romano corretamente ordenado"}, ""
		}

		if comparedValues[i] == '0' && repetidosSubtraintes[indexNow] > structs.QuantAntecessor[indexNow] {
			return true, structs.Erro{IsError: true, Message: "O valor informado não é um número romano corretamente ordenado"}, ""
		}

		if i+1 != len(number) && i > 0 {
			if comparedValues[i] == '0' && !(comparedValues[i-1] == '1' && comparedValues[i+1] == '1') {
				return true, structs.Erro{IsError: true, Message: "O valor informado não é um número romano corretamente ordenado"}, ""
			}
		}
	}

	return false, structs.Erro{IsError: false, Message: ""}, comparedValues
}

func compareValues(elements []string) string {
	//1- maior em relacao ao depois, 0 - menor em relacao ao depois 2 - igual
	var length int = len(elements)
	var res []byte = make([]byte, length)

	i := 0
	for i = 0; i < length-1; i++ {
		value := listSlices.FindIndex(structs.CharsRoman, string(elements[i]))
		afterValue := listSlices.FindIndex(structs.CharsRoman, string(elements[i+1]))

		if value >= afterValue {
			res[i] = '1'
		} else {
			res[i] = '0'
		}
	}

	res[i] = '1'

	return string(res[:])
}
const times1000Char = "_"

func ToNumbersRomanStringSlice(value string) []string {
	var res []string
	resCont := 0
	for i := 0; i < len(value); i++ {
		if string(value[i]) != times1000Char {
			res = append(res, string(value[i]))
			resCont++
		} else {
			valueNew := append(strings.Split(res[resCont-1], ""), times1000Char)
			res[resCont-1] = strings.Join(valueNew, "")
		}
	}

	return res
}

func ObterCalculoRomanoParaDecimal(number []string, compared string) int {
	var res int = 0
	var subtrainteAcumulate int = 0

	for i := 0; i < len(number); i++ {
		if compared[i] == '1' {
			var total int = structs.RomansEquivalentNumber[listSlices.FindIndex(structs.CharsRoman, string(number[i]))]

			if i+1 != len(number) {
				distance := distanceIsEqual0(number, compared, i)
				if distance > 0 {
					for j := i; j <= distance+i; j++ {
						var valueNext int = structs.RomansEquivalentNumber[listSlices.FindIndex(structs.CharsRoman, string(number[j]))]
						subtrainteAcumulate += valueNext
					}
					i+=distance
					continue
				}
			}

			res += total - subtrainteAcumulate
			subtrainteAcumulate = 0
		} else if compared[i] == '0' {
			valueNow := structs.RomansEquivalentNumber[listSlices.FindIndex(structs.CharsRoman, string(number[i]))]
			subtrainteAcumulate += valueNow
		}
	}

	return res
}