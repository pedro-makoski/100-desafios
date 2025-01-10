package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func removeIdxFromString(value string, idx int) string {
	var newString []rune
	var values = []rune(value)

	for i,v := range values {
		if i == idx {
			continue
		}

		newString = append(newString, v)
	}

	return string(newString)
}

func removeElementFromString(value string, element byte) string {
	var newString = value
	for i := 0; i < len(newString); i++{
		if newString[i] == element {
			newString = removeIdxFromString(newString, i)	
		}
	}

	return newString
}

func inverterString(text string) string{
	var invertedString []byte
	lenText := len(text)
	for i := range text {
		invertedString = append(invertedString, text[lenText-i-1])
	}

	return string(invertedString)
}

const TERMO_INSIGNIFICANTE_NO_PALINDROMO = ' '

func isPalindromo(termo string) bool {
	termoTratado := removeElementFromString(termo, TERMO_INSIGNIFICANTE_NO_PALINDROMO)
	termoTratado = strings.ToLower(termoTratado)
	termoTratado = strings.TrimSpace(termoTratado)
	termoInvertido := inverterString(termoTratado)
	return termoTratado == termoInvertido
}

func main() {
	fmt.Print("Informe o texto: ")
	reader := bufio.NewReader(os.Stdin)
	termo, _ := reader.ReadString('\n')
	isPalindromoVar := isPalindromo(termo)

	if(isPalindromoVar) {
		fmt.Println("Isso é um palíndromo")
		return 
	}

	fmt.Println("Isso não é um palindromo")
}