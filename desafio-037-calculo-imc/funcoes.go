package main

import "math"

func getImc(peso float64, altura float64) float64{
	return peso/(math.Pow(altura, 2));
}

func getStatusImc(imc float64) string {
	if(imc <= 16.9) {
		return "Muito abaixo do peso"
	}

	if(imc <= 18.4) {
		return "Abaixo do peso"
	}

	if(imc <= 24.9) {
		return "Peso normal"
	}

	if(imc <= 29.9) {
		return "Acima do peso"
	}

	if(imc <= 34.9) {
		return "Obesidade grau I"
	}

	if(imc <= 40) {
		return "Obesidade grau II"
	}

	return "Obesidade grau III"
}