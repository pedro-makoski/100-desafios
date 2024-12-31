package main

import (
	"net/http"
	"numeros-romanos/conversores"
	"strconv"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/decimal-to-romano/:number", decimalParaRomanoGET)
	router.GET("/romano-to-decimal/:number", romanoToDecimalGET)

	router.Run("localhost:8080")
}

func decimalParaRomanoGET(c *gin.Context) {
	decimal := c.Param("number")

	decimalInt, err := strconv.Atoi(decimal)

	if err != nil || decimal == "" || decimalInt <= 0 || decimalInt > 3999 {
		c.IndentedJSON(http.StatusNotAcceptable, gin.H{"message": "Você informou um dado não aceito"})
		return
	}

	c.IndentedJSON(http.StatusOK, conversores.DecimalParaRomano(decimalInt))
}

func romanoToDecimalGET(c *gin.Context) {
	romano := c.Param("number")

	if romano == ""{
		c.IndentedJSON(http.StatusNotAcceptable, gin.H{"message": "Você informou um dado não aceito"})
		return
	}

	values, erro :=  conversores.RomanoParaDecimal(romano)

	if erro.IsError {
		c.IndentedJSON(http.StatusNotAcceptable, gin.H{"message": "Você informou um dado não aceito"})
		return
	}

	c.IndentedJSON(http.StatusOK, values)
}

