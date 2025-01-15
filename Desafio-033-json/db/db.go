package db

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"reflect"
)

func GetJsonStructure[T any](name string) ([]T, error) {
	file, err := os.ReadFile(name)
	if err != nil {
		fmt.Println(err)
		return nil, errors.New("Ocorreu um erro em obter o arquivo JSON")
	}

	var object []T
	err = json.Unmarshal(file, &object)
	if err != nil {
		return nil, errors.New("Ocorreu um erro na obtenção do JSON")
	}

	return object, nil
}

func contains[T comparable](list []T, value T) bool {
	for _, v := range list {
		if v == value {
			return true
		}
	}

	return false
}

func thisItemAlreadExist[T any](object []T, element T, uniqueKeys []int) bool {
	for _, v := range object {
		values := reflect.ValueOf(v)
		valuesOfElement := reflect.ValueOf(element)
		for i := 0; i < values.NumField(); i++ {
			if contains(uniqueKeys, i) {
				campo := values.Field(i).Interface()
				campoNaoPodeSer := valuesOfElement.Field(i).Interface()

				if campo == campoNaoPodeSer {
					return true
				}
			}
		}
	}

	return false
}

func EditJsonStructure[T any](name string, newValue T, canNotBeIqual []int) error {
	file, err := os.ReadFile(name)
	if err != nil {
		return errors.New("Ocorreu um erro em obter o arquivo JSON")
	}

	var object []T
	err = json.Unmarshal(file, &object)
	if err != nil {
		return errors.New("Ocorreu um erro na obtenção do JSON")
	}

	if len(canNotBeIqual) > 0 {
		if thisItemAlreadExist(object, newValue, canNotBeIqual) {
			return errors.New("Já existe um objeto com esse nome")
		}
	}
	object = append(object, newValue)

	updatedJson, err := json.MarshalIndent(object, "", "  ")
	if err != nil {
		return errors.New("Erro na edição do arquivo")
	}

	err = os.WriteFile(name, updatedJson, 0644)
	if err != nil {
		return errors.New("Erro ao armazenar os dados")
	}

	return nil
}
