package conversores

import (
	"numeros-romanos/estruturas"
	"testing"
)

func TestRomanoToDecimalCalc(t *testing.T) {
	for _, v := range structs.Prefered {
		romano := v.ValorRomano
		decimalWant := v.ValorDecimal
		numero, err := RomanoParaDecimal(romano)
		decimal := numero.ValorDecimal
		if(decimalWant != decimal|| err != structs.Erro{IsError: false, Message: ""}) {
			t.Fatalf("Error: o numero romano %q não corresponde ao número decimal %q pois o certo seria %q", romano, decimal, decimalWant)
		}
	}	
}