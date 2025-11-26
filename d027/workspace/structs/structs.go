package structs

type Numero struct {
	ValorDecimal int    `json:"valor-decimal"`
	ValorRomano  string `json:"valor-romano"`
}

type Erro struct {
	IsError bool   `json:"is error"`
	Message string `json:"message"`
}

var CharsRoman = []string{"I", "V", "X", "L", "C", "D", "M", "V_", "X_", "L_", "C_", "D_", "M_"}
var RomansEquivalentNumber = []int{1, 5, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000, 1000000}
var RepetidosQuantPode = []int{3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3}
var QuantAntecessor = []int{1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1}
var OriginOriginal = []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12}