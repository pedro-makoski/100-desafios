package main 

import (
	"fmt"
	"bufio"
	"os"
	"strings"
)

func contChararacteresByString(value string) map[string]int {
	res := make(map[string]int)

	for _, v := range value {
		charNow := strings.ToLower(string(v))
		res[charNow]++
	}

	return res
}

func printMap(element map[string]int) {
	for i, v := range element {
		fmt.Println(fmt.Sprintf("O elemento %v aparece %v vez(es)", i, v))
	}
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Informe uma frase: ")
	termo, _ := reader.ReadString('\n')
	termo = strings.TrimSpace(termo)

	ret := contChararacteresByString(termo)
	printMap(ret)
}