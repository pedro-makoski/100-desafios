package mydbpack

import (
	"json-worker/db"
)

type Produto struct {
	Id int `json:"id"`
	Name string `json:"name"`
	Price float32 `json:"price"`
	QuantInStock int `json:"quant-in-stock"`
}

func GetData() ([]Produto, error){
	json, err := db.GetJsonStructure[Produto]("C:/Users/makos/Documents_main/estudos/programacao/c/100-desafios-em-c/Desafio-033-json/mydb/data.json")
	if err != nil {
		return nil, err
	}

	return json, nil 
}

func PostData(elemento Produto) error {
	Allelements, err := db.GetJsonStructure[Produto]("C:/Users/makos/Documents_main/estudos/programacao/c/100-desafios-em-c/Desafio-033-json/mydb/data.json")
	lastElement := Allelements[len(Allelements)-1]
	elemento.Id = lastElement.Id+1
	err = db.EditJsonStructure[Produto]("C:/Users/makos/Documents_main/estudos/programacao/c/100-desafios-em-c/Desafio-033-json/mydb/data.json", elemento, []int{0, 1})

	return err 
}

