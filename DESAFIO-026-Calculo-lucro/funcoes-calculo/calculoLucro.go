package lucro

import (
	"errors"
)

func Lucrocalc(faturamento float32, gasto float32) (float32){
	res := faturamento-gasto
	return res
}

func Lucrocase(lucroValue float32) (string, error) {
	if lucroValue > 0 {
		return "Você teve lucro positivo, espero que continue assim!", nil
	} 

	if lucroValue == 0 {
		return "Você não recebeu nada de lucro", nil
	}

	if lucroValue < 0 {
		return "Você está em dividas os juros começarão a ser contador agora", nil
	}

	return "", errors.New("O valor está mal configurado");
}