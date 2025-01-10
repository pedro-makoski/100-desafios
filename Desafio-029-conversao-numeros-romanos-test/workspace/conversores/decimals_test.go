package conversores

import (
	"numeros-romanos/estruturas"
	"testing"
)

func TestDecimalToRomanoCalc(t *testing.T) {
	for _, v := range structs.Prefered {
		decimal := v.ValorDecimal
		romanoWant := v.ValorRomano
		romano := DecimalParaRomano(decimal).ValorRomano
		if(romanoWant != romano) {
			t.Fatalf("Error: o numero decimal %q não corresponde ao número romano %q pois o certo seria %q", decimal, romano, romanoWant)
		}
	}	
}