#include "stdio.h"

int fatorial(int numero) {
    int resultado;
    resultado = 1;

    for(int contador = 2; contador <= numero; contador++) {
        resultado *= contador;
    }

    return resultado;
}

void main() {
    int numero, res;
    printf("Informe o numero: ");
    scanf("%d", &numero);

    res = fatorial(numero);

    printf("O fatorial de %d e %d", numero, res);
}
