package main

import (
	"bufio"
	"fmt"
	"os"
)

func clearBuffer() {
	reader := bufio.NewReader(os.Stdin)
	reader.ReadString('\n')
}

func pedirVariosNumeros[T any](quant int, message string) []T {
	var res []T

	for i := 0; i < quant; i++ {
		var value T
		fmt.Print(message)
		_, err := fmt.Scanf("%v", &value)
		if err != nil {
			fmt.Println("Entrada invalida")
			clearBuffer()
			i--
			continue
		}
		res = append(res, value)

		clearBuffer()			
	}

	return res 
}  

func printValues[T any](lista []T) {
	for _, v := range lista {
		fmt.Println(v)
	}
}

func getValoresParesPorResultante(list []int, valorResultante int) [][]int {
	var res [][]int
	elementos := make(map[int]int)

	for _, v := range list {
		value, ok := elementos[v]
		if ok {
			res = append(res, []int{value, v})
			continue
		}

		elementos[valorResultante-v] = v
	}

	return res
}

func printMatrixTwoValues(values [][]int, message string, addedValue int, noneMessage string) {
	if len(values) == 0 {
		fmt.Println(noneMessage)
		return 
	}

	for _, v := range values {
		fmt.Println(fmt.Sprintf(message, v[0], v[1], addedValue))
	}
}

func main() {
	quantidade := pedirVariosNumeros[int](1, "Informe a quantidade de valores na lista: ")[0]
	valores := pedirVariosNumeros[int](quantidade, "Informe um dos valores da lista: ")
	valorResultante := pedirVariosNumeros[int](1, "Valor em que será a chave para a soma de dois pares do código: ")[0]
	res := getValoresParesPorResultante(valores, valorResultante)
	printMatrixTwoValues(res, "Os valores %v e %v resultam em: %v", valorResultante, "Não existe nenhum valor correspondende nessa lista")
}