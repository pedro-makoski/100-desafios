#include "stdio.h"
#define QUANTIDADE_DE_VALORES 10

int* sort(int valores[QUANTIDADE_DE_VALORES]) {
    int *valores_sorted = (int*)malloc(QUANTIDADE_DE_VALORES * sizeof(int)), temp;

    for(int i = 0; i < QUANTIDADE_DE_VALORES; i++) {
        valores_sorted[i] = valores[i];
    }

    for(int i = 0; i < QUANTIDADE_DE_VALORES; i++) {
        for(int j = i+1; j < QUANTIDADE_DE_VALORES; j++) {
            if(valores_sorted[i] > valores_sorted[j]) {
                temp = valores_sorted[j];
                valores_sorted[j] = valores_sorted[i];
                valores_sorted[i] = temp;
            }
        }
    }

    return valores_sorted;
}

void main()
{
    int valores[QUANTIDADE_DE_VALORES];
    int *res;

    for(int i = 0; i < QUANTIDADE_DE_VALORES; i++) {
        printf("Informe o valor: ");
        scanf("%d", &valores[i]);
    }

    printf("----------Valores Desordenados----------------\n");
    for(int i = 0; i < QUANTIDADE_DE_VALORES; i++) {
        printf("%d\n", valores[i]);
    }

    res = sort(valores);

    printf("----------Valores Ordenados----------------\n");
    for(int i = 0; i < QUANTIDADE_DE_VALORES; i++) {
        printf("%d\n", res[i]);
    }
}
