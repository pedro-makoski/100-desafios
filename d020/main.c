#include "stdio.h"

void encontreMaioreMenorDeLista(int* lista, int *maior, int *menor, int start, int length) {
    if(*maior == NULL) {
        *maior = lista[start];
        *menor = lista[start];
    }

    if(lista[start] > *maior) {
        *maior = lista[start];
    }

    if(lista[start] < *menor) {
        *menor = lista[start];
    }

    if(start < length-1) {
        encontreMaioreMenorDeLista(lista, maior, menor, start+1, length);
    }
}

void pedirValores(int quant, int* lista) {
    int value;
    printf("Informe um numero: ");
    scanf("%d", &value);
    lista[quant-1] = value;

    if(quant != 1) {
        pedirValores(quant-1, lista);
    }
}

void main() {
    int maior, menor;
    int lista[11];
    pedirValores(11, &lista);
    encontreMaioreMenorDeLista(lista, &maior, &menor, 0, 11);
    printf("Maior: %d\nMenor: %d", maior, menor);
}
