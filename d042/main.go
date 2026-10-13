package main 

import "fmt"

func main() {
   alfabeto :=[]string{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"}
   var length int 
   fmt.Print("Informe um número de 0 a 26: ")
   fmt.Scan(&length)
   if length > 26 || length < 0 {
      fmt.Println("Valor fora de intervalo")
      return 
   }
   newAlfabeto := alfabeto[:length]
   fmt.Println(newAlfabeto)
}
