package controllers

import (
	"net/http"

	"github.com/pedro-makoski/Desafio-046-api-JSON/db"
	"github.com/pedro-makoski/Desafio-046-api-JSON/json"
)

func ReturnAllClients(w http.ResponseWriter, r *http.Request) {
	clientes, err := db.GetClientes()
	if err != nil {
		RedirectWithError(err.Error(), w, r)
		return
	}

	json.SendEncoder(w, clientes)
}
