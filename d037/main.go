package main

import "fmt"

func inputFloat(text string) float64 {
	var value float64

	fmt.Print(text)
	_, err := fmt.Scan(&value)

	if err != nil {
		return 0;
	}

	return value
}

func main() {
	peso := inputFloat("Informe seu peso(kg): ")
	altura := inputFloat("Informe sua altura(m): ")

	imc := getImc(peso, altura)
	status := getStatusImc(imc)

	fmt.Printf("O seu IMC é %v\n", imc)
	fmt.Println(status)
}