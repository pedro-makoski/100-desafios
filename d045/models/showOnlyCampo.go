package models

import (
	"github.com/pedro-makoski/Desafio-046-api-JSON/db"
	"github.com/pedro-makoski/Desafio-046-api-JSON/utils"
)

func ShowOnlyCamposByClientes(clientes []db.Cliente, campos []string) ([]map[string]any, error) {
	newClientes := []map[string]any{}

	for _, cliente := range clientes {
		clienteNew, err := ShowOnlyCamposByCliente(cliente, campos)
		if err != nil {
			return nil, err
		}
		newClientes = append(newClientes, clienteNew)
	}

	return newClientes, nil
}

func ShowOnlyCamposByCliente(cliente db.Cliente, campos []string) (map[string]any, error) {
	newMap := make(map[string]any)

	for _, campo := range campos {
		valorDoCampo, err := utils.GetValueOfStruct(cliente, campo)
		if err != nil {
			return nil, err
		}
		newMap[utils.FirstLettertoLowerCase(campo)] = valorDoCampo
	}

	return newMap, nil
}
