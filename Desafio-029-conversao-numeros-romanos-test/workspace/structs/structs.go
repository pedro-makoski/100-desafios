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

var Prefered []Numero = []Numero{
	{ValorDecimal: 1, ValorRomano: "I"},
	{ValorDecimal: 2, ValorRomano: "II"},
	{ValorDecimal: 3, ValorRomano: "III"},
	{ValorDecimal: 4, ValorRomano: "IV"},
	{ValorDecimal: 5, ValorRomano: "V"},
	{ValorDecimal: 6, ValorRomano: "VI"},
	{ValorDecimal: 7, ValorRomano: "VII"},
	{ValorDecimal: 8, ValorRomano: "VIII"},
	{ValorDecimal: 9, ValorRomano: "IX"},
	{ValorDecimal: 10, ValorRomano: "X"},
	{ValorDecimal: 11, ValorRomano: "XI"},
	{ValorDecimal: 12, ValorRomano: "XII"},
	{ValorDecimal: 13, ValorRomano: "XIII"},
	{ValorDecimal: 14, ValorRomano: "XIV"},
	{ValorDecimal: 15, ValorRomano: "XV"},
	{ValorDecimal: 16, ValorRomano: "XVI"},
	{ValorDecimal: 17, ValorRomano: "XVII"},
	{ValorDecimal: 18, ValorRomano: "XVIII"},
	{ValorDecimal: 19, ValorRomano: "XIX"},
	{ValorDecimal: 20, ValorRomano: "XX"},
	{ValorDecimal: 30, ValorRomano: "XXX"},
	{ValorDecimal: 40, ValorRomano: "XL"},
	{ValorDecimal: 50, ValorRomano: "L"},
	{ValorDecimal: 60, ValorRomano: "LX"},
	{ValorDecimal: 70, ValorRomano: "LXX"},
	{ValorDecimal: 80, ValorRomano: "LXXX"},
	{ValorDecimal: 90, ValorRomano: "XC"},
	{ValorDecimal: 100, ValorRomano: "C"},
	{ValorDecimal: 200, ValorRomano: "CC"},
	{ValorDecimal: 300, ValorRomano: "CCC"},
	{ValorDecimal: 400, ValorRomano: "CD"},
	{ValorDecimal: 500, ValorRomano: "D"},
	{ValorDecimal: 600, ValorRomano: "DC"},
	{ValorDecimal: 700, ValorRomano: "DCC"},
	{ValorDecimal: 800, ValorRomano: "DCCC"},
	{ValorDecimal: 900, ValorRomano: "CM"},
	{ValorDecimal: 1000, ValorRomano: "M"},
	{ValorDecimal: 2000, ValorRomano: "MM"},
	{ValorDecimal: 3000, ValorRomano: "MMM"},
	{ValorDecimal: 3999, ValorRomano: "MMMCMXCIX"},
}