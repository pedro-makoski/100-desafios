package conversores

import (
	"testing"
)

func FuzzConversao(f *testing.F) {
	var numeros = []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
	for _, v := range numeros {
		f.Add(v)
	}
	
	f.Fuzz(func(t *testing.T, value int){
		romano, erro := DecimalParaRomano(value)
		if erro.IsError {
			t.Skip() 
		}
		romanoNumber := romano.ValorRomano
		decimalOfRoman, erro := RomanoParaDecimal(romanoNumber)
		if erro.IsError {
			t.Skip()
		} 

		if decimalOfRoman.ValorDecimal != value {
			t.Errorf("Before %q after %q after %q", value, romanoNumber, decimalOfRoman)
		}
	})
}