package controllers

import (
	"net/http"

	"github.com/pedro-makoski/Desafio-046-api-JSON/json"
	"github.com/pedro-makoski/Desafio-046-api-JSON/models"
)

type Resumo struct {
	ResumosClientesAtivos []map[string]any `json:"resumoClientesAtivos"`
	TotalClientesAtivos   int              `json:"totalClientesAtivos"`
}

func ClientesResumo(w http.ResponseWriter, r *http.Request) {
	clientesAtivos, err := models.GetActiveClients()
	if err != nil {
		RedirectWithError(err.Error(), w, r)
		return
	}

	apenasOsCamposIdNomeEEmail, err := models.ShowOnlyCamposByClientes(clientesAtivos, []string{"Id", "Nome", "Email"})
	if err != nil {
		RedirectWithError(err.Error(), w, r)
		return
	}

	resumo := Resumo{
		ResumosClientesAtivos: apenasOsCamposIdNomeEEmail,
		TotalClientesAtivos:   len(apenasOsCamposIdNomeEEmail),
	}

	json.SendEncoder(w, resumo)
}
