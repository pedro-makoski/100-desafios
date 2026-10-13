package models

import "github.com/pedro-makoski/Desafio-046-api-JSON/utils"

const FIELD_OF_TEL = "telefone"

func FormatTelOfOne(data map[string]any) map[string]any {
	newData := data
	if utils.DoExistsThisField(newData, FIELD_OF_TEL) {
		newData[FIELD_OF_TEL] = utils.FormatTelefoneOnString(newData[FIELD_OF_TEL].(string))
	}

	return newData
}

func FormatTelOfAll(data []map[string]any) []map[string]any {
	newData := data

	for pos, dataPeople := range newData {
		newData[pos] = FormatTelOfOne(dataPeople)
	}

	return newData
}
