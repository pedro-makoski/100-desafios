package models

import (
	"github.com/pedro-makoski/Desafio-046-api-JSON/db"
	"github.com/pedro-makoski/Desafio-046-api-JSON/utils"
)

func GetActiveClients() ([]db.Cliente, error) {
	clientes, err := db.GetClientes()
	if err != nil {
		return nil, err
	}

	activeClients := utils.FilterList(clientes, func(cliente db.Cliente) bool {
		return cliente.Ativo
	})

	return activeClients, nil
}
