package db

import (
	"errors"

	"github.com/pedro-makoski/Desafio-046-api-JSON/files"
	"github.com/pedro-makoski/Desafio-046-api-JSON/json"
)

func GetClientes() ([]Cliente, error) {
	const CAMINHO_JSON = "./db/data.json"
	file, err := files.ReadFile(CAMINHO_JSON)
	if err != nil {
		return nil, errors.New("erro ao obter clientes")
	}
	obj := json.ConvertStringInObject[[]Cliente](file)
	return obj, nil
}
