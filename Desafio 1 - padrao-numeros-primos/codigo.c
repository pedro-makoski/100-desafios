#include "stdbool.h"
#include "stdio.h"

bool eprimo(int valor) {
  int contador, quantidadedevalorescomvalordiferentede0;

  quantidadedevalorescomvalordiferentede0 = 0;

  for (contador = 1; contador <= valor; contador++) {
    if (valor % contador != 0) {
      quantidadedevalorescomvalordiferentede0++;
    }
  }

  return quantidadedevalorescomvalordiferentede0 == (valor - 2);
}

void main() {
  int cont, x1, x2, diferenca;
  bool isprimo;
  isprimo = false;

  x1 = 2;
  x2 = x1;

  for (cont = 1; cont <= 100; cont++) {
    isprimo = eprimo(cont);
    if (isprimo) {
      x1 = x2;
      x2 = cont;
      diferenca = x2 - x1;
      if(diferenca != 0) {
            printf("%d) %d - %d = %d\n", cont, x2, x1, diferenca);
      }
    }
  }
}
