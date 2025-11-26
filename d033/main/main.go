package main

import (
	mydbpack "json-worker/mydb"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/elements", getElements)
	router.POST("/elements", postElements)

	router.Run("localhost:8080")
}

type Erro struct {
	Message string `json:"message"`
}

func getElements(c *gin.Context) {
	dados, err := mydbpack.GetData()
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, Erro{Message: err.Error()})
		return 
	}

	c.IndentedJSON(http.StatusAccepted, dados)
}

func postElements(c *gin.Context) {
	var newProduct mydbpack.Produto

	if err := c.BindJSON(&newProduct); err != nil {
		c.IndentedJSON(http.StatusNotAcceptable, Erro{Message: "Você informou uma estrutua não aceita"})
		return 
	}

	err := mydbpack.PostData(newProduct)
	if err != nil {
		c.IndentedJSON(http.StatusNotAcceptable, Erro{Message: err.Error()})
		return 
	}

	getElements(c)
}

