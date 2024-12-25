package main

import (
	"financeiro/funcoes-calculo"
	"fmt"
	"log"
)

func inputFloat(message string) (float32){
	var value float32
	fmt.Print(message)
	fmt.Scan(&value);

	return value
}

func main() {
	log.SetPrefix("Error: ");
	log.SetFlags(0)

	var faturamento float32
	var gasto float32
	var lucroValue float32

	faturamento = inputFloat("Informe o faturamento: ")
	gasto = inputFloat("Informe o gasto: ")
	
	lucroValue = lucro.Lucrocalc(faturamento, gasto)
	lucroString := fmt.Sprintf("O lucro foi de %.2f", lucroValue)
	fmt.Println(lucroString)
	status, err := lucro.Lucrocase(lucroValue);
	
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(status)
}