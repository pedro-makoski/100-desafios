package decimals

import (
	"fmt"
	"numeros-romanos/estruturas"
	"numeros-romanos/listSlices"
	"strings"
)

func crossSubtractionsWithNormalList() ([]int, []string, []int, []int){
	var chars []string
	var numbers []int
	var repeatPode []int
	var origin []int 

	for i:=0; i < len(structs.QuantAntecessor); i++ {
		if structs.QuantAntecessor[i]==1 {
			for j:=0; j < len(structs.QuantAntecessor); j++ {
				if(j != i && structs.RomansEquivalentNumber[j]>structs.RomansEquivalentNumber[i] && (structs.RomansEquivalentNumber[j]/10==structs.RomansEquivalentNumber[i] || structs.RomansEquivalentNumber[j]/5==structs.RomansEquivalentNumber[i])) {
					numbers = append(numbers, structs.RomansEquivalentNumber[j]-structs.RomansEquivalentNumber[i])
					chars = append(chars, fmt.Sprintf("%v%v", structs.CharsRoman[i], structs.CharsRoman[j]))
					repeatPode = append(repeatPode, 1)
					origin = append(origin, j)
				}
			}
		}
	}

	return numbers, chars, repeatPode, origin
}

func DecimalParaRomanoCalc(decimal int) string {
	newRomanEquivalentNumbers, newCharsRoman, newRepeatQuantPode, origin := crossSubtractionsWithNormalList()
	charsRomanNew, romansEquivalentNumbersInversed, correctRepeatQuantPode, _ := listSlices.AppendOrdentate(structs.RomansEquivalentNumber, newRomanEquivalentNumbers, structs.CharsRoman, newCharsRoman, listSlices.OrdenateInverse, structs.RepetidosQuantPode, newRepeatQuantPode, structs.OriginOriginal, origin)

	var valueQuantUsed []int = make([]int, len(charsRomanNew))
	aux := decimal
	var res []string

	for i:=0; i < len(romansEquivalentNumbersInversed); i++ {
		quantUsed := 0 
		for correctRepeatQuantPode[i]>valueQuantUsed[i]{
			auxCache := aux
			aux-=romansEquivalentNumbersInversed[i]
			if(aux >= 0) {
				quantUsed++
				valueQuantUsed[i]++;
			} else {
				aux = auxCache
				break
			}
		}

		for j:=0; j < quantUsed; j++ {
			res = append(res, charsRomanNew[i])
		}
	}

	return strings.Join(res, "")
}