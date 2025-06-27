package json

import (
	"encoding/json"
	"net/http"
)

func SendEncoder[T any](w http.ResponseWriter, jsonObj T) {
	json.NewEncoder(w).Encode(jsonObj)
}
