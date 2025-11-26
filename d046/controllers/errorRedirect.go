package controllers

import (
	"net/http"

	"github.com/pedro-makoski/Desafio-046-api-JSON/json"
)

func RedirectWithError(msg string, w http.ResponseWriter, r *http.Request) {
	json.SendEncoder(w, map[string]string{
		"erro": msg,
	})
}
