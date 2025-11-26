package controllers

import (
	"net/http"

	"github.com/pedro-makoski/Desafio-046-api-JSON/db"
	"github.com/pedro-makoski/Desafio-046-api-JSON/json"
	"github.com/pedro-makoski/Desafio-046-api-JSON/models"
)

type ContatosClientes struct {
	ContatosClientes []map[string]any `json:"contatosClientes"`
}

func GetClientesContatos(w http.ResponseWriter, r *http.Request) {
	clientes, err := db.GetClientes()
	if err != nil {
		RedirectWithError("Erro ao obter clientes", w, r)
		return
	}

	camposFiltrados, err := models.ShowOnlyCamposByClientes(clientes, []string{"Id", "Nome", "Email", "Telefone"})
	if err != nil {
		RedirectWithError("Erro ao filtrar clientes", w, r)
		return
	}

	telefonesMelhorados := models.FormatTelOfAll(camposFiltrados)

	contatosClentes := ContatosClientes{
		ContatosClientes: telefonesMelhorados,
	}

	json.SendEncoder(w, contatosClentes)
}
