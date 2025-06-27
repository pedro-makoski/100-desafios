package routes

import (
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/pedro-makoski/Desafio-046-api-JSON/controllers"
	"github.com/pedro-makoski/Desafio-046-api-JSON/middleware"
)

func HandleRequests() {
	r := mux.NewRouter()
	SetMiddlewares(r)

	DefineRoutes(r)

	http.ListenAndServe("localhost:8000", handlers.CORS(handlers.AllowedOrigins([]string{"*"}))(r))
}

func DefineRoutes(r *mux.Router) {
	r.HandleFunc("/clientes", controllers.ReturnAllClients)
	r.HandleFunc("/clientes/resumo", controllers.ClientesResumo)
}

func SetMiddlewares(r *mux.Router) {
	r.Use(middleware.FormatInJsonMiddleware)
}
