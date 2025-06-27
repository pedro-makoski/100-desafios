package utils

import (
	"errors"
	"reflect"
)

func GetValueOfStruct(estrutura any, campo string) (any, error) {
	v := reflect.ValueOf(estrutura)
	if v.Kind() == reflect.Struct {
		return getValueOfStruct(v, campo)
	}

	return nil, errors.New("estrutura errada")
}

func getValueOfStruct(reflectValue reflect.Value, campo string) (any, error) {
	field := reflectValue.FieldByName(campo)
	if field.IsValid() {
		return field.Interface(), nil
	}
	return nil, errors.New("campo invalido")
}
