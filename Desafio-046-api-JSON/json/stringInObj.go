package json

import "encoding/json"

func ConvertStringInObject[T any](content string) T {
	var obj T
	json.Unmarshal([]byte(content), &obj)
	return obj
}
