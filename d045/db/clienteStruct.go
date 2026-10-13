package db

type Cliente struct {
	Id             string `json:"id"`
	Nome           string `json:"nome"`
	Email          string `json:"email"`
	Telefone       string `json:"telefone"`
	DataNascimento string `json:"dataNascimento"`
	Endereco       struct {
		Rua         string `json:"rua"`
		Numero      string `json:"numero"`
		Complemento string `json:"complemento"`
		Bairro      string `json:"bairro"`
		Cidade      string `json:"cidade"`
		Estado      string `json:"estado"`
		Cep         string `json:"cep"`
	}
	ComprasUltimoAno float64  `json:"comprasUltimoAno"`
	Ativo            bool     `json:"ativo"`
	Segmento         string   `json:"segmento"`
	Preferencias     []string `json:"preferencias"`
}
